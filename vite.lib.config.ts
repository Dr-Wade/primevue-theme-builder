import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: new URL("src/index.ts", import.meta.url).pathname,
            name: "PrimevueThemeBuilder",
            fileName: "index",
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: [
                "vue",
                "primevue",
                /^primevue\/.*/,
                "@primeuix/themes",
                /^@primeuix\/themes\/.*/,
            ],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
        outDir: "dist",
        emptyOutDir: true,
    },
});
