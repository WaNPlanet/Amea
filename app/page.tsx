"use client";
import { useEffect, useRef, useState } from "react";

/* ✏️ EDIT THESE ✏️ */
const BRIDE = "Emmauel";
const GROOM = "Peace";
const WHEN = new Date("2026-11-23T09:00:00"); // ceremony start
const DATE_TEXT = "Monday, 23rd November 2026";
const VENUE = "PWC Abokobi, Accra";
const EMAIL = "internetmail357@gmail.com"; // blessings are delivered here
const VERSE = "Two are better than one… a cord of three strands is not quickly broken.";
const VERSE_REF = "Ecclesiastes 4:9, 12";

const ORDER: { n: number; t: string; who?: string }[] = [
  { n: 1, t: "Call to Worship" },
  { n: 2, t: "Bridal March", who: "Organist" },
  { n: 3, t: "Opening Hymn", who: "PH 285" },
  { n: 4, t: "Salutation" },
  { n: 5, t: "Hymn of Praise", who: "PH 1" },
  { n: 6, t: "Declaration of Purpose", who: "Rev. Mrs. Patricia Addy" },
  { n: 7, t: "Prayer", who: "Rev. Mrs. Patricia Addy" },
  { n: 8, t: "Scripture Reading / Exhortation", who: "Rev. Stephen Laryea" },
  { n: 9, t: "Hymn", who: "PH 518" },
  { n: 10, t: "Solemnization of Marriage", who: "Rev. Mrs. Patricia Addy" },
  { n: 11, t: "Signing of Certificate / Christian Charity" },
  { n: 12, t: "Presentation of Certificate", who: "Counsellor" },
  { n: 13, t: "Announcement", who: "Session Clerk" },
  { n: 14, t: "Closing Hymn", who: "PH 612" },
  { n: 15, t: "Closing Prayer / Benediction", who: "Minister" },
  { n: 16, t: "Wedding March", who: "Organist" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return { ref, cls: on ? "reveal in" : "reveal" };
}

function Leaf({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" aria-hidden>
      <path d="M60 195C20 150 10 90 60 5c50 85 40 145 0 190Z" fill="currentColor" opacity=".9" />
      <path d="M60 195V30" stroke="var(--cream)" strokeWidth="2" opacity=".6" />
      {[50, 80, 110, 140].map((y) => (
        <g key={y} stroke="var(--cream)" strokeWidth="1.5" opacity=".5">
          <path d={`M60 ${y}l-22 -16`} /><path d={`M60 ${y}l22 -16`} />
        </g>
      ))}
    </svg>
  );
}

function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const i = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(i); }, []);
  if (now === null) return <div className="count" />;
  const d = Math.max(0, WHEN.getTime() - now);
  if (d === 0) return <p className="today">Today is the day 💚</p>;
  const parts = [["days", Math.floor(d / 864e5)], ["hours", Math.floor(d / 36e5) % 24], ["mins", Math.floor(d / 6e4) % 60], ["secs", Math.floor(d / 1e3) % 60]] as const;
  return (
    <div className="count">
      {parts.map(([l, v]) => (
        <div key={l}><b>{String(v).padStart(2, "0")}</b><span>{l}</span></div>
      ))}
    </div>
  );
}

function Wishes() {
  const [name, setName] = useState(""); const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const add = async () => {
    if (!msg.trim() || status === "sending") return;
    const entry = { name: name.trim() || "A loved one", msg: msg.trim() };
    setStatus("sending");
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: entry.name, message: entry.msg, _subject: "💚 A new blessing for the wedding", _template: "box" }),
      });
      if (!r.ok) throw new Error();
      setName(""); setMsg(""); setStatus("sent");
    } catch { setStatus("error"); }
  };
  return (
    <div>
      <div className="card form">
        <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea rows={3} placeholder="Write a blessing, a prayer, a wish…" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={add} disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send love 💚"}</button>
        {status === "sent" && <p className="status">Thank you! Your blessing was sent privately 💚</p>}
        {status === "error" && <p className="status err">Couldn’t send, please check your connection and try again.</p>}
      </div>
    </div>
  );
}

export default function Page() {
  const a = useReveal(), b = useReveal(), c = useReveal();
  return (
    <main>
      <section className="hero">
        <Leaf className="leaf l1" /><Leaf className="leaf l2" /><Leaf className="leaf l3" /><Leaf className="leaf l4" />
        <p className="eyebrow">Together with their families</p>
        <h1><span className="script">{BRIDE}</span><i>&amp;</i><span className="script">{GROOM}</span></h1>
        <p className="date">{DATE_TEXT}</p>
        <p className="venue">{VENUE}</p>
        <Countdown />
        <a href="#order" className="scroll">Order of Service ↓</a>
      </section>

      <section className="verse"><div ref={a.ref} className={a.cls}>
        <p>“{VERSE}”</p><span>{VERSE_REF}</span>
      </div></section>

      <section id="order" className="order">
        <h2 className="script">Order of Service</h2>
        <p className="sub">A day of worship, covenant and joy</p>
        <ol className="timeline">
          {ORDER.map((o) => <Item key={o.n} {...o} />)}
        </ol>
      </section>

      <section className="wish">
        <h2 className="script">Leave a Blessing</h2>
        <p className="sub">Sent privately, straight to the couple</p>
        <div ref={c.ref} className={c.cls}><Wishes /></div>
      </section>

      <footer ref={b.ref as never} className="foot">
        <Leaf className="leaf small" />
        <p className="script big">Love is patient, love is kind.</p>
        <p>1 Corinthians 13:4 · Thank you for celebrating with us</p>
      </footer>
    </main>
  );
}

function Item({ n, t, who }: { n: number; t: string; who?: string }) {
  const r = useReveal();
  return (
    <li ref={r.ref as never} className={r.cls}>
      <span className="num">{n}</span>
      <div><h3>{t}</h3>{who && <p>{who}</p>}</div>
    </li>
  );
}
