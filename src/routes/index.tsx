import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { Navbar } from "@/components/milk/Navbar";
import { Hero } from "@/components/milk/Hero";
import { MilkExperience } from "@/components/milk/MilkExperience";
import { WhyUs, FarmStory, Process, Products, Subscription, Testimonials } from "@/components/milk/Sections";
import { Delivery } from "@/components/milk/Delivery";
import { FAQ, Contact, FinalCTA, Footer, WhatsAppFloat } from "@/components/milk/Closing";
import { OrderModal, type OrderPreset } from "@/components/milk/OrderModal";

const TITLE = "Fresh Buffalo Milk | Farm-to-Home Milk Delivery";
const DESC = "Fresh buffalo milk delivered directly from our farm to your home. No added preservatives, limited daily supply, and convenient home delivery.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<OrderPreset>({});
  const order = useCallback((product?: string, frequency?: string) => { setPreset({ product, frequency }); setOpen(true); }, []);
  const plain = () => order();
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <Navbar onOrder={plain} />
      <main>
        <Hero onOrder={plain} />
        <MilkExperience />
        <WhyUs />
        <FarmStory />
        <Process />
        <Products onOrder={order} />
        <Subscription onOrder={order} />
        <Delivery onOrder={plain} />
        <Testimonials />
        <FAQ />
        <Contact />
        <FinalCTA onOrder={plain} />
      </main>
      <Footer />
      <WhatsAppFloat />
      <OrderModal open={open} preset={preset} onClose={close} />
    </>
  );
}
