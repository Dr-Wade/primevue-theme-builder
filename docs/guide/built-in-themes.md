# Built-in Themes

The package ships with three carefully designed themes. Each is a full PrimeVue preset that you can use directly.

## Available Themes

| Theme | Export | Style |
|-------|--------|-------|
| Nordic | `NordicTheme` | Muted steel-blue primary, warm grey surfaces |
| Terracotta | `TerracottaTheme` | Dusty clay primary, warm parchment surfaces |
| Noir | `NoirTheme` | Near-black, cool zinc, editorial feel |

## Importing Themes

```ts
import { NordicTheme, TerracottaTheme, NoirTheme } from "primevue-theme-builder";
```

## Using a Theme as the Default

Pass any theme as the PrimeVue preset in your app entry:

```ts
import PrimeVue from "primevue/config";
import { TerracottaTheme } from "primevue-theme-builder";

app.use(PrimeVue, {
  theme: {
    preset: TerracottaTheme,
    options: { darkModeSelector: ".my-app-dark" },
  },
});
```

## Theme Metadata

You can access the full list of registered themes, their labels, and accent colors:

```ts
import {
  themes,         // Record<string, Preset> — all registered presets
  themeLabels,    // Record<string, string> — display names
  themeAccents,   // Record<string, string> — accent hex colors
  builtInThemeNames, // readonly ["slate", "forest", "ember"]
} from "primevue-theme-builder";
```

These are the same registries used internally by the `ThemeChooser` component. When you register a custom theme via `useTheme().registerCustomTheme()`, it appears in all of these maps.
