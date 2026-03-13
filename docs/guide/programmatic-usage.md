# Programmatic Usage

You can generate PrimeVue presets entirely from code, without using any UI components.

## Generate a Preset

```ts
import { generatePreset, defaults } from "primevue-theme-builder";

// Create a preset with a custom primary hue
const preset = generatePreset({
  ...defaults,
  primaryHue: 220,
  primarySaturation: 40,
});
```

Use the generated preset with PrimeVue:

```ts
import PrimeVue from "primevue/config";

app.use(PrimeVue, {
  theme: { preset },
});
```

## Generate Exportable Code

Generate a copy-pasteable TypeScript file for a theme:

```ts
import { generateCode, defaults } from "primevue-theme-builder";

const code = generateCode({
  ...defaults,
  name: "Ocean",
  primaryHue: 200,
  primarySaturation: 50,
});

console.log(code);
// Outputs a full TypeScript file with definePreset(...)
```

## Generate Individual Palettes

```ts
import {
  generatePrimaryPalette,
  generateSurfacePalette,
  generateAlertPalette,
} from "primevue-theme-builder";

// 11-shade primary palette (50–950)
const primary = generatePrimaryPalette(220, 30, 50);
// { 50: "#...", 100: "#...", ..., 950: "#..." }

// Surface/neutral palette
const surface = generateSurfacePalette(35, 8);

// Alert palette (for success/warn/error/info)
const green = generateAlertPalette(142);
```

## Utility Functions

```ts
import { hslToHex, hexToRgb, generateShadow } from "primevue-theme-builder";

hslToHex(210, 30, 50);    // "#5978a0"
hexToRgb("#5978a0");       // "89, 120, 160"
generateShadow(50, 210);  // CSS box-shadow string
```

## Resolve Base Theme

Get the raw PrimeVue base theme object by name:

```ts
import { resolveBaseTheme } from "primevue-theme-builder";

const aura = resolveBaseTheme("Aura");
const material = resolveBaseTheme("Material");
```

Available base themes: `"Aura"`, `"Material"`, `"Lara"`, `"Nora"`.
