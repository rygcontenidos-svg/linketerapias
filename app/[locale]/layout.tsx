import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Logo, FooterLogo } from "@/components/brand/logo";
import { NavDropdown } from "@/components/nav-dropdown";
import { MobileNav } from "@/components/mobile-nav";
import "../globals.css";

const display = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "LinkeTerapias",
  description: "Directorio y bolsa de empleo para terapeutas.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  const t = await getTranslations("home");

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css"
        />
      </head>
      <body>
        <header className="sticky top-0 z-50 bg-brand">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5">
            <Link href="/">
              <Logo />
            </Link>
            <nav className="hidden items-center gap-6 text-[13px] font-medium lg:flex">
              <Link href="/" className="text-white/90 transition hover:text-white">{t("nav.inicio")}</Link>
              <NavDropdown
                dark
                mode="menu"
                label={t("nav.buscar")}
                items={[
                  { icon: "ti-stethoscope", label: "Por especialidad", href: "/buscar" },
                  { icon: "ti-map-pin", label: "Por ciudad", href: "/buscar" },
                  { icon: "ti-users", label: "Ver todos", href: "/buscar" },
                ]}
              />
              <Link href="/empleo" className="text-white/80 transition hover:text-white">{t("nav.empleo")}</Link>
              <Link href="/profesionales" className="text-white/80 transition hover:text-white">{t("nav.profesionales")}</Link>
            </nav>
            <MobileNav t={{
              "nav.inicio": t("nav.inicio"),
              "nav.buscar": t("nav.buscar"),
              "nav.empleo": t("nav.empleo"),
              "nav.profesionales": t("nav.profesionales"),
              "nav.login": t("nav.login"),
            }} />
            <div className="hidden lg:block">
              <Link
                href="/login"
                className="rounded-control border border-white/40 px-4 py-2 text-[13px] font-medium text-white transition hover:border-white hover:bg-white/10"
              >
                {t("nav.login")}
              </Link>
            </div>
          </div>
        </header>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <footer className="border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-5 py-12">
            <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
              <div>
                <FooterLogo />
                <p className="mt-3 max-w-[260px] text-[13px] text-muted">
                  {t("footer.tagline")}
                </p>
                <div className="mt-5 flex gap-3 text-muted">
                  <i className="ti ti-brand-instagram text-lg cursor-pointer hover:text-ink" />
                  <i className="ti ti-brand-facebook text-lg cursor-pointer hover:text-ink" />
                  <i className="ti ti-brand-linkedin text-lg cursor-pointer hover:text-ink" />
                </div>
              </div>
              <div>
                <h4 className="text-[13px] font-semibold uppercase tracking-wider text-ink">
                  {t("footer.pacientes")}
                </h4>
                <ul className="mt-3 space-y-2 text-[14px] text-muted">
                  <li><Link href="/buscar">{t("footer.buscarTerapeuta")}</Link></li>
                  <li><Link href="/#como-funciona">{t("footer.comoFunciona")}</Link></li>
                  <li><Link href="/#especialidades">{t("footer.especialidades")}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[13px] font-semibold uppercase tracking-wider text-ink">
                  {t("footer.profesionales")}
                </h4>
                <ul className="mt-3 space-y-2 text-[14px] text-muted">
                  <li><Link href="/registro/terapeuta">{t("footer.crearPerfil")}</Link></li>
                  <li><Link href="/registro/empresa">{t("footer.publicarOferta")}</Link></li>
                  <li><Link href="/panel">{t("footer.gestionAgenda")}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[13px] font-semibold uppercase tracking-wider text-ink">
                  {t("footer.legal")}
                </h4>
                <ul className="mt-3 space-y-2 text-[14px] text-muted">
                  <li><Link href="/aviso-legal">{t("footer.avisoLegal")}</Link></li>
                  <li><Link href="/privacidad">{t("footer.privacidad")}</Link></li>
                  <li><Link href="/cookies">{t("footer.cookies")}</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
              <div className="flex gap-3 text-[13px] font-medium">
                <Link href="/es" className="text-muted hover:text-ink">ES</Link>
                <span className="text-line">|</span>
                <Link href="/ca" className="text-muted hover:text-ink">CA</Link>
                <span className="text-line">|</span>
                <Link href="/en" className="text-muted hover:text-ink">EN</Link>
              </div>
              <p className="text-[13px] text-muted">{t("footer.copyright")}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
