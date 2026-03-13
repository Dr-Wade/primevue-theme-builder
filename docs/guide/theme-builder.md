# Theme Builder

The `ThemeBuilder` component is a drawer (side panel) with the full visual theme editor. It lets users create, edit, save, and delete custom themes with live preview.

## Basic Usage

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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | — | Controls drawer visibility. Supports `v-model`. |
| `position` | `"left" \| "right"` | `"right"` | Which side the drawer opens from. |

## Exposed Properties

Access the builder's internal state via a template ref:

```vue
<script setup>
import { ref } from "vue";
import { ThemeBuilder } from "primevue-theme-builder";

const builder = ref<InstanceType<typeof ThemeBuilder> | null>(null);

// Access after mount:
// builder.value?.primarySwatches
// builder.value?.surfaceSwatches
// builder.value?.state
</script>

<template>
  <ThemeBuilder ref="builder" v-model:visible="visible" />
</template>
```

| Property | Type | Description |
|----------|------|-------------|
| `primarySwatches` | `{ shade: number, hex: string }[]` | Current primary color palette |
| `surfaceSwatches` | `{ shade: number, hex: string }[]` | Current surface color palette |
| `state` | `ThemeBuilderState` | Reactive builder state object |

## Sub-Components

The builder is composed of two sub-components that can be used independently:

### ThemeBuilderControls

The form controls (sliders, dropdowns, etc.) used in the builder panel.

```vue
<script setup>
import { ThemeBuilderControls } from "primevue-theme-builder";
</script>
```

### ThemeBuilderPreview

The palette and swatch preview used in the builder panel.

```vue
<script setup>
import { ThemeBuilderPreview } from "primevue-theme-builder";
</script>
```

## What Can Users Customize?

The builder exposes controls for all properties in `ThemeBuilderState`:

- **Colors** — Primary hue/saturation/lightness, accent colors, surface hue/saturation
- **Typography** — Title font, body font, font weight (from Google Fonts)
- **Shape** — Border radius, card border radius, padding scale
- **Effects** — Shadow intensity, focus ring style
- **Buttons** — Horizontal and vertical padding
- **Alerts** — Hues for success, warning, error, and info states
- **Base Theme** — Choose between Aura, Material, Lara, or Nora

Changes are applied live as the user adjusts sliders. Themes are automatically persisted to `localStorage`.
