import { defineConfig } from "vitepress";

export default defineConfig({
  title: "PrimeVue Theme Builder",
  description: "Build, preview, and export PrimeVue themes with a visual editor",
  base: "/primevue-theme-builder/",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API", link: "/api/composables" },
      { text: "Demo", link: "https://dr-wade.github.io/primevue-theme-builder/demo/" },
    ],
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Built-in Themes", link: "/guide/built-in-themes" },
          { text: "Theme Chooser", link: "/guide/theme-chooser" },
          { text: "Theme Builder", link: "/guide/theme-builder" },
          { text: "Programmatic Usage", link: "/guide/programmatic-usage" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Composables", link: "/api/composables" },
          { text: "Components", link: "/api/components" },
          { text: "Generator Functions", link: "/api/generator" },
          { text: "Types", link: "/api/types" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/aadalen/theme-builder" },
    ],
  },
});
