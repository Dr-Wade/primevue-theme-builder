import { shallowRef, computed } from "vue";
import { usePreset } from "@primeuix/themes";
import { themes, themeLabels, themeAccents, builtInThemeNames } from "./themes";
import { defaults } from "./types";
import { generatePreset, hslToHsl } from "./generator";
import type { SavedTheme, ThemeBuilderState } from "./types";

const STORAGE_KEY = "aadalen-theme";
const CUSTOM_THEMES_KEY = "aadalen-custom-themes";
const DEFAULT_THEME = "nordic";

function hydrateCustomThemes() {
    try {
        const raw = localStorage.getItem(CUSTOM_THEMES_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        const list: SavedTheme[] = Array.isArray(parsed)
            ? parsed.map((theme: SavedTheme) => ({
                ...theme,
                state: { ...defaults, ...theme.state },
            }))
            : [{
                id: (parsed as ThemeBuilderState).name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "custom",
                state: { ...defaults, ...(parsed as ThemeBuilderState) },
            }];

        for (const theme of list) {
            themes[theme.id] = generatePreset(theme.state);
            themeLabels[theme.id] = theme.state.name;
            themeAccents[theme.id] = hslToHsl(theme.state.primaryHue, Math.min(theme.state.primarySaturation + 5, 100), 38);
        }
    } catch {
        return;
    }
}

function resolveInitialTheme(): string {
    hydrateCustomThemes();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in themes) {
        return stored;
    }
    return DEFAULT_THEME;
}

const activeTheme = shallowRef<string>(resolveInitialTheme());

export function useTheme() {
    function setTheme(name: string) {
        if (!(name in themes)) return;
        activeTheme.value = name;
        localStorage.setItem(STORAGE_KEY, name);
        usePreset(themes[name]);
    }

    function registerCustomTheme(name: string, label: string, accent: string, preset: unknown) {
        themes[name] = preset as typeof themes[string];
        themeLabels[name] = label;
        themeAccents[name] = accent;
    }

    function initTheme() {
        usePreset(themes[activeTheme.value]);
    }

    const themeNames = computed(() => Object.keys(themes));

    return {
        activeTheme,
        themeLabels,
        themeAccents,
        themeNames,
        builtInThemeNames,
        setTheme,
        registerCustomTheme,
        initTheme,
    };
}
