import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import buffalo from "@/assets/farm-shed.jpg";
import { Eyebrow } from "./ui";

const STEPS = ["Buffalo", "Fresh Milk", "Glass", "Home"];

export function MilkExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useTransform(p, [0.05, 0.6], reduce ? ["85%", "85%"] : ["0%", "85%"]);
  const stream = useTransform(p, [0, 0.05, 0.55, 0.65], [0, 1, 1, 0]);
  const rotate = useTransform(p, [0.6, 1], reduce ? [0, 0] : [0, -8]);
  const glassRadius = useTransform(p, [0.75, 1], ["0 0 28px 28px", "40px 40px 28px 28px"]);
  const neck = useTransform(p, [0.75, 1], [0, 1]);
  const bgOpacity = useTransform(p, [0, 0.3], [0.15, 0.4]);
  const shine = useTransform(p, [0, 1], ["-60%", "160%"]);
  const stepIdx = useTransform(p, [0, 1], [0, 3.99]);

  return (
    <section id="milk" ref={ref} className="relative h-[260vh] bg-earth text-earth-foreground">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.img style={{ opacity: bgOpacity }} src={buffalo} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale-[30%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-earth via-earth/60 to-earth" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-2 md:px-8">
          <div>
            <Eyebrow className="text-gold">The journey</Eyebrow>
            <h2 className="text-4xl leading-[1.05] font-medium md:text-6xl">See Where Your Milk Comes From</h2>
            <ol className="mt-10 space-y-4">
              {STEPS.map((s, i) => <Step key={s} label={s} i={i} idx={stepIdx} />)}
            </ol>
          </div>
          <div className="relative mx-auto flex h-[420px] w-56 items-end justify-center md:h-[520px]">
            {/* pour stream */}
            <motion.div style={{ opacity: stream }} className="absolute top-0 left-1/2 h-[55%] w-3 -translate-x-1/2 rounded-full bg-gradient-to-b from-milk/40 via-milk to-milk" />
            <motion.div style={{ rotate }} className="relative h-72 w-44 md:h-80 md:w-48">
              <motion.div style={{ opacity: neck }} className="absolute -top-14 left-1/2 h-14 w-16 -translate-x-1/2 rounded-t-lg border-2 border-b-0 border-milk/50 bg-milk/5" />
              <motion.div style={{ borderRadius: glassRadius }} className="relative h-full w-full overflow-hidden border-2 border-milk/50 bg-milk/5 backdrop-blur-sm">
                <motion.div style={{ height: fill }} className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-milk to-cream">
                  <div className="animate-wave absolute -top-3 left-0 h-6 w-[200%] rounded-[50%] bg-milk" />
                </motion.div>
                <motion.div style={{ left: shine }} className="absolute top-0 h-full w-10 -skew-x-12 bg-milk/30 blur-md" />
              </motion.div>
            </motion.div>
            <div className="absolute -bottom-4 h-6 w-52 rounded-[50%] bg-earth/80 blur-md" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ label, i, idx }: { label: string; i: number; idx: MotionValue<number> }) {
  const opacity = useTransform(idx, (v) => (Math.floor(v) >= i ? 1 : 0.3));
  const x = useTransform(idx, (v) => (Math.floor(v) === i ? 12 : 0));
  return (
    <motion.li style={{ opacity, x }} className="flex items-center gap-4 font-display text-2xl md:text-3xl">
      <span className="font-sans text-xs tracking-widest text-gold">0{i + 1}</span>{label}
    </motion.li>
  );
}
