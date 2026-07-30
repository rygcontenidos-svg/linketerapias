import { getTranslations } from "next-intl/server";
import { EmpleoContent } from "@/components/empleo-content";

export default async function EmpleoPage() {
  const t = await getTranslations("empleo");

  const tObj: Record<string, string> = {};
  const keys = [
    "title", "subtitle", "lock", "tabOfertas", "tabProfesionales",
    "ctaOferta", "ctaDisponibilidad", "filters", "filterSpecialty",
    "filterHiring", "filterAutonomo", "filterContratado",
    "filterMode", "filterPresencial", "filterOnline", "filterHibrido",
    "filterCity", "postular", "verCV", "contactar",
    "loadMore", "loadMorePros", "bannerText", "bannerCta",
    "featured", "disponible", "cvActualizado",
  ];
  for (const k of keys) {
    tObj[k] = (t(k as never) as string) ?? "";
  }

  return <EmpleoContent t={tObj} />;
}
