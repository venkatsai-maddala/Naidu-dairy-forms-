import { useState } from "react";
import { MapPin, LocateFixed, Search, CheckCircle2, XCircle } from "lucide-react";
import { DELIVERY_AREAS, GOOGLE_MAPS_API_KEY } from "@/data/site";
import { Btn, SectionHead, Reveal } from "./ui";

export function Delivery({ onOrder }: { onOrder: () => void }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<null | { ok: boolean; area?: string }>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const hit = DELIVERY_AREAS.find((a) => a.pincode === q || a.name.toLowerCase() === q);
    setResult(hit ? { ok: true, area: hit.name } : { ok: false });
  };

  return (
    <section id="delivery" className="px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Delivery" title="Is Our Milk Available Near You?" sub="Enter your location and check whether we deliver to your area." />
          <Reveal>
            <form onSubmit={check} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="loc" className="sr-only">Pincode or area</label>
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input id="loc" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter pincode or area"
                  className="h-12 w-full rounded-full border bg-card pr-4 pl-11 outline-none focus:border-accent" />
              </div>
              <Btn type="submit">Check</Btn>
            </form>
            <button type="button" onClick={() => setResult(null)} title="Available once Google Maps is connected" disabled={!GOOGLE_MAPS_API_KEY}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-60">
              <LocateFixed className="h-4 w-4" /> Use my current location {GOOGLE_MAPS_API_KEY ? "" : "(coming soon)"}
            </button>
            {result && (
              <div role="status" className={`mt-6 flex items-start gap-3 rounded-2xl p-5 ${result.ok ? "bg-accent/10" : "bg-muted"}`}>
                {result.ok ? <CheckCircle2 className="h-5 w-5 text-accent" /> : <XCircle className="h-5 w-5 text-muted-foreground" />}
                <div>
                  <p className="font-semibold">{result.ok ? `Yes! We deliver to ${result.area}.` : "We don't deliver there yet."}</p>
                  {result.ok ? <button onClick={onOrder} className="mt-1 text-sm font-semibold text-accent underline">Order now</button>
                    : <p className="text-sm text-muted-foreground">Message us — we're expanding to new areas.</p>}
                </div>
              </div>
            )}
            <h3 className="mt-14 text-2xl font-medium">Fresh Milk. Delivered Locally.</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {DELIVERY_AREAS.map((a) => (
                <li key={a.name} className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm"><MapPin className="h-3.5 w-3.5 text-accent" />{a.name} · {a.pincode}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal>
          {/* Google Maps container — mount the map here once GOOGLE_MAPS_API_KEY is set */}
          <div id="google-map" className="grain flex h-full min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed bg-cream p-10 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-soft"><MapPin className="h-7 w-7 text-accent" /></div>
            <h3 className="text-2xl font-medium">Google Maps Integration</h3>
            <p className="mt-3 max-w-xs text-muted-foreground">Add your Google Maps API key to activate location selection.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
