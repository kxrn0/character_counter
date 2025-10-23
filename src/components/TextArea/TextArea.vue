<script setup lang="ts">
import { ref, computed } from "vue";
import type { Theme } from "@/types";
import format_time from "./utils_textarea/format_time";
import iconInfo from "@/assets/images/icon-info.svg";
import NumberInput from "./components_text_area/NumberInput.vue";

const readingRate = 265; // words per minute
const props = defineProps<{
  excludeSpaces: boolean;
  charCount: number;
  wordCount: number;
  theme: Theme;
}>();
const emits = defineEmits<{
  (e: "toggle"): void;
}>();
const textModel = defineModel<string>();
const setCharLimit = ref(false);
const charLimit = ref<number | null>(2 ** 8);
const exceedsCharLimit = computed(
  () => setCharLimit.value && charLimit.value !== null && props.charCount > charLimit.value,
);
const readingTime = computed(() => format_time(props.wordCount / readingRate));
</script>

<template>
  <div class="text-area-container" :class="props.theme">
    <textarea v-model="textModel" :class="{ terrified: exceedsCharLimit }"></textarea>
    <div v-if="exceedsCharLimit" class="error">
      <img :src="iconInfo" alt="" />
      <span>Limit reached! Your text exceeds {{ charLimit }} characters!</span>
    </div>
    <div class="controls">
      <div class="checkboxes">
        <label class="checkbox-container">
          <input type="checkbox" :checked="props.excludeSpaces" @change="emits('toggle')" />
          <span>Exclude spaces</span>
        </label>
        <div class="limit-container">
          <label class="checkbox-container">
            <input type="checkbox" v-model="setCharLimit" />
            <span>Set character limit</span>
          </label>
          <NumberInput v-if="setCharLimit" v-model="charLimit" :theme="props.theme" />
        </div>
      </div>
      <p>Approx. reading time: {{ readingTime }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/scss/text_presets";
@use "@/scss/radii";
@use "@/scss/variables";

.text-area-container {
  &.light {
    --area-bg: var(--neutral-100);
    --area-border-color: var(--neutral-200);
    --area-bg-hover: var(--neutral-200);
    --area-border-color-hover: var(--neutral-200);
    --ui-color: var(--neutral-900);
    --text-color: var(--neutral-700);
    --scrollbar-color: var(--neutral-600);
  }

  &.dark {
    --area-bg: var(--neutral-800);
    --area-border-color: var(--neutral-700);
    --area-bg-hover: var(--neutral-700);
    --area-border-color-hover: var(--neutral-600);
    --ui-color: var(--neutral-200);
    --text-color: var(--neutral-200);
    --scrollbar-color: var(--neutral-200);
  }

  display: flex;
  flex-direction: column;

  textarea {
    @include text_presets.text-preset-3;
    @include radii.radius-12;

    background: var(--area-bg);
    color: var(--text-color);
    border: 0.125rem solid var(--area-border-color);
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-color) transparent;
    outline: none;
    resize: vertical;
    height: 12.5rem;
    padding: 1.25rem;

    &:focus {
      border-color: var(--purple-500);
      box-shadow: 0 0 0.625rem var(--purple-400);
    }

    &::placeholder {
      color: var(--text-color);
    }

    &.terrified {
      border-color: var(--orange-800);
      box-shadow: 0 0 0.5rem var(--orange-800);
    }

    @media (hover: hover) {
      &:hover:not(:focus) {
        background: var(--area-bg-hover);
        border-color: var(--area-border-color-hover);
      }
    }
  }

  .error {
    @include text_presets.text-preset-4;

    color: var(--orange-800);
    margin-top: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .controls {
    @include text_presets.text-preset-4;

    color: var(--ui-color);
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .checkboxes {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        height: 2rem;

        input[type="checkbox"] {
          @include radii.radius-4;

          appearance: none;
          border: 0.0625rem solid var(--ui-color);
          width: 1rem;
          height: 1rem;
          outline: none;

          &:checked {
            background-color: var(--purple-400);
            background-image: url("@/assets/images/icon-check.svg");
            background-size: 0.75rem 0.75rem;
            background-position: center;
            background-repeat: no-repeat;
            border: none;

            &:hover {
              background-color: var(--purple-500);
            }
          }

          &:focus {
            box-shadow:
              0 0 0 2px var(--neutral-0),
              0 0 0 4px var(--purple-400);

            &:not(:checked) {
              background-color: var(--neutral-0);
            }
          }
        }
      }

      .limit-container {
        display: flex;
        align-items: center;
        gap: 0.625rem;
      }
    }
  }

  @media (max-width: variables.$breakpoint-tablet-small) {
    .controls {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;

      .checkboxes {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }
    }
  }
}
</style>
