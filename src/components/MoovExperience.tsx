import { useEffect, useRef } from "react";

/** Motion is progressive enhancement: the page stays fully usable without JS. */
export function MoovExperience() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#top > section > div, #top > section h2, #top > section h3, #top footer > div",
      ),
    );
    let observer: IntersectionObserver | undefined;
    if (!reduced.matches && "IntersectionObserver" in window) {
      root.classList.add("moov-motion-ready");
      revealNodes.forEach((element) => element.classList.add("moov-reveal"));
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("moov-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
      );
      revealNodes.forEach((element) => observer?.observe(element));
    }

    let frame = 0;
    let pointerX = -100;
    let pointerY = -100;
    let currentX = -100;
    let currentY = -100;
    const cursor = cursorRef.current;
    const progress = progressRef.current;
    const heroArt = document.querySelector<HTMLElement>(".moov-hero-art");

    const tick = () => {
      currentX += (pointerX - currentX) * 0.18;
      currentY += (pointerY - currentY) * 0.18;
      if (cursor && fine.matches && !reduced.matches) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (heroArt && fine.matches && !reduced.matches) {
        const bounds = heroArt.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        heroArt.style.setProperty("--moov-tilt-x", `${(-y * 5).toFixed(2)}deg`);
        heroArt.style.setProperty("--moov-tilt-y", `${(x * 5).toFixed(2)}deg`);
      }
      const interactive = (event.target as HTMLElement).closest("a, button, select, input");
      cursor?.classList.toggle("moov-cursor-active", Boolean(interactive));
    };
    const resetTilt = () => {
      heroArt?.style.setProperty("--moov-tilt-x", "0deg");
      heroArt?.style.setProperty("--moov-tilt-y", "0deg");
    };
    const onScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    heroArt?.addEventListener("pointerleave", resetTilt);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    if (fine.matches && !reduced.matches) frame = window.requestAnimationFrame(tick);

    return () => {
      observer?.disconnect();
      root.classList.remove("moov-motion-ready");
      revealNodes.forEach((element) => element.classList.remove("moov-reveal", "moov-visible"));
      document.removeEventListener("pointermove", onPointerMove);
      heroArt?.removeEventListener("pointerleave", resetTilt);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="moov-scroll-progress" ref={progressRef} />
      <div aria-hidden="true" className="moov-cursor" ref={cursorRef}><span>↗</span></div>
    </>
  );
}
