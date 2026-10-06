import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-buffalo.jpg";
import { Btn, scrollTo } from "./ui";

export function Hero({ onOrder }: { onOrder: () => void }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 160]);
  const ticker = "Fresh every day • Limited daily supply • Home delivery • No added preservatives • ";

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-earth text-earth-foreground">
      <motion.img style={{ y }} src={hero} alt="Indian buffalo standing in a green field at sunrise" width={1600} height={1024} fetchPriority="high"
        className="absolute inset-0 h-[115%] w-full object-cover object-[30%_center]" />
      <div className="absolute inset-0 bg-gradient-to-r from-earth/90 via-earth/55 to-earth/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-earth via-transparent to-earth/30" />
      {/* floating milk particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="animate-float-up absolute h-1.5 w-1.5 rounded-full bg-milk/70 blur-[1px]"
            style={{ left: `${(i * 53) % 100}%`, bottom: `${10 + ((i * 37) % 40)}%`, animationDelay: `${i * 0.45}s` }} />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pt-28 pb-16 md:px-8">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-earth-foreground/25 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-earth-foreground/85">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Farm-to-home • Collected this morning
          </motion.p>
          <h1 className="text-5xl leading-[0.95] font-medium sm:text-6xl md:text-7xl lg:text-8xl">
            {["Pure Buffalo Milk.", "Nothing Extra."].map((line, i) => (
              <motion.span key={line} className={i ? "block italic text-gold" : "block"} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-7 max-w-lg text-lg text-earth-foreground/80">
            Fresh milk from our buffaloes, collected daily and delivered directly to your home.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10 flex flex-wrap gap-3">
            <Btn onClick={onOrder} className="bg-milk text-primary hover:bg-milk/90">Order Fresh Milk <ArrowRight className="h-4 w-4" /></Btn>
            <Btn variant="light" onClick={() => scrollTo("farm")}>Explore Our Farm</Btn>
          </motion.div>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-earth-foreground/15 py-4">
        <div className="animate-marquee flex w-max whitespace-nowrap font-display text-lg italic text-earth-foreground/70">
          <span>{ticker.repeat(4)}</span><span aria-hidden>{ticker.repeat(4)}</span>
        </div>
      </div>
    </section>
  );
}
