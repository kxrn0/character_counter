import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const PWAConfig = {
  base: "/character_counter/",
  includedAssets: ["**/*"],
  workbox: { globPatterns: ["**/*"] },
  manifest: {
    name: "Character counter app",
    short_name: "Character counter",
    description: "App for doing rudimentary text analysis.",
    theme_color: "#31394eff",
    icons: [
      {
        src: "pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  },
};

// https://vite.dev/config/
export default defineConfig({
  base: "/character_counter/",
  plugins: [vue(), VitePWA(PWAConfig)],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
