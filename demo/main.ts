import { createApp } from "vue";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "./style.css";

import { NordicTheme, useTheme } from "../src/index";
import App from "./App.vue";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: NordicTheme,
    options: { darkModeSelector: ".app-dark" },
  },
});

app.mount("#app");

const { initTheme } = useTheme();
initTheme();
