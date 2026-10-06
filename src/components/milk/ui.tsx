import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent", className)}>{children}</p>
  );
}

export function SectionHead({ eyebrow, title, sub, center }: { eyebrow: string; title: ReactNode; sub?: string; center?: boolean }) {
  return (
    <Reveal className={cn("mb-14 max-w-2xl", center && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-4xl leading-[1.05] font-medium md:text-5xl">{title}</h2>
      {sub && <p className="mt-5 text-lg text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function Btn({
  children, variant = "primary", className, ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "light" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0",
        variant === "primary" && "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
        variant === "outline" && "border border-primary/25 text-primary hover:border-primary hover:bg-primary/5",
        variant === "light" && "border border-earth-foreground/40 text-earth-foreground hover:bg-earth-foreground/10",
        className,
      )}
    >
      {children}
    </button>
  );
}

export const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
