import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "./assets";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [i, setI] = useState(0);
  const n = GALLERY.length;
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 3800);
    return () => clearInterval(t);
  }, [paused, n]);
  const go = (d: number) => { setI((v) => (v + d + n) % n); setPaused(true); setTimeout(() => setPaused(false), 6000); };

  return (
    <div className="relative mx-auto h-[26rem] w-full max-w-[34rem] sm:h-[32rem]">
      {GALLERY.map((src, k) => {
        let off = k - i;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        const vis = Math.abs(off) <= 1;
        return (
          <div key={k}
            className={cn("absolute left-1/2 top-1/2 w-[58%] bg-card p-2.5 pb-10 shadow-soft transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]", !vis && "opacity-0")}
            style={{
              transform: `translate(-50%,-50%) translateX(${off * 62}%) rotate(${off * 6}deg) scale(${off === 0 ? 1 : 0.8})`,
              zIndex: 10 - Math.abs(off),
            }}>
            <img src={src} alt="Couple moment" loading="lazy" width={800} height={1008} className="aspect-[4/5] w-full object-cover" />
            <p className="absolute inset-x-0 bottom-2 text-center font-script text-xl text-primary">Sam &amp; Rana</p>
          </div>
        );
      })}
      <button aria-label="Previous photo" onClick={() => go(-1)}
        className="absolute left-0 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition hover:scale-110">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button aria-label="Next photo" onClick={() => go(1)}
        className="absolute right-0 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition hover:scale-110">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2">
        {GALLERY.map((_, k) => (
          <button key={k} aria-label={`Photo ${k + 1}`} onClick={() => go(k - i)}
            className={cn("h-1.5 rounded-full bg-primary transition-all", k === i ? "w-6" : "w-1.5 opacity-30")} />
        ))}
      </div>
    </div>
  );
}
