import { defineRouting } from "next-intl/routing";

// i18n desde el MVP: ES (default), Catalán, Inglés. Ámbito inicial: España.
export const routing = defineRouting({
  locales: ["es", "ca", "en"],
  defaultLocale: "es",
});
