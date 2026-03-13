# Theme Chooser

The `ThemeChooser` component is a popover button that lets users switch between registered themes with a single click.

## Basic Usage

```vue
<script setup>
import { ThemeChooser } from "primevue-theme-builder";
</script>

<template>
  <ThemeChooser />
</template>
```

This renders a small palette icon button. Clicking it opens a popover listing all themes (built-in and custom). Each entry shows its accent swatch and label. The active theme has a checkmark.

At the bottom, a **Customize…** link opens the full `ThemeBuilder` drawer.

## Footer Slot

You can inject extra content below the theme list using the `footer` slot:

```vue
<template>
  <ThemeChooser>
    <template #footer="{ hide }">
      <button @click="hide()">Close</button>
    </template>
  </ThemeChooser>
</template>
```

The slot receives a `hide` function to close the popover programmatically.

## Exposed Methods

You can access the component instance via a template ref:

```vue
<script setup>
import { ref } from "vue";
import { ThemeChooser } from "primevue-theme-builder";

const chooser = ref<InstanceType<typeof ThemeChooser> | null>(null);

function closeChooser() {
  chooser.value?.hide();
}
</script>

<template>
  <ThemeChooser ref="chooser" />
</template>
```

| Method | Description |
|--------|-------------|
| `hide()` | Closes the popover |

## How It Works

1. The popover lists all keys in the internal `themes` registry.
2. Clicking a theme calls `useTheme().setTheme(name)`, which applies the preset via `@primeuix/themes` and persists the choice in `localStorage`.
3. The **Customize…** button opens a `ThemeBuilder` drawer embedded inside the component.
