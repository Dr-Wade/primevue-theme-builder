import { reactive, computed, watch, shallowRef } from "vue";
import { usePreset } from "@primeuix/themes";

import type { ThemeBuilderState, SavedTheme } from "./types";
import { defaults, PALETTE_SHADES } from "./types";
import { generatePreset, generatePrimaryPalette, generateSurfacePalette, hslToHex } from "./generator";
import { useTheme } from "./useTheme";

export type { ThemeBuilderState, SavedTheme };
export { defaults };

const STORAGE_KEY = "aadalen-custom-themes";
const ACTIVE_KEY = "aadalen-active-theme-id";

function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function generateId(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function injectGoogleFont(family: string) {
    const encoded = family.replace(/ /g, "+");
    const href = `https://fonts.googleapis.com/css2?family=${encoded}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap`;
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

export function useThemeBuilder() {
    const { registerCustomTheme, setTheme } = useTheme();

    function load(): SavedTheme[] {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed)) {
                const migrated: ThemeBuilderState = { ...defaults, ...parsed };
                const id = slugify(migrated.name) || "custom";
                return [{ id, state: migrated }];
            }
            return parsed.map((t: SavedTheme) => ({ ...t, state: { ...defaults, ...t.state } }));
        } catch {
            return [];
        }
    }

    function save(list: SavedTheme[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    const savedThemes = reactive<SavedTheme[]>(load());
    const activeThemeId = shallowRef<string | null>(
        localStorage.getItem(ACTIVE_KEY) ?? (savedThemes[0]?.id ?? null)
    );

    const initialState = savedThemes.find((t: SavedTheme) => t.id === activeThemeId.value)?.state ?? defaults;
    const state = reactive<ThemeBuilderState>({ ...initialState });

    const primaryPalette = computed(() =>
        generatePrimaryPalette(state.primaryHue, state.primarySaturation, state.primaryLightness)
    );

    const surfacePalette = computed(() =>
        generateSurfacePalette(state.surfaceHue, state.surfaceSaturation)
    );

    const primarySwatches = computed(() =>
        PALETTE_SHADES.map(shade => ({ shade, hex: primaryPalette.value[shade] }))
    );

    const surfaceSwatches = computed(() =>
        PALETTE_SHADES.map(shade => ({ shade, hex: surfacePalette.value[shade] }))
    );

    const preset = computed(() => generatePreset(state));

    function applyPreset() {
        usePreset(preset.value);
    }

    function persistAll() {
        save([...savedThemes]);
    }

    function registerAndActivate() {
        if (!activeThemeId.value) return;
        const accent = hslToHex(state.primaryHue, Math.min(state.primarySaturation + 5, 100), 38);
        registerCustomTheme(activeThemeId.value, state.name, accent, preset.value);
        setTheme(activeThemeId.value);
    }

    function saveCurrentTheme() {
        if (!activeThemeId.value) return;
        const idx = savedThemes.findIndex((t: SavedTheme) => t.id === activeThemeId.value);
        if (idx >= 0) {
            savedThemes[idx] = { id: activeThemeId.value, state: { ...state } };
        }
        persistAll();
        registerAndActivate();
    }

    function createTheme(name = "New theme") {
        const id = generateId();
        const newState: ThemeBuilderState = { ...defaults, name };
        savedThemes.push({ id, state: newState });
        persistAll();
        activeThemeId.value = id;
        localStorage.setItem(ACTIVE_KEY, id);
        Object.assign(state, newState);
    }

    function loadTheme(id: string) {
        const found = savedThemes.find((t: SavedTheme) => t.id === id);
        if (!found) return;
        activeThemeId.value = id;
        localStorage.setItem(ACTIVE_KEY, id);
        Object.assign(state, { ...found.state });
    }

    function deleteTheme(id: string) {
        const idx = savedThemes.findIndex((t: SavedTheme) => t.id === id);
        if (idx < 0) return;
        savedThemes.splice(idx, 1);
        persistAll();
        if (activeThemeId.value === id) {
            if (savedThemes.length > 0) {
                loadTheme(savedThemes[0].id);
            } else {
                activeThemeId.value = null;
                localStorage.removeItem(ACTIVE_KEY);
                Object.assign(state, defaults);
            }
        }
    }

    function resetCurrentTheme() {
        Object.assign(state, { ...defaults, name: state.name });
    }

    function applyFonts() {
        injectGoogleFont(state.titleFont);
        injectGoogleFont(state.bodyFont);
        const styleId = "theme-builder-fonts";
        let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
        if (!styleEl) {
            styleEl = document.createElement("style");
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }
        const body = `'${state.bodyFont}', sans-serif`;
        const title = `'${state.titleFont}', serif`;
        styleEl.textContent = [
            `body { font-family: ${body} !important; }`,
            `:root { --default-font-family: ${body}; }`,
            `h1, h2, h3, h4, h5, .p-card-title { font-family: ${title} !important; }`,
        ].join("\n");
    }

    watch(state, () => {
        applyPreset();
        applyFonts();
    }, { immediate: true });

    return {
        state,
        preset,
        primarySwatches,
        surfaceSwatches,
        savedThemes,
        activeThemeId,
        applyPreset,
        saveCurrentTheme,
        createTheme,
        loadTheme,
        deleteTheme,
        resetCurrentTheme,
        defaults,
    };
}
