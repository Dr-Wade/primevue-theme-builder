import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

// Nordic — muted steel-blue primary (hue 210, sat 28), warm grey surfaces (hue 35, sat 6)
export const NordicTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50:  "hsl(210, 13%, 96%)",
            100: "hsl(210, 18%, 88%)",
            200: "hsl(210, 23%, 80%)",
            300: "hsl(210, 28%, 70%)",
            400: "hsl(210, 28%, 60%)",
            500: "hsl(210, 28%, 50%)",
            600: "hsl(210, 33%, 38%)",
            700: "hsl(210, 36%, 28%)",
            800: "hsl(210, 38%, 20%)",
            900: "hsl(210, 38%, 14%)",
            950: "hsl(210, 40%, 8%)",
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
                    50:  "hsl(35, 6%, 97%)",
                    100: "hsl(35, 6%, 93%)",
                    200: "hsl(35, 6%, 87%)",
                    300: "hsl(35, 6%, 79%)",
                    400: "hsl(35, 6%, 63%)",
                    500: "hsl(35, 6%, 47%)",
                    600: "hsl(35, 6%, 35%)",
                    700: "hsl(35, 6%, 25%)",
                    800: "hsl(35, 6%, 16%)",
                    900: "hsl(35, 6%, 10%)",
                    950: "hsl(35, 6%, 5%)",
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
                    background: "hsla(210, 28%, 50%, 0.18)",
                    focusBackground: "hsla(210, 28%, 50%, 0.28)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)"
                },
                surface: {
                    0:   "hsl(0, 0%, 100%)",
                    50:  "hsl(35, 6%, 97%)",
                    100: "hsl(35, 6%, 93%)",
                    200: "hsl(35, 6%, 87%)",
                    300: "hsl(35, 6%, 79%)",
                    400: "hsl(35, 6%, 63%)",
                    500: "hsl(35, 6%, 47%)",
                    600: "hsl(35, 6%, 35%)",
                    700: "hsl(35, 6%, 25%)",
                    800: "hsl(35, 6%, 16%)",
                    900: "hsl(35, 6%, 10%)",
                    950: "hsl(35, 6%, 5%)",
                }
            }
        }
    },
    components: {
        button: {
            root: {
                borderRadius: "10px",
                paddingX: "1.25rem",
                paddingY: "0.625rem",
                label: { fontWeight: "500" },
                gap: "0.6rem"
            }
        },
        card: {
            root: {
                borderRadius: "16px",
                shadow: "0 2px 12px 0 hsla(210, 60%, 16%, 0.07), 0 1px 3px 0 hsla(210, 60%, 16%, 0.04)",
            },
            body: {
                padding: "1.75rem",
                gap: "1rem",
            },
            title: {
                fontSize: "1.1rem",
                fontWeight: "600"
            }
        },
        inputtext: {
            root: {
                borderRadius: "10px",
                paddingX: "0.875rem",
                paddingY: "0.625rem",
                shadow: "none"
            }
        }
    }
});
