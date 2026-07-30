import Image from "next/image";
import logoSrc from "./logo-linkterapias.png";
import logoColoresSrc from "./logo-colores.png";
import isotipoSrc from "./isotipo.png";

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <Image
      src={isotipoSrc}
      alt="LinkeTerapias"
      width={size}
      height={size}
      style={{ height: "auto" }}
      priority
    />
  );
}

export function Logo() {
  return (
    <Image
      src={logoSrc}
      alt="LinkeTerapias"
      width={200}
      height={100}
      className="h-10 w-auto"
      priority
    />
  );
}

export function FooterLogo() {
  return (
    <Image
      src={logoColoresSrc}
      alt="LinkeTerapias"
      width={200}
      height={100}
      className="h-20 w-auto"
      priority
    />
  );
}
