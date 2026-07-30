import { getTranslations } from "next-intl/server";
import { BuscarContent } from "@/components/buscar-content";

export default async function BuscarPage() {
  const t = await getTranslations("directory");
  const f = await getTranslations("filters");

  const tObj: Record<string, string> = {};
  for (const key of ["title", "subtitle", "resultsTitle", "mapCta", "loadingMap", "loadMore", "noResults", "filterTitle", "filterSpecialty", "filterRating", "filterPrice", "filterUpTo", "filterMode", "filterOnline", "filterInPerson", "stars"]) {
    tObj[key] = t(key as never) as string;
  }
  const fObj: Record<string, string> = {};
  for (const key of ["today", "online", "inPerson", "firstFree"]) {
    fObj[key] = f(key as never) as string;
  }

  return <BuscarContent t={tObj} f={fObj} />;
}
