# PrimeVue Theme Builder

A Vue 3 + PrimeVue theme builder package. Install it, drop in two components, and your users can pick built-in themes or build their own — with live preview, palette generation, font switching, and localStorage persistence.

## Requirements

- **Vue 3.4+**
- **PrimeVue 4+** (with Aura base theme)
- **PrimeIcons** (for button icons)
- **TailwindCSS** (utility classes used in component templates)

## Quick start

```bash
npm install primevue-theme-builder
```

```ts
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { NordicTheme, useTheme } from "primevue-theme-builder";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: NordicTheme,
    options: { darkModeSelector: ".my-app-dark" },
  },
});

app.mount("#app");

// Apply the persisted theme from localStorage
const { initTheme } = useTheme();
initTheme();
```

## Components

### `<ThemeChooser />`

A popover button that lists all registered themes (built-in + custom). The user clicks a theme to switch instantly.

```vue
<script setup>
import { ThemeChooser } from "primevue-theme-builder";
</script>

<template>
  <ThemeChooser>
    <!-- Optional: inject extra content below the theme list -->
    <template #footer="{ hide }">
      <button @click="hide()">Open full editor…</button>
    </template>
  </ThemeChooser>
</template>
```

### `<ThemeBuilder />`

A drawer (side panel) with the full theme editor: saved themes list, color sliders, typography, shape controls, and palette previews.

```vue
<script setup>
import { ref } from "vue";
import { ThemeBuilder } from "primevue-theme-builder";

const visible = ref(false);
</script>

<template>
  <button @click="visible = true">Customize theme</button>
  <ThemeBuilder v-model:visible="visible" position="right" />
</template>
```

**Props:**
- `visible` (`boolean`, v-model) — controls drawer visibility
- `position` (`"left" | "right"`, default `"right"`) — drawer side

**Exposed (via template ref):**
- `primarySwatches` — `{ shade, hex }[]`
- `surfaceSwatches` — `{ shade, hex }[]`
- `state` — reactive `ThemeBuilderState`

## Built-in themes

| Theme | Export | Style |
|-------|--------|-------|
| Nordic | `NordicTheme` | Muted steel-blue, warm grey surfaces |
| Terracotta | `TerracottaTheme` | Dusty clay primary, warm parchment |
| Noir | `NoirTheme` | Near-black, cool zinc, editorial |

```ts
import { NordicTheme, TerracottaTheme, NoirTheme } from "primevue-theme-builder";
```

## Composables

### `useTheme()`

Manages the active theme, switching, and custom theme registration.

```ts
const {
  activeTheme,       // Ref<string>
  themeNames,        // ComputedRef<string[]>
  themeLabels,       // Record<string, string>
  themeAccents,      // Record<string, string>
  setTheme,          // (name: string) => void
  registerCustomTheme, // (name, label, accent, preset) => void
  initTheme,         // () => void — apply persisted theme on startup
} = useTheme();
```

### `useThemeBuilder()`

Full theme-building state machine with persistence.

```ts
const {
  state,             // reactive ThemeBuilderState
  preset,            // computed PrimeVue preset
  primarySwatches,   // computed { shade, hex }[]
  surfaceSwatches,   // computed { shade, hex }[]
  savedThemes,       // reactive SavedTheme[]
  activeThemeId,     // Ref<string | null>
  saveCurrentTheme,
  createTheme,
  loadTheme,
  deleteTheme,
  resetCurrentTheme,
} = useThemeBuilder();
```

## Generator functions

For programmatic use without the UI:

```ts
import { generatePreset, defaults } from "primevue-theme-builder";

const preset = generatePreset({ ...defaults, primaryHue: 220 });
```

- **`generatePreset(state)`** — full PrimeVue Aura preset from `ThemeBuilderState`
- **`generatePrimaryPalette(hue, sat, lightness)`** — 11-shade color palette
- **`generateAlertPalette(hue)`** — 11-shade alert palette
- **`generateSurfacePalette(hue, sat)`** — surface/neutral palette
- **`generateShadow(intensity, hue)`** — CSS box-shadow string
- **`hslToHex(h, s, l)`** / **`hexToRgb(hex)`** — color conversion utilities

## ThemeBuilderState

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `"Custom"` | Theme display name |
| `primaryHue` | `number` | `210` | Primary color hue (0–360) |
| `primarySaturation` | `number` | `30` | Primary saturation (0–100) |
| `primaryLightness` | `number` | `50` | Primary lightness (0–100) |
| `accentHue` | `number` | `35` | Accent hue |
| `accentSaturation` | `number` | `70` | Accent saturation |
| `accentLightness` | `number` | `50` | Accent lightness |
| `surfaceHue` | `number` | `35` | Surface hue |
| `surfaceSaturation` | `number` | `8` | Surface saturation |
| `borderRadius` | `number` | `10` | Component border radius (px) |
| `cardBorderRadius` | `number` | `16` | Card border radius (px) |
| `paddingScale` | `number` | `100` | Padding scale (%) |
| `fontWeight` | `number` | `500` | Base font weight |
| `shadowIntensity` | `number` | `50` | Shadow intensity (0–100) |
| `focusRingStyle` | `FocusRingStyle` | `"dashed"` | Focus ring style |
| `titleFont` | `GoogleFont` | `"Playfair Display"` | Title font |
| `bodyFont` | `GoogleFont` | `"Inter"` | Body font |
| `buttonPaddingX` | `number` | `1.25` | Button padding X (rem) |
| `buttonPaddingY` | `number` | `0.625` | Button padding Y (rem) |
| `alertSuccessHue` | `number` | `142` | Success alert hue |
| `alertWarnHue` | `number` | `45` | Warning alert hue |
| `alertErrorHue` | `number` | `0` | Error alert hue |
| `alertInfoHue` | `number` | `210` | Info alert hue |
