import type { ReactNode } from "react";

/** The debossed plate mark around an image. Animated borders draw when a plate is pulled. */
export function PlateImage({ children }: { children: ReactNode }) {
  return <span className="plate-mark"><span className="plate-image">{children}</span></span>;
}

/** The typeset inscription under a print: title, edition number and the maker's hand. */
export function Inscription({ title, edition, meta, hand = "A. Chua, 2026", live = false }: { title: string; edition?: string; meta?: string; hand?: string; live?: boolean }) {
  return <figcaption className="inscription" aria-live={live ? "polite" : undefined}>
    <span className="inscription-title">{title}</span>
    {edition ? <span className="inscription-edition">{edition}</span> : <span aria-hidden="true" />}
    <span className="inscription-hand">{hand}</span>
    {meta && <span className="inscription-meta">{meta}</span>}
  </figcaption>;
}
