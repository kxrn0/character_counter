<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { themeKey } from "./injection_keys";
import useTheme from "./composables/useTheme";
import Navbar from "./components/NavBar.vue";
import TextArea from "./components/TextArea.vue";
import TextStats from "./components/TextStats.vue";

const themeManager = useTheme();
const text = ref("");
const excludeSpaces = ref(false);
const charCount = computed(() => count_chars(text.value, excludeSpaces.value));
const wordCount = computed(() => count_words(text.value));

function count_chars(text: string, excludeSpaces: boolean) {
  if (excludeSpaces === false) return text.length;

  let count = 0;

  for (const char of text) if (char != " ") count++;

  return count;
}

function count_words(text: string) {
  return text.split(/\s+/).filter((word) => word !== "").length;
}

provide(themeKey, themeManager);
</script>

<template>
  <main class="app-container" :class="themeManager.theme.value">
    <Navbar />
    <h1>Analyze your text in real-time.</h1>
    <TextArea
      v-model="text"
      :char-count
      :word-count
      :exclude-spaces
      @toggle="excludeSpaces = !excludeSpaces"
    />
    <TextStats :text :char-count :exclude-spaces :word-count />
  </main>
</template>

<style scoped lang="scss">
@use "@/scss/text_presets";

.app-container {
  &.light {
    --header-color: var(--neutral-900);
  }

  &.dark {
    --header-color: var(--neutral-100);
  }

  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h1 {
    @include text_presets.text-preset-1;

    color: var(--header-color);
    width: 31.875rem;
    text-align: center;
  }
}
</style>
