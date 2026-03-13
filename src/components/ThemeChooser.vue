<script setup lang="ts">
import Button from "primevue/button";
import Popover from "primevue/popover";
import { computed, ref } from "vue";
import { useTheme } from "../useTheme";
import ThemeBuilder from "./ThemeBuilder.vue";

const { activeTheme, builtInThemeNames, themeLabels, themeAccents, themeNames, setTheme } = useTheme();

const customThemeNames = computed(() =>
    themeNames.value.filter(name => !builtInThemeNames.includes(name as typeof builtInThemeNames[number]))
);

const popover = ref<InstanceType<typeof Popover> | null>(null);
const builderVisible = ref(false);

function togglePopover (event: Event) {
    popover.value?.toggle(event);
}

function selectTheme (name: string) {
    setTheme(name);
    popover.value?.hide();
}

function openBuilder() {
    popover.value?.hide();
    builderVisible.value = true;
}

defineExpose({ hide: () => popover.value?.hide() });
</script>

<template>
  <div>
    <Button
      icon="pi pi-palette"
      aria-haspopup="true"
      aria-label="Switch theme"
      severity="secondary"
      size="small"
      text
      @click="togglePopover"
    />
    <Popover ref="popover">
      <div class="flex flex-col gap-1 min-w-40">
        <p class="text-xs font-semibold text-surface-400 uppercase tracking-wide px-2 pt-1 pb-0.5">
          Preset themes
        </p>
        <Button
          v-for="name in builtInThemeNames"
          :key="name"
          severity="secondary"
          size="small"
          class="!px-2 !py-1"
          text
          :class="{ 'font-semibold': activeTheme === name }"
          @click="selectTheme(name)"
        >
          <span class="flex w-full items-center gap-2 text-sm">
            <span
              class="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              :style="{ background: themeAccents[name] }"
            />
            {{ themeLabels[name] }}
          </span>
          <span
            v-if="activeTheme === name"
            class="pi pi-check text-xs"
          />
        </Button>

        <template v-if="customThemeNames.length > 0">
          <div class="border-t border-surface-200 mt-2 pt-2"></div>
          <p class="text-xs font-semibold text-surface-400 uppercase tracking-wide px-2 pb-0.5">
            Custom themes
          </p>
          <Button
            v-for="name in customThemeNames"
            :key="name"
            severity="secondary"
            size="small"
            class="!px-2 !py-1"
            text
            :class="{ 'font-semibold': activeTheme === name }"
            @click="selectTheme(name)"
          >
            <span class="flex w-full items-center gap-2 text-sm">
              <span
                class="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                :style="{ background: themeAccents[name] }"
              />
              {{ themeLabels[name] }}
            </span>
            <span
              v-if="activeTheme === name"
              class="pi pi-check text-xs"
            />
          </Button>
        </template>

        <div class="border-t border-surface-200 mt-2 pt-1">
          <button
            class="flex w-full items-center gap-2 px-2.5 py-1.5 text-sm text-surface-500 hover:text-primary-600 transition-colors rounded"
            @click="openBuilder"
          >
            <span class="pi pi-sliders-h text-xs" />
            Customize…
          </button>
        </div>

        <slot name="footer" :hide="() => popover?.hide()" />
      </div>
    </Popover>

    <ThemeBuilder v-model:visible="builderVisible" />
  </div>
</template>
