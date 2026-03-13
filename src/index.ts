// Types
export type {
    ThemeBuilderState,
    SavedTheme,
    FocusRingStyle,
    GoogleFont,
    ColorPalette,
} from "./types";

export {
    GOOGLE_FONTS,
    PALETTE_SHADES,
    defaults,
} from "./types";

// Generator functions
export {
    hslToHsl,
    hslToHex,
    hslToRgba,
    hexToRgb,
    generatePrimaryPalette,
    generateAlertPalette,
    generateSurfacePalette,
    generateShadow,
    generatePreset,
    generateCode,
    resolveBaseTheme,
} from "./generator";

export type { BaseTheme } from "./types";

// Composables
export { useTheme } from "./useTheme";
export { useThemeBuilder } from "./vue";

// Themes
export { NordicTheme, TerracottaTheme, NoirTheme, ForestTheme, PastelTheme } from "./themes";
export { themes, themeLabels, themeAccents, builtInThemeNames } from "./themes";

// Components
export { default as ThemeChooser } from "./components/ThemeChooser.vue";
export { default as ThemeBuilder } from "./components/ThemeBuilder.vue";
export { default as ThemeBuilderControls } from "./components/ThemeBuilderControls.vue";
export { default as ThemeBuilderPreview } from "./components/ThemeBuilderPreview.vue";
