export type FocusRingStyle = "dashed" | "solid" | "none";
export type BaseTheme = "Aura" | "Material" | "Lara" | "Nora";

export interface ThemeBuilderState {
    name: string;
    baseTheme: BaseTheme;
    primaryHue: number;
    primarySaturation: number;
    primaryLightness: number;
    accentHue: number;
    accentSaturation: number;
    accentLightness: number;
    surfaceHue: number;
    surfaceSaturation: number;
    borderRadius: number;
    cardBorderRadius: number;
    paddingScale: number;
    fontWeight: number;
    shadowIntensity: number;
    focusRingStyle: FocusRingStyle;
    titleFont: GoogleFont;
    bodyFont: GoogleFont;
    buttonPaddingX: number;
    buttonPaddingY: number;
    alertSuccessHue: number;
    alertWarnHue: number;
    alertErrorHue: number;
    alertInfoHue: number;
}

export interface SavedTheme {
    id: string;
    state: ThemeBuilderState;
}

export type ColorPalette = Record<number, string>;

export const GOOGLE_FONTS = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Poppins",
    "Raleway",
    "Nunito",
    "Source Sans 3",
    "Ubuntu",
    "Merriweather",
    "Playfair Display",
    "Lora",
    "PT Serif",
    "Libre Baskerville",
    "EB Garamond",
    "Cormorant Garamond",
    "Crimson Text",
    "Josefin Sans",
    "DM Sans",
    "DM Serif Display",
    "Figtree",
    "Plus Jakarta Sans",
    "Outfit",
    "Sora",
    "Be Vietnam Pro",
    "Manrope",
    "Space Grotesk",
    "Karla",
    "Jost",
    "Cabin",
    "Mulish",
    "Barlow",
    "Quicksand",
    "Work Sans",
    "Noto Sans",
    "IBM Plex Sans",
    "IBM Plex Serif",
    "Spectral",
    "Arvo",
    "Bitter",
    "Zilla Slab",
    "Cardo",
    "Quattrocento",
    "Vollkorn",
    "Alegreya",
    "Alegreya Sans",
    "Rubik",
    "Exo 2",
] as const;

export type GoogleFont = typeof GOOGLE_FONTS[number];

export const PALETTE_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export const defaults: ThemeBuilderState = {
    name: "Custom",
    baseTheme: "Aura",
    primaryHue: 210,
    primarySaturation: 30,
    primaryLightness: 50,
    accentHue: 35,
    accentSaturation: 70,
    accentLightness: 50,
    surfaceHue: 35,
    surfaceSaturation: 8,
    borderRadius: 10,
    cardBorderRadius: 16,
    paddingScale: 100,
    fontWeight: 500,
    shadowIntensity: 50,
    focusRingStyle: "dashed",
    titleFont: "Playfair Display",
    bodyFont: "Inter",
    buttonPaddingX: 1.25,
    buttonPaddingY: 0.625,
    alertSuccessHue: 142,
    alertWarnHue: 45,
    alertErrorHue: 0,
    alertInfoHue: 210,
};
