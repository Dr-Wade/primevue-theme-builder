<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ThemeBuilderControls from "./ThemeBuilderControls.vue";
import ThemeBuilderPreview from "./ThemeBuilderPreview.vue";
import { useThemeBuilder } from "../vue";
import { useTheme } from "../useTheme";
import { generateCode } from "../generator";
import type { ThemeBuilderState } from "../types";

const props = withDefaults(defineProps<{
    visible: boolean;
    position?: "left" | "right";
}>(), {
    position: "right",
});

const emit = defineEmits<{
    (e: "update:visible", value: boolean): void;
}>();

const {
    activeTheme,
    builtInThemeNames,
    themeLabels,
    themeAccents,
    setTheme,
} = useTheme();

const {
    state,
    primarySwatches,
    surfaceSwatches,
    savedThemes,
    activeThemeId,
    saveCurrentTheme,
    createTheme,
    loadTheme,
    deleteTheme,
    resetCurrentTheme,
} = useThemeBuilder();

const newThemeName = ref("");
const showNewInput = ref(false);
const exportVisible = ref(false);
const copied = ref(false);

const exportCode = computed(() => generateCode(state));

function openExport() {
    exportVisible.value = true;
}

async function copyCode() {
    await navigator.clipboard.writeText(exportCode.value);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
}

function handleUpdate(key: keyof ThemeBuilderState, value: ThemeBuilderState[keyof ThemeBuilderState]) {
    (state as Record<string, unknown>)[key] = value;
}

function handleCreate() {
    const name = newThemeName.value.trim() || "New theme";
    createTheme(name);
    newThemeName.value = "";
    showNewInput.value = false;
}

function confirmDelete(id: string, name: string) {
    if (confirm(`Delete theme "${name}"?`)) {
        deleteTheme(id);
    }
}

function selectPresetTheme(name: string) {
    setTheme(name);
}

function selectCustomTheme(id: string) {
    loadTheme(id);
    setTheme(id);
}

function close() {
    exportVisible.value = false;
    emit("update:visible", false);
}

defineExpose({ primarySwatches, surfaceSwatches, state });
</script>

<template>
  <Teleport to="body">
    <Transition name="tb-fade">
      <div
        v-if="props.visible"
        class="fixed inset-0 z-[900]"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0"
          style="background: rgba(0,0,0,0.4)"
          @click="close"
        />

        <!-- Content: preview + controls -->
        <div
          class="absolute inset-y-0 flex tb-panel"
          :class="props.position === 'left' ? 'left-0 tb-panel--left' : 'right-0 tb-panel--right'"
        >
          <!-- Preview panel (always left of controls) -->
          <div
            class="hidden lg:flex flex-col w-[540px] xl:w-[640px] overflow-y-auto p-6"
            style="background: var(--p-surface-50, #f9fafb); border-right: 1px solid var(--p-surface-200, #e5e7eb)"
          >
            <ThemeBuilderPreview
              :primary-swatches="primarySwatches"
              :surface-swatches="surfaceSwatches"
              :body-font="state.bodyFont"
              :title-font="state.titleFont"
            />
          </div>

          <!-- Controls panel -->
          <div
            class="w-[380px] max-w-[90vw] flex flex-col"
            style="background: var(--p-surface-0, #ffffff); border-left: 1px solid var(--p-surface-200, #e5e7eb)"
          >
            <!-- Header -->
            <div
              class="flex items-center justify-between px-5 py-4"
              style="border-bottom: 1px solid var(--p-surface-100, #f3f4f6); flex-shrink: 0"
            >
              <div class="flex items-center gap-2">
                <span class="pi pi-palette text-lg" />
                <span class="font-semibold text-lg">Theme Builder</span>
              </div>
              <div class="flex items-center gap-1">
                <Button
                  icon="pi pi-download"
                  label="Export"
                  severity="secondary"
                  text
                  size="small"
                  @click="openExport"
                />
                <Button
                  icon="pi pi-times"
                  severity="secondary"
                  text
                  rounded
                  size="small"
                  @click="close"
                />
              </div>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto px-5 py-5">
              <div class="flex flex-col gap-5 pb-6">

                <!-- Preset themes -->
                <div class="flex flex-col gap-1">
                  <p class="text-xs font-semibold uppercase tracking-wide text-surface-400 mb-2">
                    Preset themes
                  </p>

                  <div
                    v-for="name in builtInThemeNames"
                    :key="name"
                    class="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 cursor-pointer transition-colors"
                    :class="activeTheme === name
                      ? 'bg-primary-50 text-primary-800'
                      : 'hover:bg-surface-50 text-surface-700'"
                    @click="selectPresetTheme(name)"
                  >
                    <span class="flex items-center gap-2 min-w-0">
                      <span
                        class="inline-block w-3 h-3 rounded-full shrink-0"
                        :style="{ background: themeAccents[name] }"
                      />
                      <span class="truncate text-sm font-medium">{{ themeLabels[name] }}</span>
                    </span>
                    <span
                      v-if="activeTheme === name"
                      class="pi pi-check text-xs shrink-0"
                    />
                  </div>
                </div>

                <!-- Theme list -->
                <div class="flex flex-col gap-1">
                  <p class="text-xs font-semibold uppercase tracking-wide text-surface-400 mb-2">
                    My themes
                  </p>

                  <div
                    v-for="theme in savedThemes"
                    :key="theme.id"
                    class="group flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 cursor-pointer transition-colors"
                    :class="activeTheme === theme.id
                      ? 'bg-primary-50 text-primary-800'
                      : 'hover:bg-surface-50 text-surface-700'"
                    @click="selectCustomTheme(theme.id)"
                  >
                    <span class="flex items-center gap-2 min-w-0">
                      <span
                        class="inline-block w-3 h-3 rounded-full shrink-0"
                        :style="{ background: themeAccents[theme.id] }"
                      />
                      <span class="truncate text-sm font-medium">{{ theme.state.name }}</span>
                    </span>
                    <div class="flex items-center gap-1 shrink-0">
                      <span
                        v-if="activeTheme === theme.id"
                        class="pi pi-check text-xs shrink-0"
                      />
                      <Button
                        icon="pi pi-trash"
                        severity="danger"
                        text
                        rounded
                        size="small"
                        class="opacity-0 group-hover:opacity-100 shrink-0 !h-6 !w-6"
                        @click.stop="confirmDelete(theme.id, theme.state.name)"
                      />
                    </div>
                  </div>

                  <div
                    v-if="savedThemes.length === 0"
                    class="text-xs text-surface-400 text-center py-3"
                  >
                    No saved themes yet
                  </div>

                  <div
                    v-if="showNewInput"
                    class="mt-2 flex flex-col gap-1.5"
                  >
                    <InputText
                      v-model="newThemeName"
                      autofocus
                      class="w-full"
                      placeholder="Theme name"
                      size="small"
                      @keydown.enter="handleCreate"
                      @keydown.escape="showNewInput = false"
                    />
                    <div class="flex gap-1">
                      <Button
                        class="flex-1"
                        label="Create"
                        severity="primary"
                        size="small"
                        @click="handleCreate"
                      />
                      <Button
                        icon="pi pi-times"
                        severity="secondary"
                        size="small"
                        text
                        @click="showNewInput = false"
                      />
                    </div>
                  </div>

                  <Button
                    v-else
                    class="mt-2 w-full"
                    icon="pi pi-plus"
                    label="New theme"
                    outlined
                    severity="primary"
                    size="small"
                    @click="showNewInput = true"
                  />
                </div>

                <!-- Save / Reset actions -->
                <div class="flex gap-2">
                  <Button
                    class="flex-1"
                    :disabled="!activeThemeId"
                    icon="pi pi-save"
                    label="Save"
                    severity="primary"
                    size="small"
                    @click="saveCurrentTheme"
                  />
                  <Button
                    icon="pi pi-refresh"
                    label="Reset"
                    outlined
                    severity="secondary"
                    size="small"
                    @click="resetCurrentTheme"
                  />
                </div>

                <!-- Controls -->
                <ThemeBuilderControls
                  :state="state"
                  @update="handleUpdate"
                />

                <!-- Palette previews (inline in controls panel) -->
                <div class="flex flex-col gap-3 border-t border-surface-100 pt-4">
                  <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Primary palette</p>
                  <div class="flex gap-px rounded overflow-hidden">
                    <div
                      v-for="swatch in primarySwatches"
                      :key="swatch.shade"
                      class="flex-1 h-8 flex items-end justify-center pb-0.5"
                      :style="{ background: swatch.hex }"
                    >
                      <span
                        class="text-[7px] font-mono leading-none"
                        :style="{ color: swatch.shade >= 500 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)' }"
                      >{{ swatch.shade }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col gap-3">
                  <p class="text-xs font-semibold uppercase tracking-wide text-surface-400">Surface palette</p>
                  <div class="flex gap-px rounded overflow-hidden">
                    <div
                      v-for="swatch in surfaceSwatches"
                      :key="swatch.shade"
                      class="flex-1 h-8 flex items-end justify-center pb-0.5"
                      :style="{ background: swatch.hex }"
                    >
                      <span
                        class="text-[7px] font-mono leading-none"
                        :style="{ color: swatch.shade >= 500 ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.4)' }"
                      >{{ swatch.shade }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Export code modal -->
    <Transition name="tb-fade">
      <div
        v-if="exportVisible"
        class="fixed inset-0 z-[950] flex items-center justify-center"
        style="background: rgba(0,0,0,0.5)"
        @click.self="exportVisible = false"
      >
        <div
          class="flex flex-col rounded-xl shadow-2xl overflow-hidden"
          style="
            background: var(--p-surface-0, #ffffff);
            width: min(860px, 95vw);
            max-height: 85vh;
          "
        >
          <!-- Modal header -->
          <div
            class="flex items-center justify-between px-5 py-4"
            style="border-bottom: 1px solid var(--p-surface-100, #f3f4f6); flex-shrink: 0"
          >
            <div class="flex flex-col gap-0.5">
              <span class="font-semibold">Export preset</span>
              <span class="text-xs" style="color: var(--p-surface-400, #9ca3af)">
                Copy this into a <code>{{ state.name.replace(/\s+/g, "") }}Preset.ts</code> file in your project
              </span>
            </div>
            <div class="flex items-center gap-2">
              <Button
                :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
                :label="copied ? 'Copied!' : 'Copy'"
                :severity="copied ? 'success' : 'primary'"
                size="small"
                @click="copyCode"
              />
              <Button
                icon="pi pi-times"
                severity="secondary"
                text
                rounded
                size="small"
                @click="exportVisible = false"
              />
            </div>
          </div>

          <!-- Code block -->
          <div class="flex-1 overflow-y-auto">
            <pre
              class="text-xs leading-relaxed p-5 m-0 font-mono overflow-x-auto"
              style="
                background: var(--p-surface-50, #f9fafb);
                color: var(--p-surface-700, #374151);
                white-space: pre;
                min-height: 100%;
              "
            >{{ exportCode }}</pre>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tb-fade-enter-active,
.tb-fade-leave-active {
  transition: opacity 0.25s ease;
}
.tb-fade-enter-from,
.tb-fade-leave-to {
  opacity: 0;
}

.tb-panel {
  transition: transform 0.25s ease;
}
.tb-fade-enter-from .tb-panel--right,
.tb-fade-leave-to .tb-panel--right {
  transform: translateX(100%);
}
.tb-fade-enter-from .tb-panel--left,
.tb-fade-leave-to .tb-panel--left {
  transform: translateX(-100%);
}
</style>
