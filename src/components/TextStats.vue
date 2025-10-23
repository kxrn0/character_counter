<script setup lang="ts">
import { computed } from "vue";
import patterChar from "@/assets/images/pattern-character-count.svg";
import patternWord from "@/assets/images/pattern-word-count.svg";
import patternSent from "@/assets/images/pattern-sentence-count.svg";
import LetterDensity from "./LetterDensity.vue";

const props = defineProps<{
  text: string;
  charCount: number;
  excludeSpaces: boolean;
  wordCount: number;
}>();
const sentenceCount = computed(() =>
  props.text
    .split(/(?<=[.?!])\s+/)
    .filter((s) => s.trim() !== "")
    .length.toString()
    .padStart(2, "0"),
);
</script>

<template>
  <div class="stats-container">
    <div class="cards">
      <div class="card char">
        <img class="decorative-image" :src="patterChar" alt="" />
        <p class="title">{{ props.charCount.toString().padStart(2, "0") }}</p>
        <p class="subtitle">Total Characters <span v-if="props.excludeSpaces">(no spaces)</span></p>
      </div>
      <div class="card word">
        <img class="decorative-image" :src="patternWord" alt="" />
        <p class="title">{{ props.wordCount.toString().padStart(2, "0") }}</p>
        <p class="subtitle">Word Count</p>
      </div>
      <div class="card sent">
        <img class="decorative-image" :src="patternSent" alt="" />
        <p class="title">{{ sentenceCount }}</p>
        <p class="subtitle">Sentence Count</p>
      </div>
    </div>
    <LetterDensity :text="props.text" />
  </div>
</template>

<style scoped lang="scss">
@use "@/scss/text_presets";
@use "@/scss/radii";
@use "@/scss/variables";

.stats-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .cards {
    display: flex;
    gap: 1rem;

    .card {
      @include radii.radius-12;

      color: var(--neutral-900);
      width: 20rem;
      padding: 1.5rem 1rem;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      overflow: hidden;

      &.char {
        background: var(--purple-400);
      }

      &.word {
        background: var(--yellow-500);
      }

      &.sent {
        background: var(--orange-500);
      }

      .decorative-image {
        width: 9.375rem;
        height: 9.375rem;
        position: absolute;
        top: 50%;
        left: 12.5rem;
        transform: translateY(-50%);
      }

      .title {
        @include text_presets.text-preset-1;

        z-index: 2;
      }

      .subtitle {
        @include text_presets.text-preset-3;

        z-index: 2;
      }
    }
  }

  @media (max-width: variables.$breakpoint-tablet) {
    .cards {
      .card {
        width: 14rem;
        padding: 1.5rem 0.75rem;

        .decorative-image {
          left: 9rem;
        }
      }
    }
  }

  @media (max-width: variables.$breakpoint-tablet-small) {
    .cards {
      align-items: center;
      flex-direction: column;

      .card {
        width: 21.5rem;
        padding: 1.75rem 1.25rem;

        .decorative-image {
          left: 15.25rem;
        }

        .title {
          @include text_presets.text-preset-1-mobile;
        }
      }
    }
  }

  @media (max-width: variables.$breakpoint-mobile-small) {
    .cards {
      .card {
        width: 100%;
      }
    }
  }
}
</style>
