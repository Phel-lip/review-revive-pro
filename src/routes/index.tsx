import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ArrowRight, MapPin, Clock, Instagram, ChevronDown, Menu, X, ExternalLink, MessageCircle } from "lucide-react";
import { SALON, MARQUEE_ITEMS } from "@/lib/salon";
import { BookingModal } from "@/components/BookingModal";
import { ServicesSection } from "@/components/ServicesSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Button } from "@/components/ui/button";
import beforeAsset from "@/assets/hair-before.png.asset.json";
const before = beforeAsset.url;
import afterAsset from "@/assets/hair-after.png.asset.json";
const after = afterAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A.M Cabelos & Produções — Araguaína/TO | Solicite seu horário" },
      { name: "description", content: "A.M Cabelos & Produções em Araguaína/TO: cortes, escova, tratamentos, luzes e unhas decoradas. Solicite seu horário pelo WhatsApp." },
      { property: "og:title", content: "A.M Cabelos & Produções — Araguaína/TO" },
      { property: "og:description", content: "Conheça os trabalhos reais de cabelos e unhas da A.M Cabelos & Produções e solicite seu horário." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: SALON.heroImg },
      { name: "twitter:image", content: SALON.heroImg },
    ],
  }),
  component: Index,
});

const NAV = [["Serviços", "#servicos"], ["Antes e depois", "#antes-depois"], ["Avaliações", "#avaliacoes"], ["Dúvidas", "#faq"]];

function Index() {
  const [modal, setModal] = useState<{ open: boolean; service: string | null }>({ open: false, service: null });
  const book = (service: string | null = null) => setModal({ open: true, service });
  const close = useCallback(() => setModal({ open: false, service: null }), []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header onBook={() => book()} />
      <Hero onBook={() => book()} />
      <ServiceMarquee />
      <ServicesSection onBook={book} />
      <BeforeAfter onBook={() => book()} />
      <ReviewsSection />
      <Faq />
      <Footer />
      {modal.open && <BookingModal open initialService={modal.service} onClose={close} />}
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5" aria-label={SALON.name}>
      <span className="font-display text-3xl font-semibold italic leading-none text-gold">A.M</span>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold">cabelos</span>
        <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">& produções</span>
      </span>
    </a>
  );
}

function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-muted-foreground transition hover:text-primary">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onBook} className="rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:px-5">Solicitar horário</button>
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="grid border-t px-5 py-2 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-sm">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sand blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] text-primary">
            <MapPin className="h-3.5 w-3.5" /> {SALON.city}
          </p>
          <h1 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
            Vem ficar <em className="text-brand">mais linda</em> aqui.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Salão de beleza completo em Araguaína. Corte, escova e tratamentos para cabelos bonitos e bem cuidados.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onBook} className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:opacity-90">
              Solicitar horário <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#servicos" className="rounded-full border bg-card px-7 py-3.5 font-medium transition hover:border-primary">Ver serviços</a>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-primary" /> {SALON.hours}</p>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-brand opacity-90" />
          <img src={SALON.heroImg} alt="Cliente com mechas e finalização ondulada na A.M Cabelos & Produções" className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover object-top shadow-soft" />
        </div>
      </div>
    </section>
  );
}

function ServiceMarquee() {
  return (
    <div className="overflow-hidden border-y border-gold/30 bg-cocoa py-3.5 text-cocoa-foreground md:py-[18px]" aria-label="Serviços do salão">
      <div className="marquee-track flex w-max font-display text-xl uppercase tracking-[0.14em] sm:text-2xl">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-7 pr-7" aria-hidden={copy === 1}>
            {MARQUEE_ITEMS.map((item) => (
              <span key={item} className="flex shrink-0 items-center gap-7">
                <span>{item}</span>
                <span className="text-gold" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 max-w-xl">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function BeforeAfter({ onBook }: { onBook: () => void }) {
  const [pos, setPos] = useState(50);
  return (
    <section id="antes-depois" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <div>
          <SectionTitle eyebrow="Antes e depois" title={<>Cabelos brilhosos,<br /><em className="text-brand">coloração e tratamento.</em></>} />
          <Button variant="service" size="service" onClick={onBook}>Quero esse resultado.<ArrowRight /></Button>
        </div>
        <figure>
          <div className="relative aspect-square w-full select-none overflow-hidden rounded-3xl shadow-soft">
            <img src={after} alt="Depois" className="absolute inset-0 h-full w-full object-cover" />
            <img src={before} alt="Antes" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-card" style={{ left: `${pos}%` }}>
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-primary shadow-soft">⇆</div>
            </div>
            <span className="absolute left-3 top-3 rounded-full bg-cocoa/80 px-3 py-1 text-xs text-cocoa-foreground">Antes</span>
            <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Depois</span>
            <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0" />
          </div>
        </figure>
      </div>
    </section>
  );
}

const FAQ = [
  ["Como funcionam os combos promocionais de segunda a quarta?", "O salão divulga os combos no destaque “Combo Seg A Quar” do Instagram. Consulte pelo WhatsApp os serviços incluídos, os valores e as condições atuais."],
  ["O salão também oferece produtos para cuidar do cabelo em casa?", "Sim! O Instagram apresenta reparadores de pontas e finalizadores para os cuidados em casa. Fale pelo WhatsApp para consultar as opções disponíveis."],
  ["Como funciona a solicitação de horário?", "Você escolhe o serviço e, se quiser, uma data, um período e uma observação. No final, o WhatsApp do salão abre com a mensagem pronta para você enviar."],
  ["O horário já fica confirmado?", "Ainda não. É uma solicitação: o salão confere a agenda e confirma a disponibilidade com você pelo WhatsApp."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="divide-y rounded-3xl border bg-card">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <Button variant="ghost" aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)} className="h-auto w-full justify-between gap-4 whitespace-normal px-6 py-5 text-left text-base font-medium">
                {q}<ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${open === i ? "rotate-180" : ""}`} />
              </Button>
              {open === i && <p id={`faq-answer-${i}`} className="px-6 pb-5 text-sm text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-cocoa text-cocoa-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl"><span className="italic text-gold">A.M</span> Cabelos & Produções</p>
          <p className="mt-2 text-sm opacity-75">Salão de beleza completo para você.</p>
        </div>
        <p className="flex gap-3 text-sm"><MapPin className="h-4 w-4 shrink-0 text-gold" />Araguaína · Tocantins</p>
        <div className="grid gap-3 text-sm">
          <p className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-gold" />{SALON.hours}</p>
          <a href={`https://wa.me/${SALON.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-gold"><MessageCircle className="h-4 w-4 shrink-0 text-gold" />WhatsApp {SALON.whatsappLabel}</a>
        </div>
        <a href={SALON.instagram} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-sm hover:text-gold"><Instagram className="h-4 w-4 shrink-0 text-gold" />{SALON.instagramHandle} <ExternalLink className="h-3 w-3" /></a>
      </div>
      <p className="border-t border-cocoa-foreground/15 py-5 text-center text-xs opacity-70">© {SALON.name}</p>
    </footer>
  );
}
