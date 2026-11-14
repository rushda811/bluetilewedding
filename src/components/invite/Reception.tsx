import { useEffect, useState } from "react";
import { CalendarPlus, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WEDDING = new Date("2027-11-02T18:30:00+03:00");

function diff() {
  const ms = Math.max(0, WEDDING.getTime() - Date.now());
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor((ms / 36e5) % 24),
    min: Math.floor((ms / 6e4) % 60),
    sec: Math.floor((ms / 1e3) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);
  useEffect(() => { setT(diff()); const id = setInterval(() => setT(diff()), 1000); return () => clearInterval(id); }, []);
  const items: [string, number | undefined][] = [["days", t?.days], ["hours", t?.hours], ["min", t?.min], ["sec", t?.sec]];
  return (
    <div className="grid grid-cols-4 gap-2 text-primary">
      {items.map(([l, v]) => (
        <div key={l} className="flex flex-col items-center rounded-sm border border-primary/20 bg-card/70 py-3">
          <span className="text-3xl font-medium tabular-nums sm:text-4xl">{v === undefined ? "--" : String(v).padStart(2, "0")}</span>
          <span className="text-[0.6rem] tracking-[0.3em] uppercase">{l}</span>
        </div>
      ))}
    </div>
  );
}

const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");

function googleUrl() {
  const end = new Date(WEDDING.getTime() + 5.5 * 36e5);
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: "Wedding of Sam & Rana",
    dates: `${fmt(WEDDING)}/${fmt(end)}`,
    details: "Wedding Reception",
    location: "Four Seasons Kingdom Centre, Riyadh, Saudi Arabia",
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

function downloadIcs() {
  const end = new Date(WEDDING.getTime() + 5.5 * 36e5);
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SamRana//Invite//EN", "BEGIN:VEVENT",
    `UID:samrana-2027@invite`, `DTSTAMP:${fmt(new Date())}`, `DTSTART:${fmt(WEDDING)}`, `DTEND:${fmt(end)}`,
    "SUMMARY:Wedding of Sam & Rana", "LOCATION:Four Seasons Kingdom Centre\\, Riyadh\\, Saudi Arabia",
    "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "sam-rana-wedding.ics";
  a.click();
}

export function CalendarCard() {
  // November 2027 starts on a Monday
  const offset = 1;
  const cells = [...Array(offset).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)];
  const isApple = typeof navigator !== "undefined" && /iPhone|iPad|Mac/.test(navigator.userAgent);
  return (
    <div className="navy-card relative overflow-hidden rounded-sm p-3 sm:p-8">
      <div aria-hidden className="pointer-events-none absolute inset-2 rounded-sm border border-primary-foreground/25" />
      <p className="font-script text-4xl">November</p>
      <p className="mb-5 text-xs tracking-[0.4em] opacity-80">2027</p>
      <div className="grid grid-cols-7 gap-y-2 text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-[0.65rem] tracking-widest opacity-60">{d}</span>
        ))}
        {cells.map((d, i) => (
          <span key={i} className="relative grid h-9 place-items-center">
            {d === 2 ? (
              <>
                <Heart className="absolute h-9 w-9 fill-primary-foreground text-primary-foreground animate-pulse" />
                <span className="relative font-semibold text-primary">2</span>
              </>
            ) : d}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <a href={googleUrl()} target="_blank" rel="noreferrer"
          onClick={(e) => { if (isApple) { e.preventDefault(); downloadIcs(); } }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 py-2.5 text-xs tracking-[0.25em] text-primary transition hover:scale-105">
          <CalendarPlus className="h-4 w-4" /> ADD TO CALENDAR
        </a>
      </div>
    </div>
  );
}

export function Venue() {
  return (
    <div className="mt-8 text-primary">
      <p className="eyebrow">Wedding Reception Venue</p>
      <p className="mt-2 font-script text-4xl">Four Seasons Kingdom Centre</p>
      <p className="text-sm tracking-widest">Riyadh, Saudi Arabia</p>
      <Button asChild className="mt-6 h-auto min-h-11 rounded-full px-4 py-3 text-xs tracking-[0.12em]">
        <a href="https://www.google.com/maps/search/?api=1&query=Four+Seasons+Kingdom+Centre+Riyadh" target="_blank" rel="noreferrer">
          <MapPin className="h-4 w-4" /> GET DIRECTIONS
        </a>
      </Button>
    </div>
  );
}

export function DressCode() {
  const swatches = ["bg-navy", "bg-dusty", "bg-cream-deep"];
  return (
    <div className="text-primary">
      <p className="eyebrow">Dress Code</p>
      <p className="mt-1 font-script text-4xl">Party Attire</p>
      <div className="mt-4 flex justify-center gap-4">
        {swatches.map((c, i) => (
          <span key={c} className={`h-11 w-11 rounded-full border-2 border-card ${c} shadow-soft animate-float`} style={{ animationDelay: `${i * -1.5}s` }} />
        ))}
      </div>
    </div>
  );
}
