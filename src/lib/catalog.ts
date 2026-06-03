export type Category = { slug: string; name: string; emoji: string; description: string };
export type Product = {
  id: string; name: string; slug: string; category: string;
  price: number; mrp: number; weight: string; rating: number; reviews: number;
  tag?: string; image: string; description: string; highlights: string[]; stock: number;
};

export const categories: Category[] = [
  { slug: "pongal-mixes", name: "Pongal Mixes", emoji: "🍚", description: "Ready-to-cook traditional pongal mixes." },
  { slug: "dosa-mixes", name: "Dosa Mixes", emoji: "🥞", description: "Healthy millet & traditional dosa mixes." },
  { slug: "idli-podi", name: "Idli Podi", emoji: "🌶️", description: "Aromatic podi varieties for idli & dosa." },
  { slug: "millet-flour", name: "Millet Flour", emoji: "🌾", description: "Stone-ground heritage millet flours." },
  { slug: "puttu-flour", name: "Puttu Flour", emoji: "🥥", description: "Soft, soaked & roasted puttu flours." },
  { slug: "health-mix", name: "Health Mix", emoji: "💪", description: "Sathu maavu & nutritive health mixes." },
  { slug: "pickles", name: "Pickles & Thokku", emoji: "🥒", description: "Sun-cured homemade pickles." },
  { slug: "masala-powders", name: "Masala Powders", emoji: "🌶️", description: "Hand-pounded masala powders." },
  { slug: "instant-mixes", name: "Instant Mixes", emoji: "⚡", description: "Quick & traditional instant mixes." },
  { slug: "kanji-mixes", name: "Kanji Mixes", emoji: "🥣", description: "Wholesome kanji & porridge mixes." },
  { slug: "herbal-powders", name: "Herbal Powders", emoji: "🌿", description: "Pure herbal wellness powders." },
  { slug: "beauty-care", name: "Beauty Care", emoji: "🌸", description: "Natural beauty care powders." },
];

const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

// Curated category-specific images from Unsplash
const categoryImages: Record<string, string[]> = {
  "pongal-mixes": [u("1631452180519-c014fe946bc7"), u("1589301760014-d929f3979dbc"), u("1567337710282-00832b415979"), u("1604908554007-2a1d31b2b50b")],
  "dosa-mixes": [u("1668236543090-82eba5ee5976"), u("1630383249896-424e482df921"), u("1610192244261-3f33de3f55e4"), u("1668236543071-c2c5dfbe6b9f")],
  "idli-podi": [u("1596797038530-2c107229654b"), u("1604908176997-125f25cc6f3d"), u("1599043513900-ed6fe01d3833"), u("1583562829062-f3fa1b754ec8")],
  "millet-flour": [u("1626078297997-30af66e1d56f"), u("1565692902-2a4f0bd9b03f"), u("1574323347407-f5e1ad6d020b"), u("1586201375761-83865001e31c")],
  "puttu-flour": [u("1565299585323-38d6b0865b47"), u("1601050690597-df0568f70950"), u("1626078297997-30af66e1d56f"), u("1565692902-2a4f0bd9b03f")],
  "health-mix": [u("1610725663727-08695a1ac3ff"), u("1505253213348-cd54c92b37cd"), u("1490818387583-1baba5e638af"), u("1611250188496-e966043a0629")],
  "pickles": [u("1599909533736-aaee2dcd9c12"), u("1589135233689-d5b5b1a4c95a"), u("1600628421066-f6bda6a7b976"), u("1599909366516-6c1d6ef9a4e8")],
  "masala-powders": [u("1532336414038-cf19250c5757"), u("1596040033229-a9821ebd058d"), u("1599909533736-aaee2dcd9c12"), u("1599043513900-ed6fe01d3833")],
  "instant-mixes": [u("1626078297997-30af66e1d56f"), u("1668236543090-82eba5ee5976"), u("1565299585323-38d6b0865b47"), u("1631452180519-c014fe946bc7")],
  "kanji-mixes": [u("1505253213348-cd54c92b37cd"), u("1610725663727-08695a1ac3ff"), u("1571115764595-644a1f56a55c"), u("1611250188496-e966043a0629")],
  "herbal-powders": [u("1611080626919-7cf5a9dbab5b"), u("1471943311424-646960669fbc"), u("1515envoie-uyfRH6E"), u("1556909114-f6e7ad7d3136")],
  "beauty-care": [u("1556228720-195a672e8a03"), u("1571781926291-c477ebfd024b"), u("1570194065650-d99fb4bedf0a"), u("1556228578-8c89e6adf883")],
};

const pickImage = (cat: string, i: number): string => {
  const arr = categoryImages[cat];
  if (!arr || arr.length === 0) return u("1490818387583-1baba5e638af");
  return arr[i % arr.length];
};

const make = (i: number, p: Omit<Product, "id" | "slug" | "image" | "rating" | "reviews" | "stock">): Product => ({
  id: `p-${i.toString().padStart(3, "0")}`,
  slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  image: pickImage(p.category, i),
  rating: 4.5 + ((i * 7) % 5) / 10,
  reviews: 30 + ((i * 19) % 250),
  stock: 10 + ((i * 3) % 90),
  ...p,
});

export const products: Product[] = [
  make(1, { name: "Classic Pongal Mix", category: "pongal-mixes", price: 180, mrp: 220, weight: "500g", tag: "Bestseller", description: "Traditional Tamil Nadu pongal mix with hand-pounded raw rice, moong dal, pepper, cumin and ghee-roasted cashews.", highlights: ["100% natural", "No preservatives", "Ready in 10 mins"] }),
  make(2, { name: "Sakkarai Pongal Mix", category: "pongal-mixes", price: 220, mrp: 260, weight: "500g", description: "Sweet pongal mix with jaggery, raw rice, moong dal and cardamom.", highlights: ["Jaggery sweetened", "Festival favourite"] }),
  make(3, { name: "Millet Pongal Mix", category: "pongal-mixes", price: 240, mrp: 290, weight: "500g", tag: "Healthy", description: "Pongal mix with kodo and little millet for a fibre-rich meal.", highlights: ["High fibre", "Diabetic friendly"] }),
  make(4, { name: "Ven Pongal Premium", category: "pongal-mixes", price: 260, mrp: 300, weight: "500g", description: "Premium pongal mix with cashews, pepper and jeera.", highlights: ["Premium grade", "Cashew loaded"] }),
  make(5, { name: "Ragi Dosa Mix", category: "dosa-mixes", price: 160, mrp: 200, weight: "500g", tag: "Healthy", description: "Stone-ground ragi dosa mix, ferments naturally for crisp dosas.", highlights: ["Iron-rich", "Kid friendly"] }),
  make(6, { name: "Kambu Dosa Mix", category: "dosa-mixes", price: 170, mrp: 210, weight: "500g", description: "Pearl millet dosa mix for hot summer mornings.", highlights: ["Cooling", "Traditional"] }),
  make(7, { name: "Adai Dosa Mix", category: "dosa-mixes", price: 190, mrp: 240, weight: "500g", description: "Protein-packed adai mix with 5 dals.", highlights: ["High protein", "Hearty"] }),
  make(8, { name: "Rava Dosa Mix", category: "dosa-mixes", price: 150, mrp: 180, weight: "500g", description: "Instant crisp rava dosa mix.", highlights: ["10-min recipe", "Crispy"] }),
  make(9, { name: "Original Idli Podi", category: "idli-podi", price: 140, mrp: 170, weight: "250g", tag: "Classic", description: "Hand-pounded idli podi with urad, channa, sesame and red chillies.", highlights: ["Stone-ground", "Aromatic"] }),
  make(10, { name: "Garlic Idli Podi", category: "idli-podi", price: 150, mrp: 180, weight: "250g", description: "Fragrant garlic podi for idli and dosa.", highlights: ["Garlicky", "Bold flavour"] }),
  make(11, { name: "Curry Leaf Podi", category: "idli-podi", price: 160, mrp: 190, weight: "250g", tag: "New", description: "Karuveppilai podi packed with goodness of curry leaves.", highlights: ["Curry leaf rich", "Hair friendly"] }),
  make(12, { name: "Flaxseed Podi", category: "idli-podi", price: 180, mrp: 220, weight: "250g", description: "Omega-3 rich flaxseed podi.", highlights: ["Omega-3", "Heart friendly"] }),
  make(13, { name: "Ragi Flour", category: "millet-flour", price: 120, mrp: 150, weight: "1kg", tag: "Bestseller", description: "Stone-ground ragi flour from native finger millet.", highlights: ["Stone ground", "Iron rich"] }),
  make(14, { name: "Kambu Flour", category: "millet-flour", price: 130, mrp: 160, weight: "1kg", description: "Pearl millet flour, perfect for koozh and rotis.", highlights: ["Cooling", "Wholesome"] }),
  make(15, { name: "Kodo Millet Flour", category: "millet-flour", price: 180, mrp: 220, weight: "1kg", description: "Varagu flour rich in antioxidants.", highlights: ["Antioxidant", "Gluten free"] }),
  make(16, { name: "Foxtail Millet Flour", category: "millet-flour", price: 190, mrp: 230, weight: "1kg", description: "Thinai flour for traditional recipes.", highlights: ["High fibre", "Diabetic friendly"] }),
  make(17, { name: "Rice Puttu Flour", category: "puttu-flour", price: 110, mrp: 140, weight: "1kg", description: "Soft, roasted rice puttu flour.", highlights: ["Soft", "Ready to steam"] }),
  make(18, { name: "Ragi Puttu Flour", category: "puttu-flour", price: 130, mrp: 160, weight: "1kg", description: "Ragi-based puttu flour.", highlights: ["Healthy", "Roasted"] }),
  make(19, { name: "Sathu Maavu Health Mix", category: "health-mix", price: 280, mrp: 350, weight: "500g", tag: "Bestseller", description: "Multigrain Sathu Maavu with 18 ingredients including millets, pulses, nuts and dry fruits.", highlights: ["18 ingredients", "Kids and adults"] }),
  make(20, { name: "Kids Nutri Mix", category: "health-mix", price: 320, mrp: 380, weight: "500g", description: "Special blend for growing kids.", highlights: ["Calcium rich", "Tasty"] }),
  make(21, { name: "Avakkai Pickle", category: "pickles", price: 220, mrp: 260, weight: "250g", tag: "Hot", description: "Traditional spicy mango pickle aged in earthen pots.", highlights: ["Sun-cured", "Earthen pot aged"] }),
  make(22, { name: "Citron Pickle", category: "pickles", price: 240, mrp: 280, weight: "250g", description: "Narthangai pickle, tangy and medicinal.", highlights: ["Digestive", "Tangy"] }),
  make(23, { name: "Pirandai Thokku", category: "pickles", price: 260, mrp: 310, weight: "250g", tag: "Herbal", description: "Bone-strengthening pirandai thokku.", highlights: ["Herbal", "Bone health"] }),
  make(24, { name: "Biriyani Masala", category: "masala-powders", price: 180, mrp: 220, weight: "200g", tag: "Bestseller", description: "Aromatic biriyani masala with 21 spices.", highlights: ["21 spices", "Aromatic"] }),
  make(25, { name: "Chicken Masala", category: "masala-powders", price: 160, mrp: 200, weight: "200g", description: "Spicy chicken masala for restaurant taste.", highlights: ["Bold", "Spicy"] }),
  make(26, { name: "Sambar Powder", category: "masala-powders", price: 140, mrp: 170, weight: "250g", tag: "Classic", description: "Hand-pounded authentic sambar powder.", highlights: ["Authentic", "Daily use"] }),
  make(27, { name: "Rasam Powder", category: "masala-powders", price: 140, mrp: 170, weight: "250g", description: "Tangy rasam powder for instant rasam.", highlights: ["Aromatic", "Digestive"] }),
  make(28, { name: "Instant Upma Mix", category: "instant-mixes", price: 130, mrp: 160, weight: "300g", description: "Quick upma in 5 minutes.", highlights: ["5 min recipe", "Tasty"] }),
  make(29, { name: "Instant Idiyappam Mix", category: "instant-mixes", price: 140, mrp: 170, weight: "500g", description: "Soft idiyappam in minutes.", highlights: ["Soft", "Easy"] }),
  make(30, { name: "Ragi Kanji Mix", category: "kanji-mixes", price: 180, mrp: 220, weight: "500g", description: "Cooling ragi kanji mix.", highlights: ["Cooling", "Energising"] }),
  make(31, { name: "Kambu Kanji Mix", category: "kanji-mixes", price: 180, mrp: 220, weight: "500g", description: "Pearl millet kanji mix.", highlights: ["Hydrating", "Summer drink"] }),
  make(32, { name: "Moringa Leaf Powder", category: "herbal-powders", price: 280, mrp: 350, weight: "200g", tag: "Herbal", description: "Pure shade-dried moringa leaf powder.", highlights: ["Iron rich", "Immunity"] }),
  make(33, { name: "Vallarai Powder", category: "herbal-powders", price: 320, mrp: 380, weight: "100g", description: "Brain tonic vallarai (brahmi) powder.", highlights: ["Brain tonic", "Memory"] }),
  make(34, { name: "Herbal Bath Powder", category: "beauty-care", price: 240, mrp: 300, weight: "200g", tag: "New", description: "Traditional herbal bath powder with vetiver and green gram.", highlights: ["Glowing skin", "Natural"] }),
  make(35, { name: "Hair Wash Powder", category: "beauty-care", price: 260, mrp: 320, weight: "200g", description: "Shikakai-based hair wash powder.", highlights: ["Shikakai", "Hair growth"] }),
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const categoryCount = (slug: string) => productsByCategory(slug).length;
export const bestsellers = products.filter((p) => p.tag === "Bestseller");
