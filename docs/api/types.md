# Types

## `ThemeBuilderState`

The main state interface used by the theme builder. Every property maps to a visual control in the builder UI.

```ts
import type { ThemeBuilderState } from "primevue-theme-builder";
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | `"Custom"` | Theme display name |
| `baseTheme` | `BaseTheme` | `"Aura"` | PrimeVue base theme to extend |
| `primaryHue` | `number` | `210` | Primary color hue (0–360) |
| `primarySaturation` | `number` | `30` | Primary saturation (0–100) |
| `primaryLightness` | `number` | `50` | Primary lightness (0–100) |
| `accentHue` | `number` | `35` | Accent color hue (0–360) |
| `accentSaturation` | `number` | `70` | Accent saturation (0–100) |
| `accentLightness` | `number` | `50` | Accent lightness (0–100) |
| `surfaceHue` | `number` | `35` | Surface/neutral hue (0–360) |
| `surfaceSaturation` | `number` | `8` | Surface saturation (0–100) |
| `borderRadius` | `number` | `10` | Component border radius in px |
| `cardBorderRadius` | `number` | `16` | Card border radius in px |
| `paddingScale` | `number` | `100` | Padding scale as percentage |
| `fontWeight` | `number` | `500` | Base font weight |
| `shadowIntensity` | `number` | `50` | Shadow intensity (0–100) |
| `focusRingStyle` | `FocusRingStyle` | `"dashed"` | Focus ring style |
| `titleFont` | `GoogleFont` | `"Playfair Display"` | Title/heading font family |
| `bodyFont` | `GoogleFont` | `"Inter"` | Body text font family |
| `buttonPaddingX` | `number` | `1.25` | Button horizontal padding in rem |
| `buttonPaddingY` | `number` | `0.625` | Button vertical padding in rem |
| `alertSuccessHue` | `number` | `142` | Success alert color hue |
| `alertWarnHue` | `number` | `45` | Warning alert color hue |
| `alertErrorHue` | `number` | `0` | Error alert color hue |
| `alertInfoHue` | `number` | `210` | Info alert color hue |

### Default Values

```ts
import { defaults } from "primevue-theme-builder";

console.log(defaults);
// { name: "Custom", baseTheme: "Aura", primaryHue: 210, ... }
```

---

## `SavedTheme`

A persisted theme entry.

```ts
import type { SavedTheme } from "primevue-theme-builder";
```

```ts
interface SavedTheme {
  id: string;
  state: ThemeBuilderState;
}
```

---

## `FocusRingStyle`

```ts
type FocusRingStyle = "dashed" | "solid" | "none";
```

---

## `BaseTheme`

Available PrimeVue base themes to extend.

```ts
type BaseTheme = "Aura" | "Material" | "Lara" | "Nora";
```

---

## `GoogleFont`

Union type of all supported Google Font family names. Currently includes 48 fonts.

```ts
import type { GoogleFont } from "primevue-theme-builder";
```

See the full list:

```ts
import { GOOGLE_FONTS } from "primevue-theme-builder";

console.log(GOOGLE_FONTS);
// ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", ...]
```

---

## `ColorPalette`

A mapping of shade numbers to hex color strings.

```ts
type ColorPalette = Record<number, string>;
```

Standard shades: `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`.

```ts
import { PALETTE_SHADES } from "primevue-theme-builder";
// readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
```
