import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: new URL(".", import.meta.url).pathname,
  base: "/primevue-theme-builder/demo/",
  plugins: [
    vue(),
    tailwindcss()
  ],
});
