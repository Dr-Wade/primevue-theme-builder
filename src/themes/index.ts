import { NordicTheme } from "./nordic";
import { TerracottaTheme } from "./terracotta";
import { NoirTheme } from "./noir";
import { ForestTheme } from "./forest";
import { PastelTheme } from "./pastel";

export const themes: Record<string, ReturnType<typeof import("@primeuix/themes").definePreset>> = {
    nordic:     NordicTheme,
    terracotta: TerracottaTheme,
    noir:       NoirTheme,
    forest:     ForestTheme,
    pastel:     PastelTheme,
};

export const builtInThemeNames = ["nordic", "terracotta", "noir", "forest", "pastel"] as const;
export type ThemeName = string;

export const themeLabels: Record<string, string> = {
    nordic:     "Nordic",
    terracotta: "Terracotta",
    noir:       "Noir",
    forest:     "Forest",
    pastel:     "Pastel",
};

export const themeAccents: Record<string, string> = {
    nordic:     "hsl(210, 33%, 38%)",
    terracotta: "hsl(18, 80%, 38%)",
    noir:       "hsl(240, 5%, 18%)",
    forest:     "hsl(145, 43%, 30%)",
    pastel:     "hsl(258, 38%, 52%)",
};

export { NordicTheme, TerracottaTheme, NoirTheme, ForestTheme, PastelTheme };
