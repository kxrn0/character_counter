import { ref, onMounted } from "vue";
import type { Theme } from "@/types";

export default function useTheme() {
  const themeKey = "THEME_KEY";
  const storeName = "theme_store";
  const theme = ref<Theme>("dark");
  let db: IDBDatabase;

  function update_theme(theme: Theme) {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.put({ theme, id: themeKey });
  }

  function update_root(theme: Theme) {
    const root = document.querySelector(":root");
    const oldTheme = theme === "light" ? "dark" : "light";

    root?.classList.add(theme);
    root?.classList.remove(oldTheme);
  }

  function toggle_theme() {
    theme.value = theme.value === "light" ? "dark" : "light";

    update_theme(theme.value);
    update_root(theme.value);
  }

  async function get_theme(db: IDBDatabase): Promise<{ theme: Theme; id: string } | null> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName);
      const store = transaction.objectStore(storeName);
      const request = store.get(themeKey);

      request.addEventListener("success", () => resolve(request.result));

      request.addEventListener("error", () => reject(null));
    });
  }

  onMounted(() => {
    const openRequest = indexedDB.open(storeName);

    openRequest.addEventListener("success", async () => {
      db = openRequest.result;

      const storedTheme = (await get_theme(db))?.theme || "dark";

      theme.value = storedTheme;

      update_theme(storedTheme);
      update_root(storedTheme);
    });

    openRequest.addEventListener("upgradeneeded", () => {
      db = openRequest.result;

      if (db.objectStoreNames.contains(storeName) === false)
        db.createObjectStore(storeName, { keyPath: "id" });
    });
  });

  return { theme, toggle_theme };
}
