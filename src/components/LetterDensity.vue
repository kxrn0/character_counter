<script setup lang="ts">
import { themeKey } from "@/injection_keys";
import { computed, inject, ref } from "vue";
import IconChevron from "./IconChevron.vue";

const props = defineProps<{
  text: string;
}>();
const letterDensity = computed(() => {
  const densities = compute_density(props.text);
  const totalLetters = densities.reduce((total, current) => total + current[1], 0);
  const updated = densities.map((density) => ({
    letter: density[0].toUpperCase(),
    count: density[1],
    percentage: `${((100 * density[1]) / totalLetters).toFixed(2)}%`,
  }));

  return updated;
});
const showAll = ref(false);
const defaultLength = 5;
const lastIndex = computed(() => {
  const totalLength = letterDensity.value.length;
  const index = showAll.value ? totalLength : defaultLength;

  return Math.min(index, totalLength);
});
const themeManager = inject(themeKey)!;

function compute_density(text: string) {
  const counts = new Map<string, number>();

  for (const char of text) {
    if (/[a-z]/i.test(char) === false) continue;

    const count = counts.get(char) || 0;

    counts.set(char, count + 1);
  }

  return Array.from(counts).sort((a, b) => b[1] - a[1]);
}
</script>

<template>
  <div class="densities-container" :class="themeManager.theme.value">
    <p class="title">Letter Density</p>
    <p class="empty" v-if="letterDensity.length === 0">
      No characters found. Start typing to see letter density.
    </p>
    <template v-else>
      <ul class="bars">
        <li v-for="idx in lastIndex" :key="letterDensity[idx]?.letter" class="letter-details">
          <span class="letter">{{ letterDensity[idx - 1]?.letter }}</span>
          <span class="bar" :style="{ '--percentage': letterDensity[idx - 1]?.percentage }"></span>
          <span class="percentage"
            >{{ letterDensity[idx - 1]?.count }} ({{ letterDensity[idx - 1]?.percentage }})</span
          >
        </li>
      </ul>
      <label v-if="letterDensity.length > defaultLength" class="toggle-container">
        <span>See {{ showAll ? "less" : "more" }}</span>
        <span class="check-container">
          <input type="checkbox" v-model="showAll" />
          <IconChevron />
        </span>
      </label>
    </template>
  </div>
</template>

<style scoped lang="scss">
@use "@/scss/text_presets";
@use "@/scss/radii";
@use "@/scss/variables";

.densities-container {
  &.light {
    --color: var(--neutral-900);
    --bar-track-background: var(--neutral-100);
  }

  &.dark {
    --color: var(--neutral-200);
    --bar-track-background: var(--neutral-800);
  }

  color: var(--color);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .title {
    @include text_presets.text-preset-2;
  }

  .empty {
    @include text_presets.text-preset-4;
  }

  .bars {
    @include text_presets.text-preset-4;

    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .letter-details {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .letter {
        width: 1rem;
      }

      .bar {
        @include radii.radius-full;

        width: 53.75rem;
        background: var(--bar-track-background);
        height: 0.75rem;
        position: relative;

        &::after {
          content: "";
          background: var(--purple-400);
          display: block;
          width: var(--percentage);
          height: 100%;
          border-radius: inherit;
        }
      }

      .percentage {
        text-align: end;
        min-width: 5.4375rem;
      }
    }
  }

  .toggle-container {
    @include text_presets.text-preset-3;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    .check-container {
      position: relative;

      input[type="checkbox"] {
        appearance: none;

        position: absolute;
        inset: 0;

        &:checked + svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  @media (max-width: variables.$breakpoint-tablet) {
    .bars {
      .letter-details {
        .bar {
          width: 35.875rem;
        }
      }
    }
  }

  @media (max-width: variables.$breakpoint-tablet-small) {
    .bars {
      .letter-details {
        .bar {
          width: 13.25rem;
        }
      }
    }
  }
}
</style>
