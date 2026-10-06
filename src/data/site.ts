// ================================================================
// Business configuration — edit everything here, not in components.
// ================================================================

export const BRAND = {
  name: "Naidu Dairy Forms", // Replace with your actual brand name
  tagline: "Fresh Buffalo Milk",
  phone: "+91 6303490245", // Replace with real phone
  email: "hello@yourfarm.in", // Replace with real email
  farmLocation: "Your farm address, City", // Replace with real address
};

// Replace with your WhatsApp number in international format, digits only (e.g. "919876543210")
export const WHATSAPP_NUMBER = "916303490245";

// Leave empty until you have a key. When set, the map container can load Google Maps.
export const GOOGLE_MAPS_API_KEY = "";

export type Product = { id: string; name: string; quantity: string; price: number; note: string };

// All prices live here only.
export const PRODUCTS: Product[] = [
  { id: "500ml", name: "500 ML Buffalo Milk", quantity: "500 ML", price: 50, note: "For small households" },
  { id: "750ml", name: "750 ML Buffalo Milk", quantity: "750 ML", price: 75, note: "Most chosen by couples" },
  { id: "1l", name: "1 Litre Buffalo Milk", quantity: "1 L", price: 100, note: "For families & chai lovers" },
];

export const FREQUENCIES = [
  { id: "daily", title: "Daily", text: "Fresh milk delivered every morning." },
  { id: "weekly", title: "Weekly", text: "Flexible weekly delivery on days you choose." },
  { id: "monthly", title: "Monthly", text: "A household subscription for the whole month." },
];

export const DELIVERY_TIMES = ["5:30 – 6:30 AM", "6:30 – 7:30 AM", "7:30 – 8:30 AM", "Evening (5 – 7 PM)"];

// Replace with actual delivery areas
export const DELIVERY_AREAS = [
  { name: "Area 01", pincode: "000001" },
  { name: "Area 02", pincode: "000002" },
  { name: "Area 03", pincode: "000003" },
  { name: "Area 04", pincode: "000004" },
];

// Placeholder reviews — replace with genuine customer reviews.
export const TESTIMONIALS = [
  { quote: "The milk arrives fresh every morning and the ordering process is very simple.", name: "Customer A", area: "Area 01", rating: 5 },
  { quote: "Thick, creamy milk — our morning chai has never tasted better.", name: "Customer B", area: "Area 02", rating: 5 },
  { quote: "Reliable delivery and easy to pause when we travel.", name: "Customer C", area: "Area 03", rating: 4 },
];

export const FAQS = [
  { q: "Is this buffalo milk?", a: "Yes. The product is fresh buffalo milk from our own buffaloes." },
  { q: "Do you add preservatives?", a: "We do not add preservative powders to the milk." },
  { q: "How often is the milk delivered?", a: "You can choose daily, weekly, or monthly delivery options." },
  { q: "Do you deliver to my area?", a: "Use the delivery-area checker on this page to see if we deliver to your pincode." },
  { q: "How can I place an order?", a: "Order through this website, or message us on WhatsApp or by phone." },
  // Update to match your business policy
  { q: "Can I cancel my subscription?", a: "Yes. Contact us before the next delivery cycle to pause or cancel your subscription." },
];

// Placeholder buffalo profiles — replace with your own.
export const BUFFALOES = [
  { name: "Lakshmi", text: "The calmest of the herd, first to the feed trough every morning." },
  { name: "Ganga", text: "Loves the shade of the neem tree near the shed." },
  { name: "Kaveri", text: "Curious and gentle — always greets visitors at the gate." },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
