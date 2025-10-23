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

  for (const char of text) if (/\s/.test(char) === false) count++;

  return count;
}

function count_words(text: string) {
  return text.split(/\s+/).filter((word) => word !== "").length;
}

provide(themeKey, themeManager);
</script>

<template>
  <Navbar />
  <main class="app-container" :class="themeManager.theme.value">
    <h1 class="title">
      Analyze your text <br class="brazil-desktop" />
      in <br class="brazil-mobile" />
      real-time.
    </h1>
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
@use "@/scss/variables";

.app-container {
  &.light {
    --header-color: var(--neutral-900);
  }

  &.dark {
    --header-color: var(--neutral-100);
  }

  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 0 4rem 0;
  width: fit-content;

  .title {
    @include text_presets.text-preset-1;

    text-wrap: balance;
    color: var(--header-color);
    align-self: center;
    width: 35rem;
    text-align: center;

    .brazil-mobile {
      display: none;
    }
  }

  @media (max-width: variables.$breakpoint-tablet) {
    margin-top: 1.5rem;
    padding: 0 0 5.875rem 0;
    gap: 2.5rem;
  }

  @media (max-width: variables.$breakpoint-tablet-small) {
    padding: 0 0 2rem 0;

    .title {
      @include text_presets.text-preset-1-mobile;

      width: 21.5rem;

      .brazil-desktop {
        display: none;
      }

      .brazil-mobile {
        display: block;
      }
    }
  }

  @media (max-width: variables.$breakpoint-mobile) {
    padding: 0 1rem 2rem 1rem;
  }

  @media (max-width: variables.$breakpoint-mobile-small) {
    .title {
      width: 100%;
    }
  }
}
</style>
