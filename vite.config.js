import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    base: "/usefull-things-481-svg/",
    plugins: [react(), tailwindcss()],
});
