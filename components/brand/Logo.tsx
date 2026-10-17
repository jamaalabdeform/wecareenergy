import { cn } from "../ui/cn";

/**
 * Logo officiel WE CARE ÉNERGIE — fichier fourni par le client (PNG 783×301, présentation STIPway).
 * Ne jamais recomposer le logo en texte HTML : toujours utiliser ce composant.
 * TODO_WCE_VALIDATION : remplacer par le fichier source vectoriel (SVG) dès qu'il est fourni.
 *
 * Le logo n'existe qu'en couleurs : sur fond foncé, il est posé sur un cartouche blanc
 * (variantes « inverse ») plutôt que recoloré.
 */
const RATIO = 783 / 301;
const VARIANTS = {
  full: { src: "/brand/we-care-energie-logo.webp", plate: false },
  "full-inverse": { src: "/brand/we-care-energie-logo.webp", plate: true },
  compact: { src: "/brand/we-care-energie-logo-sm.webp", plate: false },
  "compact-inverse": { src: "/brand/we-care-energie-logo-sm.webp", plate: true },
} as const;

export type LogoVariant = keyof typeof VARIANTS;

export function Logo({ variant = "full", height = 48, className, priority = false }: { variant?: LogoVariant; height?: number; className?: string; priority?: boolean }) {
  const v = VARIANTS[variant];
  const width = Math.round(height * RATIO);
  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- logo léger, dimensions fixes
    <img
      src={v.src}
      width={width}
      height={height}
      alt="WE CARE ÉNERGIE"
      className={cn("block h-auto max-w-full select-none", !v.plate && className)}
      style={{ aspectRatio: `${RATIO}` }}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      draggable={false}
    />
  );
  return v.plate ? <span className={cn("inline-block rounded-md bg-white px-4 py-3", className)}>{img}</span> : img;
}
