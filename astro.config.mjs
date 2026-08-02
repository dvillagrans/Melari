import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Astro 7 defaults to `compressHTML: 'jsx'`, which strips whitespace
  // between inline elements. Keep the Astro 5 HTML-aware compression so
  // existing rendering stays unchanged after the migration.
  compressHTML: true,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});