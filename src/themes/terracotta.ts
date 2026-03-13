import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

// Terracotta — dusty clay primary (hue 18, sat 75), warm parchment surfaces (hue 35, sat 18)
export const TerracottaTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50:  "hsl(18, 60%, 96%)",
            100: "hsl(18, 65%, 90%)",
            200: "hsl(18, 70%, 82%)",
            300: "hsl(18, 75%, 72%)",
            400: "hsl(18, 75%, 61%)",
            500: "hsl(18, 75%, 50%)",
            600: "hsl(18, 80%, 38%)",
            700: "hsl(18, 83%, 28%)",
            800: "hsl(18, 85%, 20%)",
            900: "hsl(18, 85%, 14%)",
            950: "hsl(18, 87%, 8%)",
        },
        focusRing: {
            width: "2px",
            style: "solid",
            color: "{primary.400}",
            offset: "2px"
        },
        colorScheme: {
            light: {
                primary: {
                    color: "{primary.600}",
                    inverseColor: "#ffffff",
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
                    0:   "#ffffff",
                    50:  "hsl(35, 18%, 97%)",
                    100: "hsl(35, 18%, 93%)",
                    200: "hsl(35, 18%, 87%)",
                    300: "hsl(35, 18%, 79%)",
                    400: "hsl(35, 18%, 63%)",
                    500: "hsl(35, 18%, 47%)",
                    600: "hsl(35, 18%, 35%)",
                    700: "hsl(35, 18%, 25%)",
                    800: "hsl(35, 18%, 16%)",
                    900: "hsl(35, 18%, 10%)",
                    950: "hsl(35, 18%, 5%)",
                }
            },
            dark: {
                primary: {
                    color: "{primary.400}",
                    inverseColor: "{primary.950}",
                    hoverColor: "{primary.300}",
                    activeColor: "{primary.200}"
                },
                highlight: {
                    background: "rgba(214, 100, 42, 0.18)",
                    focusBackground: "rgba(214, 100, 42, 0.28)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)"
                },
                surface: {
                    0:   "#ffffff",
                    50:  "hsl(35, 18%, 97%)",
                    100: "hsl(35, 18%, 93%)",
                    200: "hsl(35, 18%, 87%)",
                    300: "hsl(35, 18%, 79%)",
                    400: "hsl(35, 18%, 63%)",
                    500: "hsl(35, 18%, 47%)",
                    600: "hsl(35, 18%, 35%)",
                    700: "hsl(35, 18%, 25%)",
                    800: "hsl(35, 18%, 16%)",
                    900: "hsl(35, 18%, 10%)",
                    950: "hsl(35, 18%, 5%)",
                }
            }
        }
    },
    components: {
        button: {
            root: {
                borderRadius: "8px",
                paddingX: "1.1rem",
                paddingY: "0.55rem",
                label: { fontWeight: "600" },
                gap: "0.5rem"
            }
        },
        card: {
            root: {
                borderRadius: "12px",
                shadow: "0 4px 20px 0 hsla(18, 60%, 20%, 0.08), 0 1px 4px 0 hsla(18, 60%, 20%, 0.05)",
            },
            body: {
                padding: "1.5rem",
                gap: "0.875rem",
            },
            title: {
                fontSize: "1.05rem",
                fontWeight: "700"
            }
        },
        inputtext: {
            root: {
                borderRadius: "8px",
                paddingX: "0.875rem",
                paddingY: "0.55rem",
                shadow: "0 1px 3px 0 hsla(18, 60%, 20%, 0.06)"
            }
        }
    }
});
