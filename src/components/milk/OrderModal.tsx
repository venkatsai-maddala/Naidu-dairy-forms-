import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, MapPin, MessageCircle } from "lucide-react";
import { DELIVERY_TIMES, FREQUENCIES, PRODUCTS, whatsappLink } from "@/data/site";
import { Btn } from "./ui";

export type OrderPreset = { product?: string | undefined; frequency?: string | undefined };
type Form = Record<"name" | "mobile" | "product" | "frequency" | "house" | "area" | "city" | "pincode" | "time" | "notes", string>;

const empty = (p: OrderPreset): Form => ({
  name: "", mobile: "", product: p.product ?? PRODUCTS[PRODUCTS.length - 1]!.id, frequency: p.frequency ?? "daily",
  house: "", area: "", city: "", pincode: "", time: DELIVERY_TIMES[0]!, notes: "",
});

function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name";
  if (!/^[6-9]\d{9}$/.test(f.mobile.replace(/\D/g, "").slice(-10)) || f.mobile.replace(/\D/g, "").length < 10) e.mobile = "Enter a valid 10-digit mobile number";
  if (!f.house.trim()) e.house = "Required";
  if (!f.area.trim()) e.area = "Required";
  if (!f.city.trim()) e.city = "Required";
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a 6-digit pincode";
  return e;
}

export function OrderModal({ open, preset, onClose }: { open: boolean; preset: OrderPreset; onClose: () => void }) {
  const [form, setForm] = useState<Form>(empty(preset));
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [done, setDone] = useState(false);

  useEffect(() => { if (open) { setForm(empty(preset)); setErrors({}); setDone(false); } }, [open, preset]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", k); };
  }, [open, onClose]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });
  const product = PRODUCTS.find((p) => p.id === form.product)!;
  const freq = FREQUENCIES.find((f) => f.id === form.frequency)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form); setErrors(errs);
    if (Object.keys(errs).length) return;
    // Demo storage — replace with a real backend when ready
    const orders = JSON.parse(localStorage.getItem("demo-orders") || "[]");
    localStorage.setItem("demo-orders", JSON.stringify([...orders, { ...form, createdAt: new Date().toISOString() }]));
    setDone(true);
  };

  const waMsg = `Hello, I would like to order fresh buffalo milk.\nName: ${form.name}\nProduct: ${product?.name}\nQuantity: ${product?.quantity}\nFrequency: ${freq?.title}\nArea: ${form.area}, ${form.city} ${form.pincode}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-earth/60 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="order-title" onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-background p-6 sm:rounded-3xl md:p-10">
            <button onClick={onClose} aria-label="Close" className="absolute top-5 right-5 rounded-full p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            {done ? (
              <div className="py-10 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
                  <CheckCircle2 className="h-10 w-10 text-accent" />
                </motion.div>
                <h2 id="order-title" className="text-4xl font-medium">Thank you, {form.name.split(" ")[0]}!</h2>
                <p className="mx-auto mt-4 max-w-sm text-muted-foreground">Your request for {product.quantity} ({freq.title.toLowerCase()}) is received. We'll call you to confirm your first delivery.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a href={whatsappLink(waMsg)} target="_blank" rel="noreferrer"><Btn variant="outline"><MessageCircle className="h-4 w-4" />Confirm on WhatsApp</Btn></a>
                  <Btn onClick={onClose}>Done</Btn>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 id="order-title" className="text-3xl font-medium md:text-4xl">Order Fresh Milk</h2>
                <p className="mt-2 text-muted-foreground">Tell us where to deliver. No payment needed now.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" error={errors.name}><input value={form.name} onChange={set("name")} autoComplete="name" /></Field>
                  <Field label="Mobile Number" error={errors.mobile}><input value={form.mobile} onChange={set("mobile")} inputMode="tel" autoComplete="tel" /></Field>
                  <Field label="Quantity"><select value={form.product} onChange={set("product")}>{PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.quantity} — ₹{p.price}</option>)}</select></Field>
                  <Field label="Delivery Frequency"><select value={form.frequency} onChange={set("frequency")}>{FREQUENCIES.map((f) => <option key={f.id} value={f.id}>{f.title}</option>)}</select></Field>
                  <Field label="House / Flat" error={errors.house}><input value={form.house} onChange={set("house")} /></Field>
                  <Field label="Area" error={errors.area}><input value={form.area} onChange={set("area")} /></Field>
                  <Field label="City" error={errors.city}><input value={form.city} onChange={set("city")} autoComplete="address-level2" /></Field>
                  <Field label="Pincode" error={errors.pincode}><input value={form.pincode} onChange={set("pincode")} inputMode="numeric" maxLength={6} /></Field>
                  <Field label="Preferred Delivery Time"><select value={form.time} onChange={set("time")}>{DELIVERY_TIMES.map((t) => <option key={t}>{t}</option>)}</select></Field>
                  <div className="flex flex-col justify-end">
                    {/* Hook Google Maps place picker here */}
                    <button type="button" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-dashed text-sm text-muted-foreground" title="Available once Google Maps is connected">
                      <MapPin className="h-4 w-4" /> Select Delivery Location
                    </button>
                  </div>
                  <Field label="Additional Notes" className="sm:col-span-2"><textarea rows={3} value={form.notes} onChange={set("notes")} /></Field>
                </div>
                <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t pt-6 sm:flex-row">
                  <p className="text-sm text-muted-foreground">Total per delivery: <span className="font-display text-2xl text-foreground">₹{product.price}</span></p>
                  <Btn type="submit" className="w-full sm:w-auto">Place Order</Btn>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, children, className }: { label: string; error?: string | undefined; children: React.ReactElement; className?: string }) {
  return (
    <label className={`block text-sm font-medium ${className ?? ""}`}>
      {label}
      <div className="mt-1.5 [&>*]:w-full [&>*]:rounded-xl [&>*]:border [&>*]:bg-card [&>*]:px-4 [&>*]:py-3 [&>*]:font-normal [&>*]:outline-none [&>*:focus]:border-accent">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive" role="alert">{error}</span>}
    </label>
  );
}
