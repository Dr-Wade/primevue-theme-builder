import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

// Forest — deep moss green primary (hue 145, sat 40), cool sage surfaces (hue 150, sat 12)
export const ForestTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50:  "hsl(145, 25%, 96%)",
            100: "hsl(145, 30%, 88%)",
            200: "hsl(145, 35%, 78%)",
            300: "hsl(145, 40%, 65%)",
            400: "hsl(145, 40%, 52%)",
            500: "hsl(145, 40%, 40%)",
            600: "hsl(145, 43%, 30%)",
            700: "hsl(145, 46%, 22%)",
            800: "hsl(145, 48%, 15%)",
            900: "hsl(145, 50%, 10%)",
            950: "hsl(145, 52%, 6%)",
        },
        focusRing: {
            width: "2px",
            style: "dashed",
            color: "{primary.400}",
            offset: "3px"
        },
        colorScheme: {
            light: {
                primary: {
                    color: "{primary.600}",
                    inverseColor: "hsl(0, 0%, 100%)",
                    hoverColor: "{primary.700}",
                    activeColor: "{primary.800}"
                },
                highlight: {
                    background: "{primary.100}",
                    focusBackground: "{primary.200}",
                    color: "{primary.800}",
                    focusColor: "{primary.900}"
                },
                surface: {
                    0:   "hsl(0, 0%, 100%)",
                    50:  "hsl(150, 12%, 97%)",
                    100: "hsl(150, 12%, 93%)",
                    200: "hsl(150, 12%, 87%)",
                    300: "hsl(150, 12%, 79%)",
                    400: "hsl(150, 12%, 63%)",
                    500: "hsl(150, 12%, 47%)",
                    600: "hsl(150, 12%, 35%)",
                    700: "hsl(150, 12%, 25%)",
                    800: "hsl(150, 12%, 16%)",
                    900: "hsl(150, 12%, 10%)",
                    950: "hsl(150, 12%, 5%)",
                }
            },
            dark: {
                primary: {
                    color: "{primary.300}",
                    inverseColor: "{primary.950}",
                    hoverColor: "{primary.200}",
                    activeColor: "{primary.100}"
                },
                highlight: {
                    background: "hsla(145, 40%, 40%, 0.18)",
                    focusBackground: "hsla(145, 40%, 40%, 0.28)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)"
                },
                surface: {
                    0:   "hsl(0, 0%, 100%)",
                    50:  "hsl(150, 12%, 97%)",
                    100: "hsl(150, 12%, 93%)",
                    200: "hsl(150, 12%, 87%)",
                    300: "hsl(150, 12%, 79%)",
                    400: "hsl(150, 12%, 63%)",
                    500: "hsl(150, 12%, 47%)",
                    600: "hsl(150, 12%, 35%)",
                    700: "hsl(150, 12%, 25%)",
                    800: "hsl(150, 12%, 16%)",
                    900: "hsl(150, 12%, 10%)",
                    950: "hsl(150, 12%, 5%)",
                }
            }
        }
    },
    components: {
        button: {
            root: {
                borderRadius: "8px",
                paddingX: "1.2rem",
                paddingY: "0.6rem",
                label: { fontWeight: "600" },
                gap: "0.5rem"
            }
        },
        card: {
            root: {
                borderRadius: "14px",
                shadow: "0 4px 18px 0 hsla(145, 40%, 15%, 0.08), 0 1px 4px 0 hsla(145, 40%, 15%, 0.05)",
            },
            body: {
                padding: "1.625rem",
                gap: "0.875rem",
            },
            title: {
                fontSize: "1.05rem",
                fontWeight: "600"
            }
        },
        inputtext: {
            root: {
                borderRadius: "8px",
                paddingX: "0.875rem",
                paddingY: "0.575rem",
                shadow: "0 1px 3px 0 hsla(145, 40%, 15%, 0.06)"
            }
        }
    }
});
