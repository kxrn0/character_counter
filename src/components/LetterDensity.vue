<script setup lang="ts">
import { computed, ref } from "vue";

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
  <div class="densities-container">
    <p class="title">Letter Density</p>
    <p class="empty" v-if="letterDensity.length === 0">
      No characters found. Start typing to see letter density.
    </p>
    <div v-else class="stats">
      <ul>
        <li v-for="idx in lastIndex" :key="letterDensity[idx]?.letter">
          <span class="letter">{{ letterDensity[idx - 1]?.letter }}</span>
          <span class="bar" :style="{ '--percentage': letterDensity[idx - 1]?.percentage }"></span>
          <span>{{ letterDensity[idx - 1]?.count }}({{ letterDensity[idx - 1]?.percentage }})</span>
        </li>
      </ul>
      <label v-if="letterDensity.length > defaultLength">
        <span>See {{ showAll ? "less" : "more" }}</span>
        <input type="checkbox" v-model="showAll" />
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
.densities-container {
  background: red;
}
</style>
