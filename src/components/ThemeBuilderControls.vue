<script setup lang="ts">
import Slider from "primevue/slider";
import Select from "primevue/select";
import InputText from "primevue/inputtext";
import SelectButton from "primevue/selectbutton";
import { computed } from "vue";
import { GOOGLE_FONTS } from "../types";
import type { ThemeBuilderState, FocusRingStyle, GoogleFont, BaseTheme } from "../types";

type Props = {
    state: ThemeBuilderState;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: "update", key: keyof ThemeBuilderState, value: ThemeBuilderState[keyof ThemeBuilderState]): void;
}>();

function update<K extends keyof ThemeBuilderState>(key: K, value: ThemeBuilderState[K]) {
    emit("update", key, value);
}

const baseThemeOptions: { label: string; value: BaseTheme }[] = [
    { label: "Aura",     value: "Aura"     },
    { label: "Material", value: "Material" },
    { label: "Lara",     value: "Lara"     },
    { label: "Nora",     value: "Nora"     },
];

const focusRingOptions = [
    { label: "Dashed", value: "dashed" },
    { label: "Solid", value: "solid" },
    { label: "None", value: "none" },
];

const fontWeightOptions = [
    { label: "Light", value: 400 },
    { label: "Regular", value: 500 },
    { label: "Semi", value: 600 },
    { label: "Bold", value: 700 },
];

const fontOptions = GOOGLE_FONTS.map(f => ({ label: f, value: f }));

const primaryPreviewColor = computed(() =>
    `hsl(${props.state.primaryHue}, ${props.state.primarySaturation}%, ${props.state.primaryLightness}%)`
);

const surfacePreviewColor = computed(() =>
    `hsl(${props.state.surfaceHue}, ${props.state.surfaceSaturation}%, 60%)`
);

const accentPreviewColor = computed(() =>
    `hsl(${props.state.accentHue}, ${props.state.accentSaturation}%, ${props.state.accentLightness}%)`
);

const alertColorMap = computed(() => ({
    Success: `hsl(${props.state.alertSuccessHue}, 70%, 47%)`,
    Warning: `hsl(${props.state.alertWarnHue},    70%, 47%)`,
    Error:   `hsl(${props.state.alertErrorHue},   70%, 47%)`,
    Info:    `hsl(${props.state.alertInfoHue},     70%, 47%)`,
}));
</script>

<template>
  <div class="flex flex-col gap-5">

    <!-- Name -->
    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold uppercase tracking-wide text-surface-500">Theme name</label>
      <InputText
        :model-value="state.name"
        placeholder="My theme"
        @update:model-value="update('name', $event as string)"
      />
    </div>

    <!-- Base theme -->
    <div class="flex flex-col gap-1.5">
      <label class="text-xs font-semibold uppercase tracking-wide text-surface-500">Base theme</label>
      <SelectButton
        :model-value="state.baseTheme"
        :options="baseThemeOptions"
        option-label="label"
        option-value="value"
        @update:model-value="update('baseTheme', $event as BaseTheme)"
      />
    </div>

    <!-- Section: Primary color -->
    <div class="border-t border-surface-100 pt-4 flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Primary color</p>

      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-medium text-surface-600">Hue</label>
          <span
            class="inline-block h-4 w-4 rounded-full border border-surface-200 shrink-0"
            :style="{ background: primaryPreviewColor }"
          />
        </div>
        <div
          class="h-2.5 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(0,${state.primarySaturation}%,${state.primaryLightness}%),
              hsl(60,${state.primarySaturation}%,${state.primaryLightness}%),
              hsl(120,${state.primarySaturation}%,${state.primaryLightness}%),
              hsl(180,${state.primarySaturation}%,${state.primaryLightness}%),
              hsl(240,${state.primarySaturation}%,${state.primaryLightness}%),
              hsl(300,${state.primarySaturation}%,${state.primaryLightness}%),
              hsl(360,${state.primarySaturation}%,${state.primaryLightness}%))`
          }"
        />
        <Slider
          :model-value="state.primaryHue"
          :min="0"
          :max="360"
          :step="1"
          @update:model-value="update('primaryHue', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Saturation — {{ state.primarySaturation }}%</label>
        <div
          class="h-2.5 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(${state.primaryHue},5%,${state.primaryLightness}%),
              hsl(${state.primaryHue},80%,${state.primaryLightness}%))`
          }"
        />
        <Slider
          :model-value="state.primarySaturation"
          :min="5"
          :max="80"
          :step="1"
          @update:model-value="update('primarySaturation', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Brightness — {{ state.primaryLightness }}%</label>
        <div
          class="h-2.5 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(${state.primaryHue},${state.primarySaturation}%,15%),
              hsl(${state.primaryHue},${state.primarySaturation}%,50%),
              hsl(${state.primaryHue},${state.primarySaturation}%,90%))`
          }"
        />
        <Slider
          :model-value="state.primaryLightness"
          :min="15"
          :max="85"
          :step="1"
          @update:model-value="update('primaryLightness', $event as number)"
        />
      </div>
    </div>

    <!-- Section: Accent color -->
    <div class="border-t border-surface-100 pt-4 flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Accent color</p>

      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-medium text-surface-600">Hue</label>
          <span
            class="inline-block h-4 w-4 rounded-full border border-surface-200 shrink-0"
            :style="{ background: accentPreviewColor }"
          />
        </div>
        <div
          class="h-2.5 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(0,${state.accentSaturation}%,${state.accentLightness}%),
              hsl(60,${state.accentSaturation}%,${state.accentLightness}%),
              hsl(120,${state.accentSaturation}%,${state.accentLightness}%),
              hsl(180,${state.accentSaturation}%,${state.accentLightness}%),
              hsl(240,${state.accentSaturation}%,${state.accentLightness}%),
              hsl(300,${state.accentSaturation}%,${state.accentLightness}%),
              hsl(360,${state.accentSaturation}%,${state.accentLightness}%))`
          }"
        />
        <Slider
          :model-value="state.accentHue"
          :min="0"
          :max="360"
          :step="1"
          @update:model-value="update('accentHue', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Saturation — {{ state.accentSaturation }}%</label>
        <div
          class="h-2.5 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(${state.accentHue},5%,${state.accentLightness}%),
              hsl(${state.accentHue},100%,${state.accentLightness}%))`
          }"
        />
        <Slider
          :model-value="state.accentSaturation"
          :min="5"
          :max="100"
          :step="1"
          @update:model-value="update('accentSaturation', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Brightness — {{ state.accentLightness }}%</label>
        <div
          class="h-2.5 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(${state.accentHue},${state.accentSaturation}%,15%),
              hsl(${state.accentHue},${state.accentSaturation}%,50%),
              hsl(${state.accentHue},${state.accentSaturation}%,90%))`
          }"
        />
        <Slider
          :model-value="state.accentLightness"
          :min="15"
          :max="85"
          :step="1"
          @update:model-value="update('accentLightness', $event as number)"
        />
      </div>
    </div>

    <!-- Section: Surface color -->
    <div class="border-t border-surface-100 pt-4 flex flex-col gap-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Surface color</p>

      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <label class="text-xs font-medium text-surface-600">Surface hue</label>
          <span
            class="inline-block h-4 w-4 rounded-full border border-surface-200 shrink-0"
            :style="{ background: surfacePreviewColor }"
          />
        </div>
        <div
          class="h-2.5 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(0,${state.surfaceSaturation}%,60%),
              hsl(60,${state.surfaceSaturation}%,60%),
              hsl(120,${state.surfaceSaturation}%,60%),
              hsl(180,${state.surfaceSaturation}%,60%),
              hsl(240,${state.surfaceSaturation}%,60%),
              hsl(300,${state.surfaceSaturation}%,60%),
              hsl(360,${state.surfaceSaturation}%,60%))`
          }"
        />
        <Slider
          :model-value="state.surfaceHue"
          :min="0"
          :max="360"
          :step="1"
          @update:model-value="update('surfaceHue', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Surface saturation — {{ state.surfaceSaturation }}%</label>
        <div
          class="h-2.5 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(${state.surfaceHue},0%,60%),
              hsl(${state.surfaceHue},20%,60%))`
          }"
        />
        <Slider
          :model-value="state.surfaceSaturation"
          :min="0"
          :max="20"
          :step="1"
          @update:model-value="update('surfaceSaturation', $event as number)"
        />
      </div>
    </div>

    <!-- Section: Alert colors -->
    <div class="border-t border-surface-100 pt-4 flex flex-col gap-3">
      <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Alert colors</p>

      <div
        v-for="{ key, label } in [
          { key: 'alertSuccessHue', label: 'Success' },
          { key: 'alertWarnHue',    label: 'Warning' },
          { key: 'alertErrorHue',   label: 'Error'   },
          { key: 'alertInfoHue',    label: 'Info'    },
        ]"
        :key="key"
        class="flex flex-col gap-1"
      >
        <div class="flex items-center justify-between">
          <label class="text-xs font-medium text-surface-600">{{ label }}</label>
          <span
            class="inline-block h-3.5 w-3.5 rounded-full border border-surface-200 shrink-0"
            :style="{ background: alertColorMap[label as keyof typeof alertColorMap] }"
          />
        </div>
        <div
          class="h-2 rounded-full mb-0.5"
          :style="{
            background: `linear-gradient(to right,
              hsl(0,70%,47%), hsl(60,70%,47%), hsl(120,70%,47%),
              hsl(180,70%,47%), hsl(240,70%,47%), hsl(300,70%,47%), hsl(360,70%,47%))`
          }"
        />
        <Slider
          :model-value="state[key as keyof ThemeBuilderState] as number"
          :min="0"
          :max="360"
          :step="1"
          @update:model-value="update(key as keyof ThemeBuilderState, $event as number)"
        />
      </div>
    </div>


    <!-- Section: Buttons -->
    <div class="border-t border-surface-100 pt-4 flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Buttons</p>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">
          Padding X — {{ state.buttonPaddingX.toFixed(2) }}rem
        </label>
        <Slider
          :model-value="state.buttonPaddingX"
          :min="0.25"
          :max="2.5"
          :step="0.05"
          @update:model-value="update('buttonPaddingX', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">
          Padding Y — {{ state.buttonPaddingY.toFixed(2) }}rem
        </label>
        <Slider
          :model-value="state.buttonPaddingY"
          :min="0.1"
          :max="1.5"
          :step="0.05"
          @update:model-value="update('buttonPaddingY', $event as number)"
        />
      </div>
    </div>

    <!-- Section: Shape -->
    <div class="border-t border-surface-100 pt-4 flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Shape</p>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Component radius — {{ state.borderRadius }}px</label>
        <Slider
          :model-value="state.borderRadius"
          :min="0"
          :max="24"
          :step="1"
          @update:model-value="update('borderRadius', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Card radius — {{ state.cardBorderRadius }}px</label>
        <Slider
          :model-value="state.cardBorderRadius"
          :min="0"
          :max="32"
          :step="1"
          @update:model-value="update('cardBorderRadius', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Padding scale — {{ state.paddingScale }}%</label>
        <Slider
          :model-value="state.paddingScale"
          :min="60"
          :max="140"
          :step="5"
          @update:model-value="update('paddingScale', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Shadow intensity — {{ state.shadowIntensity }}%</label>
        <Slider
          :model-value="state.shadowIntensity"
          :min="0"
          :max="100"
          :step="5"
          @update:model-value="update('shadowIntensity', $event as number)"
        />
      </div>
    </div>

    <!-- Section: Typography -->
    <div class="border-t border-surface-100 pt-4 flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Typography</p>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Font weight</label>
        <SelectButton
          :model-value="state.fontWeight"
          :options="fontWeightOptions"
          option-label="label"
          option-value="value"
          @update:model-value="update('fontWeight', $event as number)"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Title font</label>
        <Select
          :model-value="state.titleFont"
          :options="fontOptions"
          option-label="label"
          option-value="value"
          filter
          filter-placeholder="Search fonts…"
          @update:model-value="update('titleFont', $event as GoogleFont)"
        >
          <template #value="{ value }">
            <span :style="{ fontFamily: `'${value}', serif` }">{{ value }}</span>
          </template>
          <template #option="{ option }">
            <span :style="{ fontFamily: `'${option.label}', sans-serif` }">{{ option.label }}</span>
          </template>
        </Select>
      </div>

      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Body font</label>
        <Select
          :model-value="state.bodyFont"
          :options="fontOptions"
          option-label="label"
          option-value="value"
          filter
          filter-placeholder="Search fonts…"
          @update:model-value="update('bodyFont', $event as GoogleFont)"
        >
          <template #value="{ value }">
            <span :style="{ fontFamily: `'${value}', sans-serif` }">{{ value }}</span>
          </template>
          <template #option="{ option }">
            <span :style="{ fontFamily: `'${option.label}', sans-serif` }">{{ option.label }}</span>
          </template>
        </Select>
      </div>
    </div>

    <!-- Section: Interaction -->
    <div class="border-t border-surface-100 pt-4 flex flex-col gap-4">
      <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Interaction</p>
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-medium text-surface-600">Focus ring</label>
        <SelectButton
          :model-value="state.focusRingStyle"
          :options="focusRingOptions"
          option-label="label"
          option-value="value"
          @update:model-value="update('focusRingStyle', $event as FocusRingStyle)"
        />
      </div>
    </div>

  </div>
</template>
