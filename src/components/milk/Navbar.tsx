import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "@/data/site";
import { Btn, scrollTo } from "./ui";
import { cn } from "@/lib/utils";

const LINKS = [
  ["home", "Home"], ["milk", "Our Milk"], ["farm", "Our Farm"], ["process", "How It Works"],
  ["pricing", "Pricing"], ["delivery", "Delivery"], ["faq", "FAQ"],
] as const;

export function Navbar({ onOrder }: { onOrder: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const go = (id: string) => { setOpen(false); scrollTo(id); };
  const dark = !scrolled && !open;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-all duration-500", scrolled || open ? "bg-background/90 shadow-soft backdrop-blur-md" : "bg-transparent")}>
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 md:px-8" aria-label="Main">
        <button onClick={() => go("home")} className="text-left">
          <span className={cn("block font-display text-xl font-semibold leading-none", dark ? "text-earth-foreground" : "text-primary")}>{BRAND.name}</span>
          <span className={cn("text-[10px] uppercase tracking-[0.25em]", dark ? "text-earth-foreground/70" : "text-accent")}>{BRAND.tagline}</span>
        </button>
        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map(([id, label]) => (
            <li key={id}>
              <button onClick={() => go(id)} className={cn("text-sm font-medium transition-colors", dark ? "text-earth-foreground/85 hover:text-earth-foreground" : "text-foreground/75 hover:text-foreground")}>{label}</button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <Btn onClick={onOrder} className="hidden min-h-10 px-5 sm:inline-flex">Order Fresh Milk</Btn>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="relative h-10 w-10 lg:hidden">
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn("absolute left-2 h-0.5 w-6 rounded transition-all duration-300", dark ? "bg-earth-foreground" : "bg-primary",
                i === 0 && (open ? "top-5 rotate-45" : "top-3"), i === 1 && (open ? "top-5 opacity-0" : "top-5"), i === 2 && (open ? "top-5 -rotate-45" : "top-7"))} />
            ))}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 lg:hidden">
            {LINKS.map(([id, label], i) => (
              <motion.li key={id} initial={{ x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                <button onClick={() => go(id)} className="block w-full border-b py-4 text-left font-display text-2xl">{label}</button>
              </motion.li>
            ))}
            <li className="py-5"><Btn onClick={() => { setOpen(false); onOrder(); }} className="w-full">Order Fresh Milk</Btn></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
