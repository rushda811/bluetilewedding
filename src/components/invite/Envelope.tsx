import { useState } from "react";
import confetti from "canvas-confetti";
import { TILE } from "./assets";
import { cn } from "@/lib/utils";
import { FramedCard, Divider } from "./Bits";
import { Button } from "@/components/ui/button";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [stage, setStage] = useState<"closed" | "opening" | "gone">("closed");

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    onOpen();
    const colors = ["#1f3a6e", "#7f9cc4", "#f4ecdc", "#c9d6ea"];
    setTimeout(() => {
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.6 }, colors, scalar: 1.1 });
      confetti({ particleCount: 70, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
      confetti({ particleCount: 70, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
    }, 700);
    setTimeout(() => setStage("gone"), 2300);
  };

  if (stage === "gone") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-[1400ms] ease-out",
        stage === "opening" && "pointer-events-none opacity-0 delay-1000 scale-110",
      )}
      style={{ backgroundImage: `url(${TILE})`, backgroundSize: "420px" }}
      onClick={open}
    >
      <div className="absolute inset-0 bg-background/30" />
      <div className="relative w-[min(88vw,30rem)] animate-fade-up">
        <FramedCard className="opening-card">
          <p className="eyebrow">Together with their families</p>
          <h1 className="mt-7 font-script text-5xl leading-tight text-shimmer sm:text-6xl">Sam &amp; Rana</h1>
          <Divider />
          <p className="text-sm tracking-[0.25em] text-primary">02 · 11 · 2027</p>
          <Button onClick={(e) => { e.stopPropagation(); open(); }} className="mt-7 h-11 rounded-full px-8 text-xs tracking-[0.3em] shadow-soft transition hover:scale-105">OPEN</Button>
          <p className="mt-4 text-xs italic text-muted-foreground">touch to open the invitation</p>
        </FramedCard>
      </div>
    </div>
  );
}
