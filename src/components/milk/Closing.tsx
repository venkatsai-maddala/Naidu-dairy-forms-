import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import glass from "@/assets/milk-glass.jpg";
import { BRAND, DELIVERY_AREAS, FAQS, WHATSAPP_NUMBER, whatsappLink } from "@/data/site";
import { Btn, Reveal, SectionHead, scrollTo } from "./ui";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-cream px-5 py-28 md:px-8">
      <div className="mx-auto max-w-3xl">
        <SectionHead center eyebrow="FAQ" title="Questions, Answered" />
        <div className="divide-y border-y">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <h3>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-6 text-left font-display text-xl md:text-2xl">
                  {f.q}<Plus className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`} />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="pb-6 text-muted-foreground">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const items = [
    { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Message us", href: whatsappLink("Hello, I have a question about your buffalo milk.") },
    { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: MapPin, label: "Farm location", value: BRAND.farmLocation, href: "#delivery" },
  ];
  return (
    <section className="px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Contact" title="Let's Bring Fresh Milk to Your Home" sub={`Delivering to ${DELIVERY_AREAS.map((a) => a.name).join(", ")}.`} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, label, value, href }) => (
            <Reveal key={label}>
              <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block h-full rounded-3xl border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-soft">
                <Icon className="h-5 w-5 text-accent" />
                <p className="mt-6 text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 font-semibold break-words">{value}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ onOrder }: { onOrder: () => void }) {
  return (
    <section className="relative overflow-hidden bg-earth px-5 py-36 text-center text-earth-foreground md:px-8">
      <img src={glass} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/70 to-earth/40" />
      <Reveal className="relative mx-auto max-w-4xl">
        <h2 className="text-5xl leading-[1] font-medium md:text-7xl">Fresh Milk. Every Day. <em className="text-gold">From Our Farm to Your Home.</em></h2>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Btn onClick={onOrder} className="bg-milk text-primary hover:bg-milk/90">Order Fresh Milk</Btn>
          <Btn variant="light" onClick={() => scrollTo("delivery")}>Check Delivery Area</Btn>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const explore: [string, string][] = [["home", "Home"], ["milk", "Our Milk"], ["farm", "Our Farm"], ["pricing", "Pricing"], ["delivery", "Delivery"], ["faq", "FAQ"]];
  return (
    <footer className="bg-earth px-5 pt-20 pb-10 text-earth-foreground/80 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-earth-foreground/15 pb-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-earth-foreground">{BRAND.name}</p>
          <p className="mt-3 text-sm">Fresh buffalo milk from our small farm, delivered to your door every morning. Pure Buffalo Milk. Nothing Extra.</p>
        </div>
        <FooterCol title="Explore">{explore.map(([id, l]) => <li key={id}><button onClick={() => scrollTo(id)} className="hover:text-earth-foreground">{l}</button></li>)}</FooterCol>
        <FooterCol title="Contact">
          <li>{BRAND.phone}</li>
          <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-earth-foreground">WhatsApp</a></li>
          <li>{BRAND.email}</li>
        </FooterCol>
        <FooterCol title="Legal">
          {/* Link these to real policy pages when ready */}
          <li>Privacy Policy</li><li>Terms</li><li>Refund / Cancellation Policy</li>
        </FooterCol>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-xs">© 2026 {BRAND.name}. All rights reserved.</p>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">{title}</p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={whatsappLink("Hello, I would like to order 1 litre of fresh buffalo milk.")} target="_blank" rel="noreferrer"
      className="fixed right-5 bottom-5 z-30 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground shadow-soft transition-transform hover:-translate-y-1">
      <MessageCircle className="h-5 w-5" /><span className="hidden sm:inline">Order on WhatsApp</span><span className="sr-only sm:hidden">Order on WhatsApp</span>
    </a>
  );
}
