import Aura from "@primeuix/themes/aura";
import Material from "@primeuix/themes/material";
import Lara from "@primeuix/themes/lara";
import Nora from "@primeuix/themes/nora";
import { definePreset } from "@primeuix/themes";

import type { ThemeBuilderState, ColorPalette, BaseTheme } from "./types";

type PresetArg = Parameters<typeof definePreset>[0];

const BASE_THEMES: Record<BaseTheme, PresetArg> = {
    Aura: Aura as PresetArg,
    Material: Material as PresetArg,
    Lara: Lara as PresetArg,
    Nora: Nora as PresetArg,
};

export function hslToHsl(h: number, s: number, l: number): string {
    return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

/** @deprecated Use hslToHsl instead */
export function hslToHex(h: number, s: number, l: number): string {
    return hslToHsl(h, s, l);
}

export function hexToRgb(hex: string): string {
    const h = hex.replace("#", "");
    return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
}

export function hslToRgba(h: number, s: number, l: number, alpha: number): string {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
    };
    return `rgba(${f(0)}, ${f(8)}, ${f(4)}, ${alpha})`;
}

export function generatePrimaryPalette(hue: number, sat: number, centerL = 50): ColorPalette {
    const scale = centerL / 50;
    return {
        50:  hslToHsl(hue, Math.max(sat - 15, 5),  Math.min(96, 88 + centerL * 0.16)),
        100: hslToHsl(hue, Math.max(sat - 10, 8),  Math.min(96, 76 + centerL * 0.28)),
        200: hslToHsl(hue, Math.max(sat - 5, 10),  Math.min(94, 64 + centerL * 0.36)),
        300: hslToHsl(hue, sat,                     Math.min(90, 55 + centerL * 0.34)),
        400: hslToHsl(hue, sat,                     Math.min(85, 44 + centerL * 0.34)),
        500: hslToHsl(hue, sat,                     centerL),
        600: hslToHsl(hue, Math.min(sat + 5, 100),  Math.max(5, centerL - 12) * scale),
        700: hslToHsl(hue, Math.min(sat + 8, 100),  Math.max(4, centerL - 22) * scale),
        800: hslToHsl(hue, Math.min(sat + 10, 100), Math.max(3, centerL - 30) * scale),
        900: hslToHsl(hue, Math.min(sat + 10, 100), Math.max(2, centerL - 36) * scale),
        950: hslToHsl(hue, Math.min(sat + 12, 100), Math.max(1, centerL - 42) * scale),
    };
}

export function generateAlertPalette(hue: number): ColorPalette {
    return {
        50:  hslToHsl(hue, 85, 96),
        100: hslToHsl(hue, 80, 90),
        200: hslToHsl(hue, 75, 80),
        300: hslToHsl(hue, 70, 68),
        400: hslToHsl(hue, 70, 58),
        500: hslToHsl(hue, 70, 47),
        600: hslToHsl(hue, 72, 38),
        700: hslToHsl(hue, 74, 30),
        800: hslToHsl(hue, 76, 22),
        900: hslToHsl(hue, 78, 16),
        950: hslToHsl(hue, 80, 9),
    };
}

export function generateSurfacePalette(hue: number, sat: number): ColorPalette {
    return {
        0: "#ffffff",
        50:  hslToHsl(hue, sat, 97),
        100: hslToHsl(hue, sat, 93),
        200: hslToHsl(hue, sat, 87),
        300: hslToHsl(hue, sat, 79),
        400: hslToHsl(hue, sat, 63),
        500: hslToHsl(hue, sat, 47),
        600: hslToHsl(hue, sat, 35),
        700: hslToHsl(hue, sat, 25),
        800: hslToHsl(hue, sat, 16),
        900: hslToHsl(hue, sat, 10),
        950: hslToHsl(hue, sat, 5),
    };
}

export function generateShadow(intensity: number, hue: number): string {
    const alpha1 = (intensity / 100 * 0.12).toFixed(2);
    const alpha2 = (intensity / 100 * 0.06).toFixed(2);
    const blur = Math.round(4 + intensity / 100 * 16);
    return `0 2px ${blur}px 0 hsla(${hue}, 10%, 20%, ${alpha1}), 0 1px 3px 0 hsla(${hue}, 10%, 20%, ${alpha2})`;
}

/**
 * Generate a full PrimeVue Aura-based preset from a ThemeBuilderState.
 * This is the core function that converts slider values into a complete theme preset.
 */
export function resolveBaseTheme(name: BaseTheme): object {
    return BASE_THEMES[name];
}

export function generatePreset(state: ThemeBuilderState) {
    const base = BASE_THEMES[state.baseTheme] ?? Aura;
    const primary = generatePrimaryPalette(state.primaryHue, state.primarySaturation, state.primaryLightness);
    const surface = generateSurfacePalette(state.surfaceHue, state.surfaceSaturation);
    const accent = generatePrimaryPalette(state.accentHue, state.accentSaturation, state.accentLightness);
    const green = generateAlertPalette(state.alertSuccessHue);
    const yellow = generateAlertPalette(state.alertWarnHue);
    const red = generateAlertPalette(state.alertErrorHue);
    const blue = generateAlertPalette(state.alertInfoHue);

    const r = `${state.borderRadius}px`;
    const cr = `${state.cardBorderRadius}px`;
    const padScale = state.paddingScale / 100;
    const shadow = generateShadow(state.shadowIntensity, state.primaryHue);
    const fw = String(state.fontWeight);
    const titleFontFamily = `'${state.titleFont}', serif`;

    const focusRing = state.focusRingStyle === "none"
        ? { width: "0px", style: "none" as const, color: "transparent", offset: "0px" }
        : { width: "2px", style: state.focusRingStyle as "dashed" | "solid", color: "{primary.400}", offset: state.focusRingStyle === "dashed" ? "3px" : "2px" };

    return definePreset(base, {
        semantic: {
            primary,
            accent,
            green,
            yellow,
            red,
            blue,
            focusRing,
            colorScheme: {
                light: {
                    primary: {
                        color: "{primary.600}",
                        inverseColor: "#ffffff",
                        hoverColor: "{primary.700}",
                        activeColor: "{primary.800}",
                    },
                    highlight: {
                        background: "{primary.100}",
                        focusBackground: "{primary.200}",
                        color: "{primary.800}",
                        focusColor: "{primary.900}",
                    },
                    surface,
                },
                dark: {
                    primary: {
                        color: "{primary.300}",
                        inverseColor: "{primary.950}",
                        hoverColor: "{primary.200}",
                        activeColor: "{primary.100}",
                    },
                    highlight: {
                        background: hslToRgba(state.primaryHue, state.primarySaturation, state.primaryLightness, 0.18),
                        focusBackground: hslToRgba(state.primaryHue, state.primarySaturation, state.primaryLightness, 0.28),
                        color: "rgba(255,255,255,.87)",
                        focusColor: "rgba(255,255,255,.87)",
                    },
                    surface,
                },
            },
        },
        components: {
            button: {
                root: {
                    borderRadius: r,
                    paddingX: `${state.buttonPaddingX.toFixed(2)}rem`,
                    paddingY: `${state.buttonPaddingY.toFixed(2)}rem`,
                    label: { fontWeight: fw },
                    gap: `${(0.6 * padScale).toFixed(2)}rem`,
                },
            },
            card: {
                root: {
                    borderRadius: cr,
                    shadow,
                },
                body: {
                    padding: `${(1.75 * padScale).toFixed(2)}rem`,
                    gap: `${(1 * padScale).toFixed(2)}rem`,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                title: {
                    fontSize: "1.1rem",
                    fontWeight: String(Math.min(state.fontWeight + 100, 900)),
                    fontFamily: titleFontFamily,
                } as any,
            },
            inputtext: {
                root: {
                    borderRadius: r,
                    paddingX: `${(0.875 * padScale).toFixed(2)}rem`,
                    paddingY: `${(0.625 * padScale).toFixed(2)}rem`,
                    shadow: state.shadowIntensity > 30 ? `0 1px 3px 0 hsla(${state.primaryHue}, 10%, 20%, ${(state.shadowIntensity / 100 * 0.08).toFixed(2)})` : "none",
                },
            },
        },
    });
}

/**
 * Generate copy-pasteable TypeScript code for a PrimeVue preset from a ThemeBuilderState.
 */
export function generateCode(state: ThemeBuilderState): string {
    const primary = generatePrimaryPalette(state.primaryHue, state.primarySaturation, state.primaryLightness);
    const surface = generateSurfacePalette(state.surfaceHue, state.surfaceSaturation);
    const accent = generatePrimaryPalette(state.accentHue, state.accentSaturation, state.accentLightness);
    const green = generateAlertPalette(state.alertSuccessHue);
    const yellow = generateAlertPalette(state.alertWarnHue);
    const red = generateAlertPalette(state.alertErrorHue);
    const blue = generateAlertPalette(state.alertInfoHue);

    const r = `${state.borderRadius}px`;
    const cr = `${state.cardBorderRadius}px`;
    const padScale = state.paddingScale / 100;
    const shadow = generateShadow(state.shadowIntensity, state.primaryHue);
    const fw = String(state.fontWeight);
    const titleFontFamily = `'${state.titleFont}', serif`;
    const bodyFontFamily = `'${state.bodyFont}', sans-serif`;
    const fontImports = Array.from(new Set([state.titleFont, state.bodyFont]))
        .map(font => `family=${font.replace(/ /g, "+")}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400`)
        .join("&");
    const fontHref = `https://fonts.googleapis.com/css2?${fontImports}&display=swap`;

    const focusRing = state.focusRingStyle === "none"
        ? { width: "0px", style: "none", color: "transparent", offset: "0px" }
        : { width: "2px", style: state.focusRingStyle, color: "{primary.400}", offset: state.focusRingStyle === "dashed" ? "3px" : "2px" };

    const inputShadow = state.shadowIntensity > 30
        ? `0 1px 3px 0 hsla(${state.primaryHue}, 10%, 20%, ${(state.shadowIntensity / 100 * 0.08).toFixed(2)})`
        : "none";

    const darkHighlight = hslToRgba(state.primaryHue, state.primarySaturation, state.primaryLightness, 0.18);
    const darkHighlightFocus = hslToRgba(state.primaryHue, state.primarySaturation, state.primaryLightness, 0.28);

    const palette = (p: ColorPalette) =>
        `{\n        ${Object.entries(p).map(([k, v]) => `${k}: "${v}"`).join(",\n        ")}\n      }`;

    const focusRingStr = `{ width: "${focusRing.width}", style: "${focusRing.style}", color: "${focusRing.color}", offset: "${focusRing.offset}" }`;

    const baseName = state.baseTheme;

    return `import ${baseName} from "@primeuix/themes/${baseName.toLowerCase()}";
import { definePreset } from "@primeuix/themes";

export const ${state.name.replace(/\s+/g, "")}FontHref = "${fontHref}";

export const ${state.name.replace(/\s+/g, "")}FontCss = \

\`body { font-family: ${bodyFontFamily} !important; }
:root { --default-font-family: ${bodyFontFamily}; }
h1, h2, h3, h4, h5, .p-card-title { font-family: ${titleFontFamily} !important; }\`;

export function apply${state.name.replace(/\s+/g, "")}Fonts() {
  if (typeof document === "undefined") return;

  if (!document.querySelector(\`link[href="${fontHref}"]\`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "${fontHref}";
    document.head.appendChild(link);
  }

  const styleId = "${state.name.replace(/\s+/g, "").toLowerCase()}-preset-fonts";
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = ${state.name.replace(/\s+/g, "")}FontCss;
}

// Generated by primevue-theme-builder — "${state.name}"
const ${state.name.replace(/\s+/g, "")}Preset = definePreset(${baseName}, {
  semantic: {
    primary: ${palette(primary)},
    accent: ${palette(accent)},
    green: ${palette(green)},
    yellow: ${palette(yellow)},
    red: ${palette(red)},
    blue: ${palette(blue)},
    focusRing: ${focusRingStr},
    colorScheme: {
      light: {
        primary: {
          color: "{primary.600}",
          inverseColor: "#ffffff",
          hoverColor: "{primary.700}",
          activeColor: "{primary.800}",
        },
        highlight: {
          background: "{primary.100}",
          focusBackground: "{primary.200}",
          color: "{primary.800}",
          focusColor: "{primary.900}",
        },
        surface: ${palette(surface)},
      },
      dark: {
        primary: {
          color: "{primary.300}",
          inverseColor: "{primary.950}",
          hoverColor: "{primary.200}",
          activeColor: "{primary.100}",
        },
        highlight: {
          background: "${darkHighlight}",
          focusBackground: "${darkHighlightFocus}",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
        surface: ${palette(surface)},
      },
    },
  },
  components: {
    button: {
      root: {
        borderRadius: "${r}",
        paddingX: "${(state.buttonPaddingX).toFixed(2)}rem",
        paddingY: "${(state.buttonPaddingY).toFixed(2)}rem",
        label: { fontWeight: "${fw}" },
        gap: "${(0.6 * padScale).toFixed(2)}rem",
      },
    },
    card: {
      root: {
        borderRadius: "${cr}",
        shadow: "${shadow}",
      },
      body: {
        padding: "${(1.75 * padScale).toFixed(2)}rem",
        gap: "${(1 * padScale).toFixed(2)}rem",
      },
      title: {
        fontSize: "1.1rem",
        fontWeight: "${String(Math.min(state.fontWeight + 100, 900))}",
        fontFamily: "${titleFontFamily}",
      },
    },
    inputtext: {
      root: {
        borderRadius: "${r}",
        paddingX: "${(0.875 * padScale).toFixed(2)}rem",
        paddingY: "${(0.625 * padScale).toFixed(2)}rem",
        shadow: "${inputShadow}",
      },
    },
  },
});

export default ${state.name.replace(/\s+/g, "")}Preset;

// Usage in main.ts:
// app.use(PrimeVue, { theme: { preset: ${state.name.replace(/\s+/g, "")}Preset } });
// apply${state.name.replace(/\s+/g, "")}Fonts();
`;
}
