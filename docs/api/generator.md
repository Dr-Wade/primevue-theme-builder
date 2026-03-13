# Generator Functions

Low-level functions for generating PrimeVue presets, color palettes, and utility conversions. These can be used without any Vue components.

## `generatePreset(state)`

Generate a full PrimeVue preset from a `ThemeBuilderState` object. This is the core function that converts slider values into a complete theme.

```ts
import { generatePreset, defaults } from "primevue-theme-builder";

const preset = generatePreset({ ...defaults, primaryHue: 220 });
```

| Param | Type | Description |
|-------|------|-------------|
| `state` | `ThemeBuilderState` | Complete builder state |

**Returns:** A PrimeVue preset object (from `definePreset`).

---

## `generateCode(state)`

Generate a copy-pasteable TypeScript file that creates a PrimeVue preset.

```ts
import { generateCode, defaults } from "primevue-theme-builder";

const code = generateCode({ ...defaults, name: "MyTheme" });
```

| Param | Type | Description |
|-------|------|-------------|
| `state` | `ThemeBuilderState` | Complete builder state |

**Returns:** `string` — TypeScript source code.

---

## `generatePrimaryPalette(hue, sat, centerL?)`

Generate an 11-shade primary color palette.

```ts
import { generatePrimaryPalette } from "primevue-theme-builder";

const palette = generatePrimaryPalette(210, 30, 50);
// { 50: "#e8ecf2", 100: "#c8d2e0", ..., 950: "#0f1520" }
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `hue` | `number` | — | Hue value (0–360) |
| `sat` | `number` | — | Saturation (0–100) |
| `centerL` | `number` | `50` | Center lightness (0–100) |

**Returns:** `ColorPalette` — `Record<number, string>` with shades 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950.

---

## `generateAlertPalette(hue)`

Generate an 11-shade alert color palette (used for success, warning, error, info states).

```ts
import { generateAlertPalette } from "primevue-theme-builder";

const success = generateAlertPalette(142);
```

| Param | Type | Description |
|-------|------|-------------|
| `hue` | `number` | Hue value (0–360) |

**Returns:** `ColorPalette`

---

## `generateSurfacePalette(hue, sat)`

Generate a surface/neutral color palette.

```ts
import { generateSurfacePalette } from "primevue-theme-builder";

const surface = generateSurfacePalette(35, 8);
```

| Param | Type | Description |
|-------|------|-------------|
| `hue` | `number` | Hue value (0–360) |
| `sat` | `number` | Saturation (0–100) |

**Returns:** `ColorPalette` — includes shade `0` (`#ffffff`) plus shades 50–950.

---

## `generateShadow(intensity, hue)`

Generate a CSS `box-shadow` string.

```ts
import { generateShadow } from "primevue-theme-builder";

const shadow = generateShadow(50, 210);
// "0 2px 12px 0 hsla(210, 10%, 20%, 0.06), 0 1px 3px 0 hsla(210, 10%, 20%, 0.03)"
```

| Param | Type | Description |
|-------|------|-------------|
| `intensity` | `number` | Shadow intensity (0–100) |
| `hue` | `number` | Hue for the shadow color |

**Returns:** `string` — CSS box-shadow value.

---

## `resolveBaseTheme(name)`

Get the raw PrimeVue base theme object by name.

```ts
import { resolveBaseTheme } from "primevue-theme-builder";

const aura = resolveBaseTheme("Aura");
```

| Param | Type | Description |
|-------|------|-------------|
| `name` | `BaseTheme` | `"Aura"` \| `"Material"` \| `"Lara"` \| `"Nora"` |

**Returns:** The base theme object.

---

## `hslToHex(h, s, l)`

Convert HSL values to a hex color string.

```ts
import { hslToHex } from "primevue-theme-builder";

hslToHex(210, 30, 50); // "#5978a0"
```

**Returns:** `string` — hex color (e.g. `"#5978a0"`).

---

## `hexToRgb(hex)`

Convert a hex color to an RGB string (comma-separated).

```ts
import { hexToRgb } from "primevue-theme-builder";

hexToRgb("#5978a0"); // "89, 120, 160"
```

**Returns:** `string` — comma-separated RGB values.
