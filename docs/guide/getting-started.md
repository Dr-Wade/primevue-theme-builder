# Getting Started

## Requirements

- **Vue 3.4+**
- **PrimeVue 4+** (with Aura, Material, Lara, or Nora base theme)
- **PrimeIcons** (for button icons)
- **TailwindCSS 4+** with `tailwindcss-primeui` (for component utility classes)

## Installation

::: code-group

```bash [npm]
npm install primevue-theme-builder
```

```bash [pnpm]
pnpm add primevue-theme-builder
```

```bash [yarn]
yarn add primevue-theme-builder
```

:::

### Peer Dependencies

The package expects the following peer dependencies in your project:

```bash
npm install vue primevue @primeuix/themes tailwindcss @tailwindcss/vite tailwindcss-primeui primeicons
```

## Tailwind CSS v4 Setup

If you are using Tailwind CSS v4, make sure your app stylesheet includes the package as a source so Tailwind can see the utility classes used by the components.

```css
@import "tailwindcss";
@plugin "tailwindcss-primeui";

@source "../node_modules/primevue-theme-builder/dist";
@source "../node_modules/primevue-theme-builder";
```

You should also include any PrimeVue or app-level styles you normally use, for example:

```ts
import "primeicons/primeicons.css";
```

## Basic Setup

### 1. Configure PrimeVue with a built-in theme

In your `main.ts`:

```ts
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";

import { NordicTheme, TerracottaTheme, NoirTheme, ForestTheme, PastelTheme, useTheme } from "primevue-theme-builder";
import App from "./App.vue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: NordicTheme,
    options: { darkModeSelector: ".my-app-dark" },
  },
});

app.mount("#app");

// Restore the user's persisted theme from localStorage
const { initTheme } = useTheme();
initTheme();
```

### 2. Add the ThemeChooser to your app

```vue
<script setup>
import { ThemeChooser } from "primevue-theme-builder";
</script>

<template>
  <header>
    <ThemeChooser />
  </header>
</template>
```

That's it! Your users can now click the palette button to switch between built-in themes, or open the full theme builder to create their own.

## What's Included

| Export | Description |
|--------|-------------|
| `ThemeChooser` | Popover button — lists themes, one-click switch |
| `ThemeBuilder` | Drawer panel — full visual editor |
| `useTheme()` | Composable — theme switching and registration |
| `useThemeBuilder()` | Composable — full theme editing state machine |
| `generatePreset()` | Function — create a PrimeVue preset from state |
| `NordicTheme` / `TerracottaTheme` / `NoirTheme` / `ForestTheme` / `PastelTheme` | Built-in theme presets |

## Next Steps

- [Built-in Themes](/guide/built-in-themes) — explore the five included themes
- [Theme Chooser](/guide/theme-chooser) — customize the theme picker
- [Theme Builder](/guide/theme-builder) — embed the full editor
- [Programmatic Usage](/guide/programmatic-usage) — generate themes from code
