<script setup lang="ts">
import { computed, inject } from "vue";
import { themeKey } from "@/injection_keys";
import logoLight from "@/assets/images/logo-light-theme.svg";
import logoDark from "@/assets/images/logo-dark-theme.svg";
import IconMoon from "@/assets/images/icon-moon.svg";
import IconSun from "@/assets/images/icon-sun.svg";

const themeManager = inject(themeKey)!;
const src = computed(() => (themeManager.theme.value === "light" ? logoLight : logoDark));
const themeIcon = computed(() => (themeManager.theme.value === "light" ? IconMoon : IconSun));
</script>

<template>
  <nav class="navbar" :class="themeManager.theme.value">
    <img :src alt="character counter logo" class="app-logo" />
    <button @click="themeManager.toggle_theme" class="toggle">
      <img :src="themeIcon" alt="" />
    </button>
  </nav>
</template>

<style scoped lang="scss">
@use "@/scss/radii";
@use "@/scss/variables";

.navbar {
  display: flex;
  justify-content: space-between;

  &.light {
    --button-bg: var(--neutral-100);
  }

  &.dark {
    --button-bg: var(--neutral-700);
  }

  .app-logo {
    width: 15.3125rem;
  }

  width: 100%;
  max-width: 61.875rem;
  padding-top: 2rem;

  .toggle {
    @include radii.radius-8;

    background: var(--button-bg);
    border: none;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;

    img {
      width: 1.375rem;
      height: 1.375rem;
    }
  }

  @media (max-width: variables.$breakpoint-tablet) {
    padding: 1rem 2rem;
  }

  @media (max-width: variables.$breakpoint-tablet-small) {
    .app-logo {
      width: 11.525rem;
    }
  }

  @media (max-width: variables.$breakpoint-mobile) {
    padding: 1rem;

    .toggle {
      @include radii.radius-6;

      width: 2rem;
      height: 2rem;

      img {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
}
</style>
