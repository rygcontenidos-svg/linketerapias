"use client";

import { useState } from "react";
import Link from "next/link";

export function MobileNav({ t }: { t: Record<string, string> }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="lg:hidden text-white"
        aria-label="Menú"
      >
        <i className={open ? "ti ti-x text-xl" : "ti ti-menu-2 text-xl"} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 border-b border-line bg-white shadow-lg lg:hidden">
          <nav className="flex flex-col px-5 py-4 text-[15px] font-medium">
            <Link href="/" onClick={() => setOpen(false)} className="py-3 text-ink">{t["nav.inicio"]}</Link>
            <Link href="/buscar" onClick={() => setOpen(false)} className="py-3 text-muted">{t["nav.buscar"]}</Link>
            <Link href="/empleo" onClick={() => setOpen(false)} className="py-3 text-muted">{t["nav.empleo"]}</Link>
            <Link href="/profesionales" onClick={() => setOpen(false)} className="py-3 text-muted">{t["nav.profesionales"]}</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="mt-2 rounded-control border border-brand py-2.5 text-center text-[14px] font-medium text-brand">
              {t["nav.login"]}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
