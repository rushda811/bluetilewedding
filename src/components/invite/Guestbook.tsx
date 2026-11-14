import { useEffect, useState } from "react";

type Wish = { name: string; text: string; at: number };
const KEY = "samrana-wishes";

export function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  useEffect(() => { try { setWishes(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ } }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const next = [{ name: name.trim().slice(0, 60), text: text.trim().slice(0, 400), at: Date.now() }, ...wishes];
    setWishes(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    setName(""); setText("");
  };

  const field = "w-full rounded-sm border border-primary/25 bg-card/80 px-4 py-3 text-primary placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none";
  return (
    <div className="text-left">
      <form onSubmit={submit} className="space-y-3">
        <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
        <textarea className={`${field} min-h-24 resize-none`} placeholder="Leave your wishes for the couple…" value={text} onChange={(e) => setText(e.target.value)} maxLength={400} />
        <button className="w-full rounded-full bg-primary py-3 text-xs tracking-[0.35em] text-primary-foreground shadow-soft transition hover:bg-navy-deep">
          SEND WISHES
        </button>
      </form>
      <div className="mt-6 max-h-72 space-y-3 overflow-y-auto pr-1">
        {wishes.length === 0 && <p className="text-center italic text-muted-foreground">Be the first to leave a wish ♡</p>}
        {wishes.map((w) => (
          <div key={w.at} className="animate-fade-up rounded-sm border-l-2 border-primary bg-card/70 px-4 py-3">
            <p className="font-script text-2xl text-primary">{w.name}</p>
            <p className="text-sm text-foreground/80">{w.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
