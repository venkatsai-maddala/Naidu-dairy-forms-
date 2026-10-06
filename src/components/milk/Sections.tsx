import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Droplet, Leaf, Home, ShieldCheck, Package, Truck, Milk, Sparkles, Star, Check } from "lucide-react";
import glass from "@/assets/milk-glass.jpg";
import shed from "@/assets/farm-shed.jpg";
import bottles from "@/assets/delivery-bottles.jpg";
import hero from "@/assets/hero-buffalo.jpg";
import { BUFFALOES, FREQUENCIES, PRODUCTS, TESTIMONIALS } from "@/data/site";
import { Btn, Reveal, SectionHead } from "./ui";

const BuffaloIcon = Milk;

export function WhyUs() {
  const items = [
    { icon: BuffaloIcon, t: "Fresh Buffalo Milk", d: "Milk sourced directly from our own buffaloes." },
    { icon: ShieldCheck, t: "No Added Preservatives", d: "We do not add preservative powders to our milk." },
    { icon: Leaf, t: "Limited Daily Supply", d: "We produce and deliver limited quantities every day." },
    { icon: Home, t: "Farm to Home", d: "Delivered directly to households — no middle shelves." },
  ];
  return (
    <section className="grain px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Why us" title="Why Choose Our Milk?" sub="Small farm. Honest milk. A simple promise we keep every morning." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border bg-card p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-medium">{t}</h3>
                <p className="mt-3 text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FarmStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  return (
    <section id="farm" ref={ref} className="bg-cream px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Our farm" title={<>We Don't Run a Factory. <em className="text-accent">We Run a Farm.</em></>} />
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Our milk starts with our buffaloes, not a factory production line. We focus on fresh daily production,
              careful handling, hygienic packaging, and direct delivery to households.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Milked fresh each morning", "Clean, airy sheds", "Hygienic steel cans", "Packed for your doorstep"].map((x) => (
                <li key={x} className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" />{x}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        {/* Replace these images with real farm photographs */}
        <div className="relative grid h-[520px] grid-cols-2 gap-4">
          <motion.img style={{ y: y1 }} src={shed} alt="Buffaloes resting in the farm shed" loading="lazy" width={1280} height={960} className="h-full w-full rounded-3xl object-cover shadow-soft" />
          <div className="grid gap-4">
            <motion.img style={{ y: y2 }} src={glass} alt="Glass of fresh buffalo milk beside a steel milk can" loading="lazy" width={1024} height={1280} className="h-full w-full rounded-3xl object-cover shadow-soft" />
            <motion.img style={{ y: y2 }} src={bottles} alt="Milk bottles in a basket ready for delivery" loading="lazy" width={1280} height={960} className="h-full w-full rounded-3xl object-cover shadow-soft" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-32 max-w-7xl">
        <SectionHead eyebrow="The herd" title="Meet the Source of Your Morning Milk" />
        <div className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:px-0">
          {BUFFALOES.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.1} className="w-[80%] shrink-0 snap-start md:w-auto">
              <article className="group overflow-hidden rounded-3xl bg-card">
                <div className="overflow-hidden">
                  <img src={[hero, shed, glass][i]} alt={`${b.name}, one of our buffaloes`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-medium">{b.name}</h3>
                  <p className="mt-2 text-muted-foreground">{b.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const steps = [
    { icon: BuffaloIcon, t: "Our Buffaloes", d: "Milk begins at our farm." },
    { icon: Droplet, t: "Fresh Collection", d: "Milk is collected carefully each morning." },
    { icon: Sparkles, t: "Quality & Hygiene", d: "Milk is handled hygienically in clean steel cans." },
    { icon: Package, t: "Packaging", d: "Prepared for household delivery." },
    { icon: Truck, t: "Home Delivery", d: "Delivered directly to your doorstep." },
  ];
  return (
    <section id="process" className="px-5 py-28 md:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHead center eyebrow="How it works" title="From Our Farm to Your Home" />
        <div ref={ref} className="relative">
          <div className="absolute top-0 left-6 h-full w-px bg-border md:left-1/2" />
          <motion.div style={{ height: h }} className="absolute top-0 left-6 w-px bg-accent md:left-1/2" />
          {steps.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} className={`relative mb-14 flex items-start gap-6 pl-16 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right md:flex-row-reverse"}`}>
              <div className={`absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border bg-background text-accent ${i % 2 ? "md:-left-6" : "md:left-auto md:-right-6"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-gold">0{i + 1}</p>
                <h3 className="mt-1 text-2xl font-medium">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Products({ onOrder }: { onOrder: (product?: string) => void }) {
  return (
    <section id="pricing" className="bg-cream px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Our milk" title="Fresh Buffalo Milk" sub="Choose the quantity that works for your family." />
        <div className="grid gap-5 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div className={`flex h-full flex-col rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft ${i === 2 ? "bg-primary text-primary-foreground" : "border bg-card"}`}>
                <p className={`text-sm ${i === 2 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{p.note}</p>
                <h3 className="mt-6 font-display text-6xl">{p.quantity}</h3>
                <p className="mt-2">{p.name}</p>
                <p className="mt-10 font-display text-4xl">₹{p.price}<span className="font-sans text-sm opacity-60"> / delivery</span></p>
                <Btn onClick={() => onOrder(p.id)} className={`mt-8 ${i === 2 ? "bg-milk text-primary hover:bg-milk/90" : ""}`}>Order Now</Btn>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Subscription({ onOrder }: { onOrder: (product?: string, freq?: string) => void }) {
  return (
    <section className="px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow="Subscriptions" title="Fresh Milk, Every Morning" sub="Set it once. Wake up to fresh milk at your door." />
        <div className="grid gap-5 md:grid-cols-3">
          {FREQUENCIES.map((f, i) => (
            <Reveal key={f.id} delay={i * 0.08}>
              <button onClick={() => onOrder(undefined, f.id)} className="group h-full w-full rounded-3xl border bg-card p-8 text-left transition-all hover:border-accent hover:shadow-soft">
                <h3 className="text-3xl font-medium">{f.title}</h3>
                <p className="mt-3 text-muted-foreground">{f.text}</p>
                <span className="mt-8 inline-block text-sm font-semibold text-accent group-hover:underline">Choose {f.title.toLowerCase()} →</span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center"><Btn onClick={() => onOrder()}>Start My Milk Subscription</Btn></div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-earth px-5 py-28 text-earth-foreground md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14"><p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Kind words</p>
          <h2 className="text-4xl font-medium md:text-5xl">Mornings, Made Better</h2></Reveal>
        {/* Sample reviews — replace with genuine customer reviews */}
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="h-full rounded-3xl border border-earth-foreground/15 p-8">
                <div className="flex gap-1 text-gold" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, s) => <Star key={s} className={`h-4 w-4 ${s < t.rating ? "fill-current" : "opacity-30"}`} />)}
                </div>
                <blockquote className="mt-6 font-display text-2xl leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm text-earth-foreground/70">{t.name} · {t.area}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-earth-foreground/50">Sample reviews shown for illustration.</p>
      </div>
    </section>
  );
}
