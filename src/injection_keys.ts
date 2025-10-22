import type { InjectionKey } from "vue";
import type useTheme from "./composables/useTheme";

type ThemeManager = ReturnType<typeof useTheme>;

export const themeKey = Symbol() as InjectionKey<ThemeManager>;
