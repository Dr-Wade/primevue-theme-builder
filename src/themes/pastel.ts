import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

// Pastel — soft lavender primary (hue 258, sat 45, high lightness), milky cool surfaces (hue 250, sat 20)
export const PastelTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50:  "hsl(258, 45%, 98%)",
            100: "hsl(258, 45%, 93%)",
            200: "hsl(258, 45%, 86%)",
            300: "hsl(258, 45%, 78%)",
            400: "hsl(258, 45%, 70%)",
            500: "hsl(258, 40%, 62%)",
            600: "hsl(258, 38%, 52%)",
            700: "hsl(258, 36%, 40%)",
            800: "hsl(258, 34%, 30%)",
            900: "hsl(258, 32%, 20%)",
            950: "hsl(258, 30%, 12%)",
        },
        focusRing: {
            width: "2px",
            style: "solid",
            color: "{primary.300}",
            offset: "2px"
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
                    50:  "hsl(250, 20%, 98%)",
                    100: "hsl(250, 20%, 95%)",
                    200: "hsl(250, 18%, 90%)",
                    300: "hsl(250, 16%, 83%)",
                    400: "hsl(250, 14%, 68%)",
                    500: "hsl(250, 12%, 52%)",
                    600: "hsl(250, 12%, 38%)",
                    700: "hsl(250, 12%, 27%)",
                    800: "hsl(250, 12%, 18%)",
                    900: "hsl(250, 12%, 11%)",
                    950: "hsl(250, 12%, 6%)",
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
                    background: "hsla(258, 45%, 62%, 0.18)",
                    focusBackground: "hsla(258, 45%, 62%, 0.28)",
                    color: "rgba(255,255,255,.87)",
                    focusColor: "rgba(255,255,255,.87)"
                },
                surface: {
                    0:   "hsl(0, 0%, 100%)",
                    50:  "hsl(250, 20%, 98%)",
                    100: "hsl(250, 20%, 95%)",
                    200: "hsl(250, 18%, 90%)",
                    300: "hsl(250, 16%, 83%)",
                    400: "hsl(250, 14%, 68%)",
                    500: "hsl(250, 12%, 52%)",
                    600: "hsl(250, 12%, 38%)",
                    700: "hsl(250, 12%, 27%)",
                    800: "hsl(250, 12%, 18%)",
                    900: "hsl(250, 12%, 11%)",
                    950: "hsl(250, 12%, 6%)",
                }
            }
        }
    },
    components: {
        button: {
            root: {
                borderRadius: "999px",
                paddingX: "1.25rem",
                paddingY: "0.6rem",
                label: { fontWeight: "500" },
                gap: "0.5rem"
            }
        },
        card: {
            root: {
                borderRadius: "20px",
                shadow: "0 4px 24px 0 hsla(258, 40%, 40%, 0.07), 0 1px 4px 0 hsla(258, 40%, 40%, 0.04)",
            },
            body: {
                padding: "1.75rem",
                gap: "1rem",
            },
            title: {
                fontSize: "1.05rem",
                fontWeight: "600"
            }
        },
        inputtext: {
            root: {
                borderRadius: "12px",
                paddingX: "0.875rem",
                paddingY: "0.625rem",
                shadow: "0 1px 4px 0 hsla(258, 40%, 40%, 0.06)"
            }
        }
    }
});
