# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2026-03-23

### Fixed

- Fixed z-index issues with modal and drawer components

## [0.1.0] - 2026-03-13

### Added

- **ThemeChooser** component — palette-icon popover listing built-in and custom themes
- **ThemeBuilder** component — full-screen drawer with live preview panel and controls
- **ThemeBuilderControls** component — sliders, selects, and inputs for all theme properties
- **ThemeBuilderPreview** component — live PrimeVue component previews
- **Built-in themes**: Nordic, Terracotta, Noir, Forest, Pastel
- **HSL color system** — all palette values expressed as `hsl()` strings
- **`useTheme()`** composable — active theme management with localStorage persistence
- **`useThemeBuilder()`** composable — full theme editing state machine with save/load/delete
- **`generatePreset()`** — generate a PrimeVue preset from a `ThemeBuilderState`
- **`generateCode()`** — export copy-pasteable TypeScript including font CSS helpers
- **`generatePrimaryPalette()`**, **`generateSurfacePalette()`**, **`generateAlertPalette()`** — palette generation utilities
- **`hslToHsl()`**, **`hslToRgba()`** — HSL color utilities
- Custom theme persistence via `localStorage`
- Google Fonts injection for title and body fonts
- Export modal with clipboard copy
