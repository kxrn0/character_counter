<script setup lang="ts">
import type { Theme } from "@/types";

const props = defineProps<{ theme: Theme }>();
const inputModel = defineModel<number | null>();

function handle_input(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  const sanitized = value.replace(/[^0-9]/g, "");

  if (sanitized === "") inputModel.value = null;
  else inputModel.value = Number(sanitized);

  target.value = inputModel.value === null ? "" : String(inputModel.value);
}

function handle_key_down(event: KeyboardEvent) {
  const current = Number(inputModel.value);
  const key = event.key;
  let newValue: number | null = null;

  if (key === "ArrowUp") {
    event.preventDefault();

    newValue = current + 1;
  } else if (key === "ArrowDown") {
    event.preventDefault();

    newValue = Math.max(0, current - 1);
  }

  if (newValue !== null) inputModel.value = newValue;
}
</script>

<template>
  <label class="number-input-label" :class="props.theme" :data-value="inputModel">
    <span class="screen-reader-only">Limit amount</span>
    <input
      type="text"
      inputmode="numeric"
      role="spinbutton"
      size="2"
      :value="inputModel"
      @keydown="handle_key_down"
      @input="handle_input"
    />
  </label>
</template>

<style scoped lang="scss">
@use "@/scss/text_presets";
@use "@/scss/radii";

.number-input-label {
  &.light {
    --color: var(--neutral-900);
  }

  &.dark {
    --color: var(--neutral-0);
  }

  display: inline-grid;
  vertical-align: top;
  align-items: center;

  &::after,
  input {
    @include text_presets.text-preset-4;
    @include radii.radius-6;

    background: transparent;
    color: var(--color);
    border: 0.0625rem solid var(--neutral-600);
    text-align: center;
    appearance: none;
    padding: 0.25rem 0.75rem;
    width: auto;
    grid-area: 1 / 2;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }

  .screen-reader-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}
</style>
