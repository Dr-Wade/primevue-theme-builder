# Components

## `<ThemeChooser />`

A popover button that lists all registered themes. Users click a theme to switch instantly.

### Import

```ts
import { ThemeChooser } from "primevue-theme-builder";
```

### Props

This component has no props.

### Slots

| Slot | Scope | Description |
|------|-------|-------------|
| `footer` | `{ hide: () => void }` | Extra content rendered below the theme list. Receives a `hide` function to close the popover. |

### Exposed

| Method | Type | Description |
|--------|------|-------------|
| `hide` | `() => void` | Close the popover programmatically |

### Example

```vue
<template>
  <ThemeChooser>
    <template #footer="{ hide }">
      <button @click="hide()">Open full editor…</button>
    </template>
  </ThemeChooser>
</template>
```

---

## `<ThemeBuilder />`

A drawer (side panel) containing the full theme editor: saved themes list, color sliders, typography controls, shape settings, and palette previews.

### Import

```ts
import { ThemeBuilder } from "primevue-theme-builder";
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `boolean` | — | Controls drawer visibility. Supports `v-model:visible`. |
| `position` | `"left" \| "right"` | `"right"` | Which side the drawer slides in from. |

### Exposed

| Property | Type | Description |
|----------|------|-------------|
| `primarySwatches` | `{ shade: number, hex: string }[]` | Current primary color swatches |
| `surfaceSwatches` | `{ shade: number, hex: string }[]` | Current surface color swatches |
| `state` | `ThemeBuilderState` | The reactive builder state |

### Example

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

---

## `<ThemeBuilderControls />`

The form controls sub-component used inside `ThemeBuilder`. Can be used standalone to build a custom editor layout.

### Import

```ts
import { ThemeBuilderControls } from "primevue-theme-builder";
```

---

## `<ThemeBuilderPreview />`

The palette and swatch preview sub-component used inside `ThemeBuilder`. Can be used standalone alongside `ThemeBuilderControls`.

### Import

```ts
import { ThemeBuilderPreview } from "primevue-theme-builder";
```
