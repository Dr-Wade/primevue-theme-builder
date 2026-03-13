# Composables

## `useTheme()`

Manages the active theme, switching between themes, and registering custom themes. Theme state is persisted to `localStorage`.

```ts
import { useTheme } from "primevue-theme-builder";

const {
  activeTheme,
  themeNames,
  themeLabels,
  themeAccents,
  builtInThemeNames,
  setTheme,
  registerCustomTheme,
  initTheme,
} = useTheme();
```

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `activeTheme` | `ShallowRef<string>` | The currently active theme key (e.g. `"slate"`) |
| `themeNames` | `ComputedRef<string[]>` | All registered theme keys (built-in + custom) |
| `themeLabels` | `Record<string, string>` | Map of theme keys to display names |
| `themeAccents` | `Record<string, string>` | Map of theme keys to accent hex colors |
| `builtInThemeNames` | `readonly ["slate", "forest", "ember"]` | Keys of the three built-in themes |

### Methods

#### `setTheme(name: string): void`

Switch to a registered theme by key. Applies the preset immediately and persists the choice to `localStorage`. No-op if the theme name is not in the registry.

```ts
setTheme("forest");
```

#### `registerCustomTheme(name: string, label: string, accent: string, preset: unknown): void`

Register a new theme in the global registry. After registration, it appears in `themeNames` and the `ThemeChooser` popover.

```ts
registerCustomTheme("ocean", "Ocean Blue", "#2563eb", myPreset);
```

| Param | Type | Description |
|-------|------|-------------|
| `name` | `string` | Unique theme key |
| `label` | `string` | Human-readable display name |
| `accent` | `string` | Hex color for the accent swatch |
| `preset` | `unknown` | A PrimeVue preset (from `definePreset` or `generatePreset`) |

#### `initTheme(): void`

Apply the persisted theme from `localStorage`. Call this once at app startup, after `app.mount()`.

```ts
const { initTheme } = useTheme();
initTheme();
```

---

## `useThemeBuilder()`

Full theme-building state machine. Manages builder state, saved themes, live preview, and persistence.

```ts
import { useThemeBuilder } from "primevue-theme-builder";

const {
  state,
  preset,
  primarySwatches,
  surfaceSwatches,
  savedThemes,
  activeThemeId,
  applyPreset,
  saveCurrentTheme,
  createTheme,
  loadTheme,
  deleteTheme,
  resetCurrentTheme,
  defaults,
} = useThemeBuilder();
```

### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `state` | `Reactive<ThemeBuilderState>` | The current builder state. Mutate directly to see live changes. |
| `preset` | `ComputedRef<Preset>` | The computed PrimeVue preset derived from `state` |
| `primarySwatches` | `ComputedRef<{ shade: number, hex: string }[]>` | The 11-shade primary palette |
| `surfaceSwatches` | `ComputedRef<{ shade: number, hex: string }[]>` | The 11-shade surface palette |
| `savedThemes` | `Reactive<SavedTheme[]>` | All saved custom themes |
| `activeThemeId` | `ShallowRef<string \| null>` | ID of the currently active custom theme |
| `defaults` | `ThemeBuilderState` | The default builder state values |

### Methods

#### `applyPreset(): void`

Immediately apply the current `preset` to PrimeVue. This is called automatically when `state` changes.

#### `saveCurrentTheme(): void`

Save the current builder state to `localStorage` and register the theme in the global registry.

#### `createTheme(name?: string): void`

Create a new custom theme with default values. Defaults to `"New theme"` if no name is provided.

```ts
createTheme("My Brand Theme");
```

#### `loadTheme(id: string): void`

Load a saved theme by its ID into the builder state.

#### `deleteTheme(id: string): void`

Delete a saved theme. If the deleted theme is active, the builder loads the first remaining theme or resets to defaults.

#### `resetCurrentTheme(): void`

Reset the current builder state to default values, keeping the theme name.
