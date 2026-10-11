"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is readable without JS; above-fold content never waits. */
export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const reveal = (element: Element) => element.classList.remove("motion-pending");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { reveal(entry.target); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -24px 0px" });
    function register() {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(element => !seen.has(element));
      // Batch layout reads before class writes, including after work filters change.
      const candidates = elements.map(element => ({ element, belowFold: element.getBoundingClientRect().top >= window.innerHeight }));
      candidates.forEach(({ element, belowFold }) => {
        if (seen.has(element)) return;
        seen.add(element);
        if (!preference.matches && belowFold) {
          element.classList.add("motion-pending"); observer.observe(element);
        }
      });
    }
    function showAll() {
      if (preference.matches) {
        document.querySelectorAll(".motion-pending").forEach(reveal); observer.disconnect();
      }
    }
    function focus(event: FocusEvent) {
      if (event.target instanceof Element) {
        let element: Element | null = event.target;
        while (element) { reveal(element); element = element.parentElement; }
      }
    }
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.querySelector("main")!, { childList: true, subtree: true });
    preference.addEventListener("change", showAll);
    document.addEventListener("focusin", focus);
    return () => {
      observer.disconnect(); mutations.disconnect();
      preference.removeEventListener("change", showAll); document.removeEventListener("focusin", focus);
      document.querySelectorAll(".motion-pending").forEach(reveal);
    };
  }, [pathname]);
  return null;
}
