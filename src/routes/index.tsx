import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Envelope } from "@/components/invite/Envelope";
import { Gallery } from "@/components/invite/Gallery";
import { CalendarCard, Countdown, DressCode, Venue } from "@/components/invite/Reception";
import { Guestbook } from "@/components/invite/Guestbook";
import { DateBlock, Divider, FramedCard, MiniFlower, Reveal, SectionTitle } from "@/components/invite/Bits";
import { MUSIC, TILE } from "@/components/invite/assets";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sam & Rana — Save The Date · 02.11.2027" },
      { name: "description", content: "Join Sam & Rana as they celebrate their wedding on Tuesday, 2 November 2027." },
      { property: "og:title", content: "Sam & Rana — Save The Date" },
      { property: "og:description", content: "Join us as we celebrate the beginning of our life together — 2 November 2027." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SCHEDULE = [
  ["17:30", "Guests welcomed with dates and Arabic coffee"],
  ["18:30", "Katb al-kitab"],
  ["19:30", "Zaffa procession"],
  ["20:00", "The couple take the kosha"],
  ["21:00", "Walima dinner"],
  ["22:30", "Dabke and dancing"],
  ["00:00", "Sweets and farewell"],
];

function Index() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [opened, setOpened] = useState(false);

  const onOpen = () => {
    setOpened(true);
    audio.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const toggle = () => {
    const a = audio.current; if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)); else { a.pause(); setPlaying(false); }
  };

  // gentle auto scroll after opening; stops as soon as the guest interacts
  useEffect(() => {
    if (!opened) return;
    let raf = 0, stopped = false, acc = 0;
    const stop = () => { stopped = true; cancelAnimationFrame(raf); };
    const step = () => {
      if (stopped) return;
      acc += 0.7;
      if (acc >= 1) { window.scrollBy(0, Math.floor(acc)); acc -= Math.floor(acc); }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) return stop();
      raf = requestAnimationFrame(step);
    };
    const start = setTimeout(() => (raf = requestAnimationFrame(step)), 3200);
    const evs = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    const t = setTimeout(() => evs.forEach((e) => window.addEventListener(e, stop, { passive: true })), 2400);
    return () => { clearTimeout(start); clearTimeout(t); stop(); evs.forEach((e) => window.removeEventListener(e, stop)); };
  }, [opened]);

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundImage: `url(${TILE})`, backgroundSize: "420px", backgroundAttachment: "fixed" }}>
      <div className="pointer-events-none fixed inset-0 bg-background/35" />
      <Envelope onOpen={onOpen} />
      <audio ref={audio} src={MUSIC} loop preload="auto" />

      <div className={cn("relative space-y-28 px-6 pb-32 pt-16 sm:space-y-36 sm:pt-24", !opened && "h-screen overflow-hidden")}>
        {/* HERO */}
        <section className="flex min-h-[88vh] items-center">
          <div className={cn("w-full transition-all duration-[1600ms] delay-700", opened ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            <FramedCard className="py-24 sm:py-28">
              <p className="eyebrow">The wedding of</p>
              <h2 className="mt-6 font-script text-7xl leading-[0.9] text-primary sm:text-8xl">Save<br />The Date</h2>
              <Divider />
              <p className="font-script text-5xl text-shimmer">Sam &amp; Rana</p>
              <p className="mt-4 text-sm tracking-[0.4em] text-primary">TUESDAY · 02 · 11 · 2027</p>
              <p className="mt-10 text-xs tracking-[0.3em] text-muted-foreground animate-pulse">SCROLL ↓</p>
            </FramedCard>
          </div>
        </section>

        {/* CEREMONY */}
        <Reveal>
          <FramedCard>
            <SectionTitle en="Ceremony Info" />
            <div className="mt-6 space-y-1 text-sm text-primary/80">
              <p>Mr. &amp; Mrs. / Youssef Abdelrahman · Nour Abdelrahman</p>
              <p>Mr. &amp; Mrs. / Youssef Hassan · Nour Hassan</p>
            </div>
            <p className="mt-6 italic text-foreground/80">Please join us as we celebrate<br />the beginning of our life together</p>
            <p className="mt-6 font-script text-4xl leading-tight text-primary sm:text-5xl">Youssef Abdelrahman</p>
            <p className="font-script text-4xl text-dusty">&amp;</p>
            <p className="font-script text-4xl leading-tight text-primary sm:text-5xl">Nour Hassan</p>
            <Divider />
            <p className="text-xs tracking-[0.4em] text-muted-foreground">KATB AL-KITAB</p>
            <p className="font-script text-4xl text-primary">Nile Ritz Ballroom</p>
            <p className="eyebrow mt-2">At /</p>
            <DateBlock time="18:30" />
            <Divider />
            <p className="text-xs tracking-[0.4em] text-muted-foreground">WALIMA</p>
            <p className="font-script text-4xl text-primary">Four Seasons Nile Plaza</p>
            <p className="eyebrow mt-2">At /</p>
            <DateBlock time="20:00" />
          </FramedCard>
        </Reveal>

        {/* GALLERY */}
        <Reveal>
          <div className="text-center">
            <div className="paper mx-auto mb-6 w-fit rounded-sm px-12 py-5">
              <p className="eyebrow">Our Moments /</p>
              <p className="mt-2 font-script text-5xl text-primary">Gallery</p>
            </div>
            <Gallery />
          </div>
        </Reveal>

        {/* RECEPTION */}
        <Reveal>
          <FramedCard>
            <SectionTitle en="Reception Info" />
            <p className="mt-4 italic text-foreground/80">The reception will take place at:</p>
            <DateBlock time="18:30" />
            <p className="mt-8 font-script text-5xl leading-tight text-primary">Welcome<br />Reception</p>
            <Divider />
            <p className="eyebrow mb-4">Countdown /</p>
            <Countdown />
            <div className="mt-8"><CalendarCard /></div>
            <Divider />
            <DressCode />
          </FramedCard>
        </Reveal>

        <Reveal>
          <FramedCard>
            <SectionTitle en="Location" />
            <Venue />
          </FramedCard>
        </Reveal>

        {/* SCHEDULE */}
        <Reveal>
          <FramedCard>
            <p className="eyebrow">Wedding Day Schedule</p>
            <p className="font-script text-5xl text-primary">Timeline</p>
            <ol className="relative mx-auto mt-8 max-w-sm text-left">
              <span className="absolute left-[3.35rem] top-2 bottom-2 w-px bg-primary/30 sm:left-[4.6rem]" />
              {SCHEDULE.map(([time, label], i) => (
                <Reveal key={time} delay={i * 90} className="relative flex items-start gap-3 pb-6 last:pb-0 sm:gap-6">
                  <span className="w-10 shrink-0 pt-0.5 text-right font-medium tabular-nums text-primary sm:w-14">{time}</span>
                  <MiniFlower className="relative z-10 mt-1 h-3 w-3 bg-card" />
                  <span className="text-foreground/85">{label}</span>
                </Reveal>
              ))}
            </ol>
          </FramedCard>
        </Reveal>

        {/* GUESTBOOK */}
        <Reveal>
          <FramedCard>
            <p className="eyebrow">Leave your wishes /</p>
            <p className="mb-6 font-script text-5xl text-primary">Guestbook</p>
            <Guestbook />
          </FramedCard>
        </Reveal>

        <footer className="bg-card/95 py-12 text-center">
          <Reveal>
            <div className="rule-gold mx-auto h-px w-48 sm:w-72" />
            <div className="mt-10 flex flex-col items-center px-5 text-center">
              <span className="font-serif text-xs font-bold uppercase tracking-[0.28em] text-gold-deep sm:text-sm">Crafted by</span>
              <span className="mt-3 font-script text-5xl leading-[1.15] text-gold animate-gold-sheen sm:text-6xl">Aurelle Vows</span>
              <span className="mt-3 font-serif text-xs font-semibold uppercase tracking-[0.2em] text-ink/80 sm:text-sm">Bespoke Wedding Invitations</span>
            </div>
          </Reveal>
        </footer>
      </div>

      {opened && (
        <button onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}
          className={cn("fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition hover:scale-110", playing && "animate-pulse-ring")}>
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
      )}
    </main>
  );
}
