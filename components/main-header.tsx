// Figma (node 18:4) specifies Fraunces (headings) and Quicksand (body/UI),
// neither of which is currently loaded in app/[locale]/layout.tsx (Poppins +
// Inter via next/font/google). Swapping the global font loader is a
// follow-up decision for the user, not done here — this component uses the
// existing font-display / font-body tokens instead.

import Image from "next/image";
import { SearchBar } from "@/components/search-bar";
import therapistPhoto from "@/public/main-header/therapist.webp";
import roomPhoto from "@/public/main-header/room.webp";

const maskStyle = (url: string, size: "contain" | "cover" = "cover") => ({
  maskImage: `url(${url})`,
  WebkitMaskImage: `url(${url})`,
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  maskSize: size,
  WebkitMaskSize: size,
});

export function MainHeader() {
  return (
    <section className="relative overflow-hidden bg-canvas py-12 md:py-16">
      <div className="mx-auto flex max-w-grid flex-col items-center gap-12 px-6 md:flex-row md:items-center md:justify-between md:gap-14">
        <div className="flex w-full max-w-[548px] flex-col gap-6">
          <span className="inline-flex w-fit items-center rounded-full bg-brand-tint px-4 py-1.5 font-body text-[13px] font-bold text-brand">
            Terapia con quien de verdad te entiende
          </span>

          <h1 className="font-display text-[40px] font-normal leading-[1.12] text-ink md:text-[52px]">
            No estás solo/a.
            <br />
            <span className="text-accent">Sanar</span> empieza acá.
          </h1>

          <p className="max-w-[480px] font-body text-[17px] leading-[1.7] text-muted">
            Encuentra un/a terapeuta que se ajuste a ti: por especialidad, ciudad y forma de
            trabajar. Sin vueltas, sin jerga clínica.
          </p>

          <div className="w-full max-w-[500px]">
            <SearchBar variant="hero" />
          </div>

          <p className="font-body text-[13.5px] text-muted">
            Gratis para pacientes · sin registro para buscar
          </p>
        </div>

        <div className="relative aspect-[548/420] w-full max-w-[420px] md:max-w-[548px]">
          {/* decorative dot clusters */}
          <Image
            src="/main-header/dots-small.svg"
            alt=""
            aria-hidden
            width={81}
            height={91}
            className="absolute left-[-4%] top-[26%] w-[16%] rotate-[-123deg]"
          />
          <Image
            src="/main-header/dots-large.svg"
            alt=""
            aria-hidden
            width={124}
            height={101}
            className="absolute right-[-2%] top-[46%] w-[19%] rotate-[158deg]"
          />

          {/* secondary room photo, masked into the blob shape, peeking low-opacity behind the teal backdrop */}
          <div
            className="absolute left-[-2%] top-[-4%] h-[62%] w-[62%] opacity-30"
            style={maskStyle("/main-header/blob-mask.svg", "cover")}
            aria-hidden
          >
            <Image src={roomPhoto} alt="" fill className="object-cover" sizes="360px" />
          </div>

          {/* teal blob backdrop */}
          <div
            className="absolute inset-y-[6%] left-0 right-[8%]"
            style={{ backgroundColor: "var(--accent)", ...maskStyle("/main-header/blob-mask.svg", "contain") }}
            aria-hidden
          />

          {/* hero therapist photo, clipped into the organic blob mask, overlapping the backdrop on the right */}
          <div
            className="absolute right-0 top-[2%] h-[94%] w-[72%]"
            style={maskStyle("/main-header/therapist-mask.svg", "cover")}
          >
            <Image
              src={therapistPhoto}
              alt="Terapeuta tomando notas durante una sesión"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 400px, 300px"
              priority
            />
          </div>

          {/* verified specialists card */}
          <div className="absolute left-[8%] top-0 flex flex-col gap-0.5 rounded-2xl bg-ink px-5 py-3.5 shadow-lg">
            <span className="font-display text-2xl font-bold text-white">40+</span>
            <span className="font-body text-[12px] text-white/70">especialistas verificados</span>
          </div>

          {/* rating card */}
          <div className="absolute bottom-0 right-[2%] flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-lg">
            <div className="flex -space-x-2">
              <span className="h-7 w-7 rounded-full border-2 border-surface bg-brand-tint" />
              <span className="h-7 w-7 rounded-full border-2 border-surface bg-accent-tint" />
              <span className="h-7 w-7 rounded-full border-2 border-surface bg-[#f3e9da]" />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-[13px] font-bold text-ink">★★★★★ 4.9/5</span>
              <span className="font-body text-[11.5px] text-muted">valoración de pacientes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
