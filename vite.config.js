import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import config from "./src/config.js";

// https://vitejs.dev/config/
export default defineConfig({
  base: config.base,
  plugins: [vue()],
});
