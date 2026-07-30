import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";

const destPlanes = [
  { plan: "destBasic", dias: 7, precio: 15 },
  { plan: "destStandard", dias: 15, precio: 20 },
  { plan: "destPremium", dias: 30, precio: 35 },
];

export default async function ProfesionalesPage() {
  const t = await getTranslations("professionals");

  const terapeutaBenefits = [1, 2, 3, 4, 5].map((n) =>
    t(`terapeuta.benefit${n}` as never) as string
  );
  const empresaBenefits = [1, 2, 3, 4, 5].map((n) =>
    t(`empresa.benefit${n}` as never) as string
  );
  const precioFeatures = [1, 2, 3, 4, 5].map((n) =>
    t(`precios.feature${n}` as never) as string
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden py-16 text-center md:py-20">
        <div className="pointer-events-none absolute right-[50px] top-0 opacity-[0.15]" aria-hidden>
          <LogoMark size={300} />
        </div>
        <div className="mx-auto max-w-[1120px] px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
            style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}>
            <i className="ti ti-gift" aria-hidden />
            {t("hero.badge")}
          </span>
          <h1 className="mx-auto mt-3 max-w-[600px] font-display text-4xl leading-tight md:text-[42px]">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-3.5 max-w-[560px] text-[17px] text-muted">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/registro/terapeuta"
              className="inline-flex items-center gap-2 rounded-control bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark">
              <i className="ti ti-user-heart" aria-hidden />
              {t("hero.ctaTerapeuta")}
            </Link>
            <Link href="/registro/empresa"
              className="inline-flex items-center gap-2 rounded-control border border-brand px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand hover:text-white">
              <i className="ti ti-building" aria-hidden />
              {t("hero.ctaEmpresa")}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-[1120px] gap-5 px-6 md:grid-cols-2">

          <div className="rounded-card border border-line bg-surface p-8">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px]"
              style={{ background: "var(--brand-tint)", color: "var(--brand)" }}>
              <i className="ti ti-user-heart text-[26px]" aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-xl">{t("terapeuta.title")}</h3>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              {terapeutaBenefits.map((b, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] text-ink">
                  <i className="ti ti-check mt-[3px] shrink-0" style={{ color: "var(--accent-text)" }} aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/registro/terapeuta"
              className="mt-6 inline-flex items-center gap-2 rounded-control bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark">
              {t("terapeuta.cta")}
            </Link>
          </div>

          <div className="rounded-card border border-line bg-surface p-8">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px]"
              style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}>
              <i className="ti ti-building text-[26px]" aria-hidden />
            </div>
            <h3 className="mt-4 font-display text-xl">{t("empresa.title")}</h3>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              {empresaBenefits.map((b, i) => (
                <li key={i} className="flex gap-2.5 text-[14px] text-ink">
                  <i className="ti ti-check mt-[3px] shrink-0" style={{ color: "var(--accent-text)" }} aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/registro/empresa"
              className="mt-6 inline-flex items-center gap-2 rounded-control border border-brand px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand hover:text-white">
              {t("empresa.cta")}
            </Link>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-6 pb-5">
        <div className="rounded-[20px] bg-brand px-11 py-11 text-center">
          <span className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#d4c5f7]">
            {t("diferencial.eyebrow")}
          </span>
          <h2 className="mt-2 font-display text-[26px] text-white">
            {t("diferencial.title")}
          </h2>
          <p className="mx-auto mt-2.5 max-w-[620px] text-[15px] text-[#e8dffa]">
            {t("diferencial.description")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-center font-display text-[28px]">{t("pasos.title")}</h2>
          <div className="relative mt-8 grid gap-6 text-center md:grid-cols-3">
            <svg
              className="pointer-events-none absolute left-[18%] top-6 hidden h-1 w-[64%] md:block"
              viewBox="0 0 400 4"
              fill="none"
              aria-hidden
            >
              <rect width="400" height="4" rx="2" fill="var(--brand-tint)" />
              <rect width="400" height="4" rx="2" fill="var(--brand)" mask="url(#step-line-mask)" />
              <defs>
                <mask id="step-line-mask">
                  <rect width="400" height="4" fill="url(#step-gradient)">
                    <animate attributeName="x" from="-400" to="400" dur="3s" repeatCount="indefinite" />
                  </rect>
                </mask>
                <linearGradient id="step-gradient">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="50%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#fff" />
                </linearGradient>
              </defs>
            </svg>
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="relative">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-semibold text-white"
                  style={{ background: "var(--accent)" }}>
                  {n}
                </div>
                <h4 className="mt-3.5 font-display text-base">
                  {t(`pasos.step${n}.title` as never) as string}
                </h4>
                <p className="mx-auto mt-1.5 max-w-[250px] text-[13px] text-muted">
                  {t(`pasos.step${n}.description` as never) as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "#f8f5fe" }}>
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-center font-display text-[28px]">{t("precios.title")}</h2>
          <p className="mx-auto mt-2 max-w-[560px] text-center text-muted">{t("precios.lead")}</p>

          <div className="mt-8 grid items-start gap-5 md:grid-cols-[1fr_1.3fr]">
            <div className="rounded-card border-2 border-brand bg-surface p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                style={{ background: "var(--accent-tint)", color: "var(--accent-text)" }}>
                <i className="ti ti-sparkles" aria-hidden />
                {t("precios.planTitle")}
              </span>
              <div className="mt-3.5 font-display text-[40px] font-semibold">{t("precios.price")}</div>
              <p className="mb-5 mt-0.5 text-[13px] text-muted">{t("precios.priceSub")}</p>
              <ul className="flex flex-col gap-2.5">
                {precioFeatures.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px]">
                    <i className="ti ti-check mt-[3px] shrink-0" style={{ color: "var(--accent-text)" }} aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/registro/terapeuta"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-control bg-brand py-3 text-sm font-medium text-white transition hover:bg-brand-dark">
                {t("precios.cta")}
              </Link>
            </div>

            <div className="rounded-card border border-line bg-surface p-8">
              <h3 className="font-display text-lg">
                {t("precios.destTitle")}
                <span className="ml-1 text-sm font-normal text-muted">{t("precios.destOptional")}</span>
              </h3>
              <p className="mb-4 mt-1 text-[13px] text-muted">{t("precios.destNote")}</p>
              <table className="w-full text-[14px]">
                <thead>
                  <tr className="text-left text-[12px] uppercase tracking-[0.04em] text-muted">
                    <th className="border-b border-line pb-2.5 font-medium">Plan</th>
                    <th className="border-b border-line pb-2.5 font-medium">Duración</th>
                    <th className="border-b border-line pb-2.5 font-medium">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {destPlanes.map((p) => (
                    <tr key={p.plan} className="border-b border-line last:border-none">
                      <td className="py-3 font-medium">{t(`precios.${p.plan}` as never) as string}</td>
                      <td className="py-3">{p.dias} {t("precios.destDays")}</td>
                      <td className="py-3 font-medium text-brand">{p.precio} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-[13px] text-muted">{t("precios.destFooter")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-center font-display text-[28px]">{t("faq.title")}</h2>
          <div className="mx-auto mt-7 flex max-w-[760px] flex-col gap-3">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <div key={n} className="rounded-xl border border-line bg-surface px-[22px] py-[18px]">
                <h4 className="flex items-center gap-2 text-[15px]">
                  <i className="ti ti-plus text-lg" style={{ color: "var(--brand)" }} aria-hidden />
                  {t(`faq.q${n}.title` as never) as string}
                </h4>
                <p className="mt-2 text-[14px] text-muted">
                  {t(`faq.q${n}.text` as never) as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "#f8f5fe" }}>
        <div className="mx-auto max-w-[1120px] px-6 text-center">
          <h2 className="font-display text-[28px]">{t("ctaFinal.title")}</h2>
          <p className="mt-2.5 text-muted">{t("ctaFinal.subtitle")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/registro/terapeuta"
              className="inline-flex items-center gap-2 rounded-control bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark">
              <i className="ti ti-user-heart" aria-hidden />
              {t("hero.ctaTerapeuta")}
            </Link>
            <Link href="/registro/empresa"
              className="inline-flex items-center gap-2 rounded-control border border-brand px-6 py-3 text-sm font-medium text-brand transition hover:bg-brand hover:text-white">
              <i className="ti ti-building" aria-hidden />
              {t("hero.ctaEmpresa")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
