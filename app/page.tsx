"use client";
import { useEffect, useRef, useState } from "react";

/* ✏️ EDIT THESE ✏️ */
const BRIDE = "Emmanuel";
const GROOM = "Peace";
const WHEN = new Date("2026-11-23T09:00:00"); // ceremony start
const DATE_TEXT = "Monday, 23rd November 2026";
const VENUE = "PWC Abokobi, Accra";
const EMAIL = "internetmail357@gmail.com"; // blessings are delivered here
const VERSE = "Two are better than one… a cord of three strands is not quickly broken.";
const VERSE_REF = "Ecclesiastes 4:9, 12";

const H285 = ["God be gracious to us and bless us now,\nAnd make Thy face shine brightly upon us.\nGrant that Thy Name be known in all the earth,\nYour saving power give to all in this world.", "Let all the peoples praise Thee, Lord our God,\nLet all the nations sing with gladsome joy.\nWe shall come joyfully to praise Thee God,\nFor Thou have guided nations to Thee Lord.", "Show us Thy paths, show us Thy righteous ways,\nAs earth yields fruits abundant for us Lord.\nSo shall our lives yield much fruit for Thee Lord,\nGrant us the fear of Thee, and grant us love."];
const H1 = ["Now, thank we all our God,\nWith hearts and hands and voices!\nWho wondrous things have done,\nIn whom this world rejoices.\nWho from our mother’s arms,\nHas blessed us on our way,\nWith countless gifts of love,\nAnd still is ours today.", "Before our life on earth,\nThe Lord God knew and loved us.\nHe freely gave all things,\nMore than we knew, He gave us.\nTherefore we all must join\nTo sing in unison\nThe praises of our God;\nHe is the God of Praise.", "O may this bounteous God,\nThrough all our lives be near us.\nWith ever joyful hearts,\nAnd blessed peace to cheer us!\nAnd keep us in His grace,\nAnd guide us when perplexed,\nAnd free us from all ills,\nIn this world and the next!", "All praise and thanks to God,\nWho reigns in highest Heaven.\nThe Father and the Son,\nAnd Spirit now be given.\nThe one eternal God,\nWhom earth and heaven adore,\nFor thus it was is now,\nAnd shall be evermore!"];
const H518 = ["Hold Thou my hands, dear Jesus,\nLead Thou me on.\nBe with me always, throughout,\nDepart not, Lord.\nThis life I cannot travel,\nFearful it is.\nIf You will not go with me,\nI’ll neither go.", "My faint heart strengthen, Jesus,\nIn You abide.\nIn joy and in all sorrow,\nThis heart make still.\nGrant me abiding peace, God,\nPeace from You Lord.\nWhen raging storms are o’er me,\nBe near me, Lord.", "When doubts and fears assail me,\nHelp me, dear Lord.\nYou are my Rock and Shield, Lord,\nIn You I trust.\nHold Thou my feeble hands, Lord,\nHelp me, O God.\nAnd guide me through life, Jesus,\nTo Home bring me."];
const H612 = ["When God has blessed you with a wife,\nWho loves you and you also love.\nThen you have priceless gift from Him,\nBe happy and rejoice always.", "The good wife loves her husband much,\nShe loves him and she cares for him,\nIn joy and trouble and suffering,\nShe sticks to him and him alone.", "She also gives him good counsel,\nWhen in distress she comforts him.\nShe longs for him and waits for him,\nCompanionship, she seeks with him.", "Husband provide well for your wife,\nThe wife also must seek to bless.\nGod now has made you one in Him,\nLet nothing separate you in life.", "Christ Jesus watches over you,\nHis blessings you have now received.\nGrace, mercy from Him, all are yours,\nGod has provided all your needs.", "Seek always to please God in life,\nBe faithful to Him in all things.\nLive peacefully in this marriage,\nThat you may end in God’s own Rest.", "Lord Jesus Christ, the Blood you shed,\nHas cleansed from sin and purchased us.\nEternal life we have in You,\nYour righteousness, we all now have.", "Bless Lord, Thy Church, with bliss from You,\nBless this man and woman and all,\nThat we may follow truth in You,\nWalk in Your paths to Home above."];

type Step = { n: number; t: string; who?: string; hymn?: string[] };
const ORDER: Step[] = [
  { n: 1, t: "Call to Worship" },
  { n: 2, t: "Bridal March", who: "Violinist" },
  { n: 3, t: "Opening Hymn", who: "PH 285", hymn: H285 },
  { n: 4, t: "Salutation" },
  { n: 5, t: "Hymn of Praise", who: "PH 1", hymn: H1 },
  { n: 6, t: "Declaration of Purpose", who: "Rev. Mrs. Patricia Addy" },
  { n: 7, t: "Prayer", who: "Rev. Mrs. Patricia Addy" },
  { n: 8, t: "Scripture Reading / Exhortation", who: "Rev. Stephen Laryea" },
  { n: 9, t: "Hymn", who: "PH 518", hymn: H518 },
  { n: 10, t: "Solemnization of Marriage", who: "Rev. Mrs. Patricia Addy" },
  { n: 11, t: "Signing of Certificate / Christian Charity" },
  { n: 12, t: "Presentation of Certificate", who: "Counsellor" },
  { n: 13, t: "Announcement", who: "Session Clerk" },
  { n: 14, t: "Closing Hymn", who: "PH 612", hymn: H612 },
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
  const [open, setOpen] = useState<number | null>(null);
  return (
    <main>
      <section className="hero">
        <Leaf className="leaf l1" /><Leaf className="leaf l2" /><Leaf className="leaf l3" /><Leaf className="leaf l4" />
        <img src="/seal.jpg" alt="E & P wedding seal" className="seal" />
        <p className="eyebrow">Together with their families</p>
        <h1><span className="script">{BRIDE}</span><i>&amp;</i><span className="script">{GROOM}</span></h1>
        <p className="date">{DATE_TEXT}</p>
        <p className="venue">{VENUE}</p>
        <Countdown />
        <a href="#order" className="scroll">Order of Service ↓</a>
      </section>

      <section className="verse"><div ref={a.ref} className={a.cls}>
        <div className="cordcard">
          <img src="/cord.webp" width={1400} height={710} alt="The bride and groom walking hand in hand with Jesus on a braided cord of three strands" className="cord" />
        </div>
        <p>“{VERSE}”</p><span>{VERSE_REF}</span>
      </div></section>

      <section id="order" className="order">
        <h2 className="script">Order of Service</h2>
        <p className="sub">A day of worship, covenant and joy</p>
        <ol className="timeline">
          {ORDER.map((o) => <Item key={o.n} {...o} onOpen={() => setOpen(o.n)} />)}
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
      {open !== null && <HymnDialog step={ORDER.find((o) => o.n === open)!} onClose={() => setOpen(null)} />}
    </main>
  );
}

function Item({ n, t, who, hymn, onOpen }: Step & { onOpen: () => void }) {
  const r = useReveal();
  return (
    <li ref={r.ref as never} className={r.cls}>
      <span className="num">{n}</span>
      {hymn ? (
        <button className="hymnbtn" onClick={onOpen} aria-haspopup="dialog">
          <span className="ttl">{t}</span>
          <span className="sb">{who} · <b>tap to read the hymn ♪</b></span>
        </button>
      ) : (
        <div><h3>{t}</h3>{who && <p>{who}</p>}</div>
      )}
    </li>
  );
}

function HymnDialog({ step, onClose }: { step: Step; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="dialog" role="dialog" aria-modal="true" aria-label={step.t} onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Close">×</button>
        <p className="eyebrow">{step.t}</p>
        <h3 className="script ph">{step.who}</h3>
        {step.hymn!.map((v, i) => (
          <div key={i} className="stanza"><span>{i + 1}</span><p>{v}</p></div>
        ))}
      </div>
    </div>
  );
}
