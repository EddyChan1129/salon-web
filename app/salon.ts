export const salon = {
  name: "Nagi",
  description: "A Japanese-inspired hair atelier. Explore haircuts, colour and styling shaped around you.",
};

export const navigation = [
  { href: "/discover", label: "Discover" },
  { href: "/portfolio", label: "Lookbook" },
  { href: "/stylists", label: "Stylists" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/access", label: "Access" },
];

export const services = [
  { id: "cut", name: "Haircut", description: "A consultation, tailored cut and a finish you can recreate at home.", duration: 60, price: 580 },
  { id: "colour", name: "Hair Colour", description: "All-over colour with a tone selected for your hair and the way you wear it.", duration: 120, price: 980 },
  { id: "highlights", name: "Highlights", description: "Fine ribbons of light placed to bring out movement and texture.", duration: 150, price: 1380 },
  { id: "balayage", name: "Balayage", description: "Hand-painted colour with a soft transition as your hair grows.", duration: 180, price: 1680, consultation: true },
  { id: "perm", name: "Perm", description: "Custom waves that follow the natural movement of your hair.", duration: 150, price: 1380 },
  { id: "straightening", name: "Straightening", description: "A smoothing service tailored to your texture and condition.", duration: 180, price: 1580, consultation: true },
  { id: "hair-treatment", name: "Hair Treatment", description: "Conditioning care for hair that feels dry or fragile.", duration: 45, price: 480 },
  { id: "scalp-treatment", name: "Scalp Treatment", description: "A gentle cleanse and massage for the scalp.", duration: 45, price: 420 },
  { id: "styling", name: "Styling", description: "A wash and finish for everyday wear or a special occasion.", duration: 45, price: 380 },
];

export const stylists = [
  {
    id: "aki",
    name: "Aki",
    role: "Cut & colour",
    image: "/images/aki.webp",
    bio: "Aki is drawn to precise outlines, soft edges and colour that looks different as the light changes. Her consultations begin with how you wear your hair on an ordinary day.",
    philosophy: "A good cut should still feel like you when you style it yourself.",
    languages: "Japanese, English",
    services: ["cut", "colour", "highlights", "balayage", "hair-treatment", "styling"],
    adjustment: 100,
  },
  {
    id: "ren",
    name: "Ren",
    role: "Texture & shape",
    image: "/images/ren.webp",
    bio: "Ren works with the grain of the hair, looking for where a wave, parting or change in length can make the shape easier to live with.",
    philosophy: "Follow the direction the hair already wants to move.",
    languages: "Japanese, English",
    services: ["cut", "perm", "straightening", "scalp-treatment", "styling"],
    adjustment: 0,
  },
];

export const shapes = [
  { id: "oval", name: "Oval", description: "A slightly longer outline with a softly rounded jaw.", identify: "Your face is a little longer than it is wide, and your cheekbones are gently wider than your forehead and jaw.", styles: "Blunt bobs and soft layers both sit easily against a rounded outline.", lengths: "From chin-length to long, depending on how much movement you want.", fringe: "Try an airy full fringe or long curtain bangs.", tradeoff: "If you want to soften the length, a lot of volume at the crown can have the opposite effect." },
  { id: "round", name: "Round", description: "Soft curves, with similar width and length.", identify: "Your face length and width are similar, and the cheeks and jaw meet in a gentle curve.", styles: "Long layers, a side part or a lob that falls below the chin can bring out a more vertical line.", lengths: "Collarbone length and longer leave room for layers that start below the cheeks.", fringe: "Try curtain bangs or a light, side-swept fringe.", tradeoff: "If you want a longer outline, full volume at cheek level may emphasize width." },
  { id: "square", name: "Square", description: "A defined jaw, with a forehead of similar width.", identify: "Your forehead, cheekbones and jaw are similar in width. The corners of your jaw form a visible angle.", styles: "Soft waves and textured layers add movement around the jaw.", lengths: "A lob or longer layers give the ends room to fall past the jawline.", fringe: "Try longer curtain bangs or a softly angled side fringe.", tradeoff: "A straight edge ending at the jaw can emphasize its shape. That can also be the intention." },
  { id: "heart", name: "Heart", description: "A wider forehead that tapers towards the chin.", identify: "The forehead is the widest part of your face, and your jaw narrows towards a pointed chin.", styles: "Collarbone waves or a gently curved bob bring softness and movement near the chin.", lengths: "Jaw to collarbone length lets you play with fullness at the ends.", fringe: "A wispy fringe or a long side sweep can soften the brow line.", tradeoff: "If you want to balance a wider forehead, heavy volume near the temples draws the eye upwards." },
  { id: "diamond", name: "Diamond", description: "Prominent cheekbones with a narrower forehead and jaw.", identify: "Your cheekbones are the widest point, with the forehead and chin tapering away from them.", styles: "A textured bob or a low side part can draw attention to the eyes and jaw.", lengths: "Chin to shoulder length frames the cheekbones while leaving some weight at the ends.", fringe: "Try piecey bangs or a soft curtain fringe.", tradeoff: "Hair that sits very close to the temples can make the cheekbones appear more pronounced." },
  { id: "long", name: "Long / Oblong", description: "A longer outline with gently parallel sides.", identify: "Your face is noticeably longer than it is wide, with a similar width through the forehead and jaw.", styles: "A lob with waves through the sides adds width and movement around the cheeks.", lengths: "Chin to collarbone length is a good starting point for a fuller silhouette.", fringe: "A soft full fringe can shift focus to the eyes.", tradeoff: "Very long, straight hair without layers can accentuate the vertical line." },
];

export const works = [
  { id: "quiet-bob", name: "The Quiet Bob", image: "/images/quiet-bob.webp", length: "Short Hair", tags: ["Bob"], shapes: ["oval", "heart", "diamond"], stylist: "aki", service: "cut", description: "A clean, jaw-skimming line with the lightest graduation at the nape. The shape turns in slightly as it dries.", maintenance: "Dry from the roots down with a paddle brush. A trim every six to eight weeks keeps the outline neat." },
  { id: "soft-layers", name: "Soft Layers", image: "/images/soft-layers.webp", length: "Long Hair", tags: ["Layered Cut"], shapes: ["oval", "round", "square"], stylist: "aki", service: "cut", description: "Long, connected layers that fall away from the face and keep the ends full. The cut brings out the hair’s natural movement.", maintenance: "Rough-dry the roots, then twist the ends away from the face. Finish with a drop of light oil." },
  { id: "air-wave", name: "The Air Wave", image: "/images/air-wave.webp", length: "Medium Hair", tags: ["Perm"], shapes: ["square", "heart", "long"], stylist: "ren", service: "perm", description: "Loose collarbone waves with a light fringe. The curl is soft enough to grow out gradually.", maintenance: "Scrunch curl cream into damp hair and let it air-dry, or use a diffuser on low heat." },
  { id: "natural-part", name: "Natural Part", image: "/images/natural-part.webp", length: "Short Hair", tags: ["Men's Hairstyle"], shapes: ["oval", "diamond", "long"], stylist: "ren", service: "cut", description: "A gently tapered side part that keeps natural texture through the top.", maintenance: "Lift the roots with your fingertips while drying. Work a small amount of matte paste through the ends." },
  { id: "chestnut-lob", name: "Chestnut Lob", image: "/images/chestnut-lob.webp", length: "Medium Hair", tags: ["Bob", "Hair Colour"], shapes: ["round", "heart", "diamond"], stylist: "aki", service: "colour", description: "A collarbone bob with warm chestnut depth that catches the light along the ends.", maintenance: "Wash with colour-safe shampoo and use heat protection before styling." },
  { id: "ink-wave", name: "Ink Wave", image: "/images/ink-wave.webp", length: "Long Hair", tags: ["Perm", "Layered Cut"], shapes: ["oval", "round", "square"], stylist: "ren", service: "perm", description: "Airy waves through dark hair with a side fringe that blends into the first layer.", maintenance: "At night, gather dry hair into a loose braid and refresh the waves with water in the morning." },
];

export type Work = (typeof works)[number];
export type Service = (typeof services)[number];

export function bookingLink(selection: { service?: string; stylist?: string; look?: string } = {}) {
  const search = new URLSearchParams();
  if (selection.service) search.set("service", selection.service);
  if (selection.stylist) search.set("stylist", selection.stylist);
  if (selection.look) search.set("look", selection.look);
  return search.size ? `/booking?${search}` : "/booking";
}

export function priceLabel(price: number) {
  return `HK$${price.toLocaleString("en-HK")}`;
}
