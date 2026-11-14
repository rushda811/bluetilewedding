import { useEffect, useRef, type ReactNode } from "react";
import { FLOWER, FRAME } from "./assets";
import { cn } from "@/lib/utils";

export function MiniFlower({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={cn("h-4 w-4 shrink-0 text-primary", className)}>
      <path d="M12 3C8 1 5 4 5 7c-4 1-4 6-1 8-1 4 3 7 7 6 3 2 7 0 8-3 4-1 5-6 2-9 0-4-5-7-9-6Z" />
      <path d="M12 3c-3 2-5 5-3 8M5 7c1 5 4 8 8 7M4 15c4 2 8 2 10-2M11 21c3-2 5-6 3-9M19 18c0-4-2-7-6-8M21 9c-4-2-8-2-10 1" />
      <path d="M10 9c2-2 5-1 5 2 0 2-2 3-4 2-2-1-1-3 1-3" />
    </svg>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e?.isIntersecting && (el.classList.add("is-visible"), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Flowers({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const w = { sm: "w-20 sm:w-28", md: "w-24 sm:w-36", lg: "w-28 sm:w-44" }[size];
  return (
    <>
      <img src={FLOWER} alt="" aria-hidden width={640} height={1280}
        className={cn("pointer-events-none absolute -left-10 bottom-0 z-10 animate-sway drop-shadow-sm sm:-left-16", w)} />
      <img src={FLOWER} alt="" aria-hidden width={640} height={1280}
        className={cn("pointer-events-none absolute -right-10 top-0 z-10 -scale-x-100 animate-sway drop-shadow-sm sm:-right-16", w)}
        style={{ animationDelay: "-4s" }} />
    </>
  );
}

export function FramedCard({ children, className, flowers = true }: { children: ReactNode; className?: string; flowers?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[34rem]">
      {flowers && <Flowers />}
      <div className={cn("paper relative overflow-hidden rounded-sm px-12 py-24 text-center sm:px-20 sm:py-28", className)}>
        <div aria-hidden className="pointer-events-none absolute inset-2 flex flex-col sm:inset-3">
          <div className="w-full shrink-0" style={{ aspectRatio: "1122/170", backgroundImage: `url(${FRAME})`, backgroundSize: "100% auto", backgroundPosition: "top", backgroundRepeat: "no-repeat" }} />
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-[9.9%] w-[1.1%] min-w-[4px] border-x border-navy" style={{ borderLeftWidth: 2 }} />
            <span className="absolute inset-y-0 right-[9.9%] w-[1.1%] min-w-[4px] border-x border-navy" style={{ borderRightWidth: 2 }} />
          </div>
          <div className="w-full shrink-0" style={{ aspectRatio: "1122/170", backgroundImage: `url(${FRAME})`, backgroundSize: "100% auto", backgroundPosition: "bottom", backgroundRepeat: "no-repeat" }} />
        </div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center justify-center gap-3 text-primary">
      <span className="h-px w-12 bg-primary/40" />
      <MiniFlower />
      <span className="h-px w-12 bg-primary/40" />
    </div>
  );
}

export function DateBlock({ time }: { time: string }) {
  return (
    <div className="mx-auto mt-4 grid max-w-xs grid-cols-3 items-center text-primary">
      <div className="border-r border-primary/30 pr-2">
        <p className="text-lg font-medium">{time}</p>
        <p className="whitespace-nowrap text-[0.6rem] tracking-[0.08em] sm:tracking-[0.3em]">TUESDAY</p>
      </div>
      <p className="font-script text-6xl leading-none">02</p>
      <div className="border-l border-primary/30 pl-2">
        <p className="whitespace-nowrap text-[0.6rem] tracking-[0.04em] sm:tracking-[0.3em]">NOVEMBER</p>
        <p className="text-lg font-medium">11 · 2027</p>
      </div>
    </div>
  );
}

export function SectionTitle({ en, sub }: { en: string; sub?: string }) {
  return (
    <div className="mb-2">
      <p className="eyebrow">{en}{sub ? ` / ${sub}` : " /"}</p>
    </div>
  );
}
