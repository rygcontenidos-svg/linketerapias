import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Enruta /es, /ca, /en. Acá también irá el refresh de sesión de Supabase.
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
