import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

// Noir — near-black primary, cool zinc surfaces (hue 240, sat 5), compact & editorial
export const NoirTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50:  "hsl(240, 5%, 96%)",
            100: "hsl(240, 5%, 90%)",
            200: "hsl(240, 5%, 82%)",
            300: "hsl(240, 5%, 71%)",
            400: "hsl(240, 5%, 56%)",
            500: "hsl(240, 5%, 38%)",
            600: "hsl(240, 5%, 26%)",
            700: "hsl(240, 5%, 18%)",
            800: "hsl(240, 5%, 12%)",
            900: "hsl(240, 5%, 7%)",
            950: "hsl(240, 5%, 4%)",
        },
        focusRing: {
            width: "1px",
            style: "solid",
            color: "{primary.950}",
            offset: "2px"
        },
        colorScheme: {
            light: {
                primary: {
                    color: "{primary.900}",
                    inverseColor: "hsl(0, 0%, 100%)",
                    hoverColor: "{primary.800}",
                    activeColor: "{primary.700}"
                },
                highlight: {
                    background: "{primary.900}",
                    focusBackground: "{primary.700}",
                    color: "hsl(0, 0%, 100%)",
                    focusColor: "hsl(0, 0%, 100%)"
                },
                surface: {
                    0:   "hsl(0, 0%, 100%)",
                    50:  "hsl(240, 5%, 96%)",
                    100: "hsl(240, 5%, 90%)",
                    200: "hsl(240, 5%, 82%)",
                    300: "hsl(240, 5%, 71%)",
                    400: "hsl(240, 5%, 56%)",
                    500: "hsl(240, 5%, 38%)",
                    600: "hsl(240, 5%, 26%)",
                    700: "hsl(240, 5%, 18%)",
                    800: "hsl(240, 5%, 12%)",
                    900: "hsl(240, 5%, 7%)",
                    950: "hsl(240, 5%, 4%)",
                }
            },
            dark: {
                primary: {
                    color: "{primary.50}",
                    inverseColor: "{primary.950}",
                    hoverColor: "{primary.100}",
                    activeColor: "{primary.200}"
                },
                highlight: {
                    background: "hsla(240, 5%, 96%, 0.12)",
                    focusBackground: "hsla(240, 5%, 96%, 0.20)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)"
                },
                surface: {
                    0:   "hsl(0, 0%, 100%)",
                    50:  "hsl(240, 5%, 96%)",
                    100: "hsl(240, 5%, 90%)",
                    200: "hsl(240, 5%, 82%)",
                    300: "hsl(240, 5%, 71%)",
                    400: "hsl(240, 5%, 56%)",
                    500: "hsl(240, 5%, 38%)",
                    600: "hsl(240, 5%, 26%)",
                    700: "hsl(240, 5%, 18%)",
                    800: "hsl(240, 5%, 12%)",
                    900: "hsl(240, 5%, 7%)",
                    950: "hsl(240, 5%, 4%)",
                }
            }
        }
    },
    components: {
        button: {
            root: {
                borderRadius: "2px",
                paddingX: "1rem",
                paddingY: "0.5rem",
                label: { fontWeight: "700" },
                gap: "0.4rem"
            }
        },
        card: {
            root: {
                borderRadius: "2px",
                shadow: "0 0 0 1px hsla(240, 5%, 0%, 0.08), 0 2px 6px 0 hsla(240, 5%, 0%, 0.06)",
            },
            body: {
                padding: "1.25rem",
                gap: "0.625rem",
            },
            title: {
                fontSize: "0.95rem",
                fontWeight: "700"
            }
        },
        inputtext: {
            root: {
                borderRadius: "2px",
                paddingX: "0.75rem",
                paddingY: "0.45rem",
                shadow: "none"
            }
        }
    }
});
