import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import * as path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
