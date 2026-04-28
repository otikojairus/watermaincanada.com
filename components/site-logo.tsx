import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  href?: string;
  invert?: boolean;
};

export function SiteLogo({ href = "/", invert = false }: SiteLogoProps) {
  return (
    <Link href={href} className="wmc-logo" aria-label="Water Main Canada home">
      <Image src="/watermaincanada-mark.svg" alt="" width={44} height={44} priority />
      <span className="wmc-logo-copy">
        <strong className={invert ? "text-white" : "text-[var(--ink)]"}>Water Main Canada</strong>
        <span className={invert ? "text-white/72" : "text-[var(--ink-muted)]"}>Sewer and water line response</span>
      </span>
    </Link>
  );
}
