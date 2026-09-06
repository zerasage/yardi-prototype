/**
 * Seed data — PRD §16.2.
 *
 * Every vendor, market, stall number and price band here is intended to read as
 * real to a Nigerian fabric buyer. Price bands follow the 2026 table in the PRD.
 * Nothing in this file may say "Product 1".
 */

import type {
  BulkRequest,
  Design,
  FabricType,
  Grade,
  Listing,
  Market,
  Order,
  QualityRecord,
  Reel,
  Review,
  Thread,
  Vendor,
} from "./types";

const k = (naira: number) => naira * 100; // → kobo

/* -------------------------------------------------------------------------- */
/* Markets                                                                     */
/* -------------------------------------------------------------------------- */

export const MARKETS: Market[] = [
  {
    id: "kantin-kwari",
    name: "Kantin Kwari",
    city: "Kano",
    blurb: "The largest textile market in Africa",
    vendorCount: 128,
  },
  {
    id: "balogun",
    name: "Balogun",
    city: "Lagos",
    blurb: "Lagos Island, where the lace lands first",
    vendorCount: 86,
  },
  {
    id: "wuse",
    name: "Wuse Market",
    city: "Abuja",
    blurb: "Abuja's bridal and occasion fabric run",
    vendorCount: 54,
  },
  {
    id: "onitsha-main",
    name: "Onitsha Main",
    city: "Onitsha",
    blurb: "George, velvet and the East's wedding trade",
    vendorCount: 31,
  },
  {
    id: "ariaria",
    name: "Ariaria",
    city: "Aba",
    blurb: "Aba's tailoring engine, buying by the bale",
    vendorCount: 13,
  },
];

/* -------------------------------------------------------------------------- */
/* Fabric types — the numbered editorial index on Home (PRD §12A.2)            */
/* -------------------------------------------------------------------------- */

export const FABRIC_TYPES: FabricType[] = [
  {
    id: "ankara",
    name: "Ankara",
    nameHa: "Atamfa",
    index: "01",
    blurb: "Wax print, from fancy to Super Wax",
    subTypes: ["Fancy print", "African wax", "Wax hollandais", "Super Wax"],
  },
  {
    id: "lace",
    name: "Lace",
    nameHa: "Leshi",
    index: "02",
    blurb: "French, cord, sequined, tulle",
    subTypes: ["French lace", "Cord lace", "Sequined lace", "Tulle lace", "Guipure"],
  },
  {
    id: "aso-oke",
    name: "Aso-oke",
    nameHa: "Aso-oke",
    index: "03",
    blurb: "Handwoven strips, sold by the set",
    subTypes: ["Sanyan", "Etu", "Alaari", "Contemporary"],
  },
  {
    id: "adire",
    name: "Adire & Indigo",
    nameHa: "Adire",
    index: "04",
    blurb: "Kofar Mata indigo and resist dye",
    subTypes: ["Kofar Mata indigo", "Eleko", "Oniko", "Batik"],
  },
  {
    id: "shadda",
    name: "Shadda",
    nameHa: "Shadda",
    index: "05",
    blurb: "Guinea brocade, the North's own cloth",
    subTypes: ["Getzner", "Atiku", "Guinea brocade", "Jacquard"],
  },
  {
    id: "george",
    name: "George",
    nameHa: "George",
    index: "06",
    blurb: "Beaded and stoned, for the East",
    subTypes: ["Indian George", "Intorica", "Silk George", "Velvet George"],
  },
  {
    id: "senator",
    name: "Senator",
    nameHa: "Senator",
    index: "07",
    blurb: "Cashmere weight, for kaftan and suits",
    subTypes: ["Cashmere", "Italian senator", "Turkish senator"],
  },
  {
    id: "brocade",
    name: "Brocade",
    nameHa: "Brocade",
    index: "08",
    blurb: "Damask weave, everyday and occasion",
    subTypes: ["Cotton brocade", "Silk brocade", "Embossed"],
  },
  {
    id: "chiffon",
    name: "Chiffon & Silk",
    nameHa: "Chiffon",
    index: "09",
    blurb: "Light, flowing, for overlays",
    subTypes: ["Silk chiffon", "Crepe", "Satin", "Organza"],
  },
  {
    id: "veil",
    name: "Veil & Hijab",
    nameHa: "Mayafi",
    index: "10",
    blurb: "Chiffon, jersey and embellished",
    subTypes: ["Chiffon veil", "Jersey", "Bubble", "Embellished"],
  },
];

export const fabricType = (id: string) =>
  FABRIC_TYPES.find((f) => f.id === id) ?? FABRIC_TYPES[0];

/* -------------------------------------------------------------------------- */
/* Vendors                                                                     */
/* -------------------------------------------------------------------------- */

export const VENDORS: Vendor[] = [
  {
    id: "v-sani",
    shopName: "Alhaji Sani Textiles",
    ownerName: "Sani Abdullahi",
    market: "kantin-kwari",
    stallNo: "Shop B-114",
    city: "Kano",
    joined: "2026-01-14",
    rating: 4.9,
    ordersCompleted: 247,
    responseMins: 12,
    onTimePct: 96,
    verifications: ["ID verified", "Bank verified", "Stall verified"],
    languages: ["Hausa", "English"],
    bio: "Three stalls on the Kwari line since 2015. Wax hollandais and Super Wax, sold by the yard or the bale. My sons handle the phone; I handle the cloth.",
    subscription: "verified-plus",
  },
  {
    id: "v-hauwa",
    shopName: "Hauwa Atamfa House",
    ownerName: "Hauwa Yusuf",
    market: "kantin-kwari",
    stallNo: "Shop D-27",
    city: "Kano",
    joined: "2026-02-02",
    rating: 4.8,
    ordersCompleted: 163,
    responseMins: 8,
    onTimePct: 94,
    verifications: ["ID verified", "Bank verified", "Stall verified"],
    languages: ["Hausa", "English", "Pidgin"],
    bio: "Atamfa in every colour you can name. If I don't have it on the shelf, I know the woman who does.",
    subscription: "verified-plus",
  },
  {
    id: "v-kofar",
    shopName: "Kofar Mata Indigo Works",
    ownerName: "Musa Garba",
    market: "kantin-kwari",
    stallNo: "Dye pit 7",
    city: "Kano",
    joined: "2026-01-28",
    rating: 5.0,
    ordersCompleted: 74,
    responseMins: 34,
    onTimePct: 98,
    verifications: ["ID verified", "Bank verified", "Craft verified"],
    languages: ["Hausa", "English"],
    bio: "We dye in the same pits our grandfathers dug. Natural indigo, ash and potash. Nothing else goes in the water.",
  },
  {
    id: "v-adaeze",
    shopName: "Adaeze Fabrics",
    ownerName: "Adaeze Okonkwo",
    market: "balogun",
    stallNo: "Line 4, Shop 22",
    city: "Lagos",
    joined: "2026-01-19",
    rating: 4.7,
    ordersCompleted: 312,
    responseMins: 6,
    onTimePct: 91,
    verifications: ["ID verified", "Bank verified", "Stall verified"],
    languages: ["English", "Igbo", "Pidgin"],
    bio: "French lace straight off the container. I don't sell what I haven't touched.",
    subscription: "verified-plus",
  },
  {
    id: "v-blessing",
    shopName: "Blessing's Lace Plug",
    ownerName: "Blessing Eze",
    market: "wuse",
    stallNo: "Block C, 41",
    city: "Abuja",
    joined: "2026-02-11",
    rating: 4.6,
    ordersCompleted: 88,
    responseMins: 4,
    onTimePct: 89,
    verifications: ["ID verified", "Bank verified"],
    languages: ["English", "Pidgin"],
    bio: "11,400 people follow me for a reason. Cord lace, sequined lace, and I go live every Thursday.",
  },
  {
    id: "v-umar",
    shopName: "Umar & Sons Shadda",
    ownerName: "Umar Bello",
    market: "kantin-kwari",
    stallNo: "Shop A-9",
    city: "Kano",
    joined: "2025-12-30",
    rating: 4.9,
    ordersCompleted: 201,
    responseMins: 17,
    onTimePct: 97,
    verifications: ["ID verified", "Bank verified", "Stall verified"],
    languages: ["Hausa", "English", "Arabic"],
    bio: "Getzner and Atiku shadda. Governors buy from this shop. So can you.",
    subscription: "verified-plus",
  },
  {
    id: "v-zainab",
    shopName: "Zainab Bridal Lace",
    ownerName: "Zainab Mohammed",
    market: "wuse",
    stallNo: "Block A, 08",
    city: "Abuja",
    joined: "2026-03-04",
    rating: 4.8,
    ordersCompleted: 59,
    responseMins: 9,
    onTimePct: 93,
    verifications: ["ID verified", "Bank verified"],
    languages: ["Hausa", "English"],
    bio: "Bridal only. If it is not good enough for a bride, it does not enter my shop.",
  },
  {
    id: "v-emeka",
    shopName: "Chukwuemeka George Palace",
    ownerName: "Chukwuemeka Nwosu",
    market: "onitsha-main",
    stallNo: "Shed 12, 106",
    city: "Onitsha",
    joined: "2026-01-08",
    rating: 4.7,
    ordersCompleted: 144,
    responseMins: 21,
    onTimePct: 90,
    verifications: ["ID verified", "Bank verified", "Stall verified"],
    languages: ["Igbo", "English"],
    bio: "Intorica and Indian George. Beaded, stoned, or plain. Wedding season is my season.",
  },
  {
    id: "v-aisha",
    shopName: "Aisha Veil & Atamfa",
    ownerName: "Aisha Lawal",
    market: "kantin-kwari",
    stallNo: "Shop F-3",
    city: "Kano",
    joined: "2026-02-20",
    rating: 4.9,
    ordersCompleted: 97,
    responseMins: 11,
    onTimePct: 95,
    verifications: ["ID verified", "Bank verified", "Stall verified"],
    languages: ["Hausa", "English"],
    bio: "Mayafi, hijab jersey and matching atamfa. Sets that already agree with each other.",
  },
  {
    id: "v-yemi",
    shopName: "Yemi Aso-Oke Weavers",
    ownerName: "Yemi Adeyemi",
    market: "balogun",
    stallNo: "Line 9, Shop 3",
    city: "Lagos",
    joined: "2026-01-25",
    rating: 5.0,
    ordersCompleted: 112,
    responseMins: 28,
    onTimePct: 99,
    verifications: ["ID verified", "Bank verified", "Craft verified"],
    languages: ["Yoruba", "English"],
    bio: "Nine looms in Iseyin, one shop in Balogun. Sanyan, etu, alaari — woven to your set, not cut from stock.",
  },
  {
    id: "v-ngozi",
    shopName: "Ngozi Bridal Fabrics",
    ownerName: "Ngozi Chukwu",
    market: "ariaria",
    stallNo: "Zone 3, 77",
    city: "Aba",
    joined: "2026-03-16",
    rating: 4.4,
    ordersCompleted: 41,
    responseMins: 19,
    onTimePct: 86,
    verifications: ["ID verified", "Bank verified"],
    languages: ["Igbo", "English", "Pidgin"],
    bio: "Aba prices, Lagos quality. Bulk is what I do best.",
  },
  {
    id: "v-folake",
    shopName: "Folake Adire Studio",
    ownerName: "Folake Bakare",
    market: "balogun",
    stallNo: "Line 2, Shop 14",
    city: "Lagos",
    joined: "2026-02-27",
    rating: 4.8,
    ordersCompleted: 66,
    responseMins: 15,
    onTimePct: 92,
    verifications: ["ID verified", "Bank verified", "Craft verified"],
    languages: ["Yoruba", "English"],
    bio: "Hand-tied adire, eleko and oniko. Every piece is slightly different, and that is the point.",
  },
];

export const vendor = (id: string) => VENDORS.find((v) => v.id === id) ?? VENDORS[0];
export const marketOf = (id: string) => MARKETS.find((m) => m.id === id) ?? MARKETS[0];

/* -------------------------------------------------------------------------- */
/* Grade helper — weights match the PRD §8/A3 rules engine                     */
/* -------------------------------------------------------------------------- */

function makeGrade(score: number, verifiedAt: string, status: Grade["status"] = "verified"): Grade {
  const letter: Grade["letter"] =
    score >= 85 ? "A" : score >= 70 ? "B" : score >= 55 ? "C" : "D";
  return {
    letter,
    score,
    status,
    verifiedAt,
    components: [
      { label: "Measured vs declared", weight: 35, scored: Math.round(score * 0.35) },
      { label: "Market tier authentication", weight: 20, scored: Math.round(score * 0.2) },
      { label: "Buyer confirmations", weight: 25, scored: Math.round(score * 0.25) },
      { label: "Vendor track record", weight: 15, scored: Math.round(score * 0.15) },
      { label: "Spot checks", weight: 5, scored: Math.round(score * 0.05) },
    ],
  };
}

function q(partial: Partial<QualityRecord> & Pick<QualityRecord, "fibre" | "gsm" | "weaveTpi" | "marketTier">): QualityRecord {
  return {
    tpiConfidence: "high",
    colourfastness: "Tested — no bleed after first wash",
    selvedgeVerified: true,
    bothFacesIdentical: true,
    capturedAt: "2026-08-22",
    buyerConfirmations: 47,
    spotChecks: 3,
    ...partial,
  };
}

/* -------------------------------------------------------------------------- */
/* Listings                                                                    */
/* -------------------------------------------------------------------------- */

const C = {
  wine: { name: "Wine", hex: "#6E1B2E", accent: "#C9A227" },
  royal: { name: "Royal blue", hex: "#1B3A8C", accent: "#E8C86A" },
  indigo: { name: "Indigo", hex: "#1B2A6B", accent: "#DCE3F2" },
  emerald: { name: "Emerald", hex: "#0F5C43", accent: "#D9A441" },
  gold: { name: "Gold", hex: "#B8862B", accent: "#3A2B10" },
  coral: { name: "Coral", hex: "#C4462D", accent: "#F2D7B6" },
  cream: { name: "Cream", hex: "#E8DCC3", accent: "#8A6B3A" },
  black: { name: "Onyx", hex: "#1E1B18", accent: "#C9A227" },
  fuchsia: { name: "Fuchsia", hex: "#8E2A62", accent: "#F0C9DC" },
  sky: { name: "Sky", hex: "#3E7CB1", accent: "#F4E7C5" },
  rust: { name: "Rust", hex: "#9C4C21", accent: "#EBD3A9" },
  olive: { name: "Olive", hex: "#5A5A2B", accent: "#DCCB94" },
};

export const LISTINGS: Listing[] = [
  {
    id: "l-001",
    vendorId: "v-adaeze",
    title: "French cord lace, heavy guipure",
    fabricType: "lace",
    subType: "Cord lace",
    description:
      "Genuine Austrian cord on a soft net. Heavy enough to hold a structured sleeve without lining. Sold in 5-yard sets; I can cut down if you ask.",
    pricePerYard: k(62000),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(62000) },
      { minYards: 6, maxYards: 11, pricePerYard: k(58500) },
      { minYards: 12, maxYards: null, pricePerYard: k(54000) },
    ],
    minOrderYards: 2,
    stockYards: 96,
    widthIn: 52,
    colourways: [C.wine, C.royal, C.gold, C.black],
    city: "Lagos",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: true,
    views: 3140,
    saves: 218,
    quality: q({
      fibre: "Nylon-viscose cord on polyester net",
      gsm: 240,
      weaveTpi: 88,
      marketTier: "Grade 1 cord lace",
      buyerConfirmations: 61,
    }),
    grade: makeGrade(91, "2026-08-22"),
  },
  {
    id: "l-002",
    vendorId: "v-sani",
    title: "Wax hollandais, six-yard bundle",
    fabricType: "ankara",
    subType: "Wax hollandais",
    description:
      "Selvedge stamped, print identical on both faces, proper crackle. This is not fancy print and I will not sell it as such.",
    pricePerYard: k(18500),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(18500) },
      { minYards: 6, maxYards: 11, pricePerYard: k(17200) },
      { minYards: 12, maxYards: null, pricePerYard: k(15900) },
    ],
    minOrderYards: 1,
    stockYards: 48,
    widthIn: 46,
    colourways: [C.emerald, C.coral, C.royal, C.gold],
    city: "Kano",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: true,
    views: 5820,
    saves: 402,
    quality: q({
      fibre: "100% cotton",
      gsm: 128,
      weaveTpi: 92,
      marketTier: "Wax Hollandais",
      buyerConfirmations: 47,
    }),
    grade: makeGrade(88, "2026-08-22"),
  },
  {
    id: "l-003",
    vendorId: "v-kofar",
    title: "Kofar Mata indigo, hand-tied",
    fabricType: "adire",
    subType: "Kofar Mata indigo",
    description:
      "Dyed in pit 7, five dips. The 'three basket' pattern — wealth, power, education. Colour deepens for the first month, then holds.",
    pricePerYard: k(14500),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(14500) },
      { minYards: 6, maxYards: 11, pricePerYard: k(13200) },
      { minYards: 12, maxYards: null, pricePerYard: k(11800) },
    ],
    minOrderYards: 2,
    stockYards: 34,
    widthIn: 44,
    colourways: [C.indigo],
    city: "Kano",
    cutOptions: ["continuous"],
    hasDrapeVideo: true,
    views: 2210,
    saves: 331,
    quality: q({
      fibre: "100% handwoven cotton",
      gsm: 165,
      weaveTpi: 64,
      tpiConfidence: "medium",
      marketTier: "Natural indigo, hand resist",
      colourfastness: "Crocks lightly for first 2 washes — wash separately",
      buyerConfirmations: 29,
    }),
    grade: makeGrade(86, "2026-08-19"),
  },
  {
    id: "l-004",
    vendorId: "v-umar",
    title: "Getzner shadda, Atiku weight",
    fabricType: "shadda",
    subType: "Getzner",
    description:
      "Original Getzner with the hologram. Heavy enough for a proper riga that holds its shape all day.",
    pricePerYard: k(41000),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(41000) },
      { minYards: 6, maxYards: 11, pricePerYard: k(38500) },
      { minYards: 12, maxYards: null, pricePerYard: k(35000) },
    ],
    minOrderYards: 4,
    stockYards: 120,
    widthIn: 60,
    colourways: [C.cream, C.sky, C.olive, C.black],
    city: "Kano",
    cutOptions: ["continuous"],
    hasDrapeVideo: true,
    views: 4410,
    saves: 289,
    quality: q({
      fibre: "100% cotton damask",
      gsm: 210,
      weaveTpi: 118,
      marketTier: "Getzner original (hologram verified)",
      buyerConfirmations: 54,
    }),
    grade: makeGrade(94, "2026-08-25"),
  },
  {
    id: "l-005",
    vendorId: "v-blessing",
    title: "Sequined net lace, full body",
    fabricType: "lace",
    subType: "Sequined lace",
    description:
      "Sequins sewn, not glued — I will show you on video. Perfect for the second look at a reception.",
    pricePerYard: k(78000),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(78000) },
      { minYards: 6, maxYards: 11, pricePerYard: k(72000) },
      { minYards: 12, maxYards: null, pricePerYard: k(67500) },
    ],
    minOrderYards: 2,
    stockYards: 42,
    widthIn: 52,
    colourways: [C.fuchsia, C.gold, C.black, C.emerald],
    city: "Abuja",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: true,
    views: 6730,
    saves: 512,
    quality: q({
      fibre: "Polyester net, sewn sequin",
      gsm: 195,
      weaveTpi: 71,
      marketTier: "Premium sequined",
      buyerConfirmations: 38,
    }),
    grade: makeGrade(79, "2026-08-20"),
  },
  {
    id: "l-006",
    vendorId: "v-yemi",
    title: "Sanyan aso-oke, complete set",
    fabricType: "aso-oke",
    subType: "Sanyan",
    description:
      "Woven to order in Iseyin, nine looms. A set is four yards of body plus gele and ipele. Two weeks lead time, no shortcuts.",
    pricePerYard: k(96000),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(96000) },
      { minYards: 6, maxYards: 11, pricePerYard: k(89000) },
      { minYards: 12, maxYards: null, pricePerYard: k(82000) },
    ],
    minOrderYards: 4,
    stockYards: 24,
    widthIn: 24,
    colourways: [C.cream, C.rust, C.indigo],
    city: "Lagos",
    cutOptions: ["continuous"],
    hasDrapeVideo: true,
    views: 1890,
    saves: 174,
    quality: q({
      fibre: "Handspun silk-cotton (sanyan)",
      gsm: 280,
      weaveTpi: 48,
      tpiConfidence: "medium",
      marketTier: "Handwoven, single loom",
      buyerConfirmations: 22,
    }),
    grade: makeGrade(92, "2026-08-14"),
  },
  {
    id: "l-007",
    vendorId: "v-hauwa",
    title: "Atamfa fancy print, everyday",
    fabricType: "ankara",
    subType: "Fancy print",
    description:
      "Single-side print, light cotton. Honest fancy print at a fancy print price — good for children's wear and everyday wrappers.",
    pricePerYard: k(7200),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(7200) },
      { minYards: 6, maxYards: 11, pricePerYard: k(6600) },
      { minYards: 12, maxYards: null, pricePerYard: k(5900) },
    ],
    minOrderYards: 2,
    stockYards: 340,
    widthIn: 46,
    colourways: [C.coral, C.sky, C.olive, C.fuchsia, C.emerald],
    city: "Kano",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: false,
    views: 8940,
    saves: 221,
    quality: q({
      fibre: "Cotton-polyester blend",
      gsm: 94,
      weaveTpi: 58,
      marketTier: "Fancy print (single-face)",
      bothFacesIdentical: false,
      selvedgeVerified: false,
      colourfastness: "Some bleed on first wash — wash cold, separately",
      buyerConfirmations: 88,
    }),
    grade: makeGrade(64, "2026-08-11"),
  },
  {
    id: "l-008",
    vendorId: "v-emeka",
    title: "Intorica George, stoned border",
    fabricType: "george",
    subType: "Intorica",
    description:
      "Original Intorica, hand-stoned border. Comes as blouse plus two wrappers. Wedding fabric, priced as wedding fabric.",
    pricePerYard: k(155000),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(155000) },
      { minYards: 6, maxYards: 11, pricePerYard: k(148000) },
      { minYards: 12, maxYards: null, pricePerYard: k(139000) },
    ],
    minOrderYards: 5,
    stockYards: 30,
    widthIn: 45,
    colourways: [C.gold, C.wine, C.emerald],
    city: "Onitsha",
    cutOptions: ["continuous"],
    hasDrapeVideo: true,
    views: 2760,
    saves: 308,
    quality: q({
      fibre: "Silk-viscose with glass stone",
      gsm: 320,
      weaveTpi: 96,
      marketTier: "Intorica original",
      buyerConfirmations: 19,
    }),
    grade: makeGrade(89, "2026-08-27"),
  },
  {
    id: "l-009",
    vendorId: "v-zainab",
    title: "Tulle lace, beaded bodice panel",
    fabricType: "lace",
    subType: "Tulle lace",
    description:
      "Soft tulle with beadwork concentrated in the panel. Bridal only. I keep one piece per bride — nobody at your wedding will match you.",
    pricePerYard: k(34000),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(34000) },
      { minYards: 6, maxYards: 11, pricePerYard: k(31500) },
      { minYards: 12, maxYards: null, pricePerYard: k(29000) },
    ],
    minOrderYards: 3,
    stockYards: 18,
    widthIn: 55,
    colourways: [C.cream, C.fuchsia, C.sky],
    city: "Abuja",
    cutOptions: ["continuous"],
    hasDrapeVideo: false,
    views: 1420,
    saves: 96,
    quality: q({
      fibre: "Nylon tulle, glass bead",
      gsm: 110,
      weaveTpi: 44,
      tpiConfidence: "low",
      marketTier: "Bridal tulle",
      buyerConfirmations: 11,
    }),
    grade: makeGrade(73, "2026-08-09"),
  },
  {
    id: "l-010",
    vendorId: "v-sani",
    title: "Super Wax, Vlisco selvedge",
    fabricType: "ankara",
    subType: "Super Wax",
    description:
      "The real thing. Selvedge stamped and numbered, crackle you can hear. Six yards, no cutting — Super Wax is not sold in pieces.",
    pricePerYard: k(52000),
    tiers: [
      { minYards: 6, maxYards: 11, pricePerYard: k(52000) },
      { minYards: 12, maxYards: null, pricePerYard: k(48500) },
    ],
    minOrderYards: 6,
    stockYards: 36,
    widthIn: 48,
    colourways: [C.royal, C.wine, C.gold],
    city: "Kano",
    cutOptions: ["continuous"],
    hasDrapeVideo: true,
    views: 4120,
    saves: 466,
    quality: q({
      fibre: "100% cotton",
      gsm: 152,
      weaveTpi: 104,
      marketTier: "Super Wax (Vlisco)",
      buyerConfirmations: 33,
    }),
    grade: makeGrade(96, "2026-08-28"),
  },
  {
    id: "l-011",
    vendorId: "v-aisha",
    title: "Chiffon mayafi with matching atamfa",
    fabricType: "veil",
    subType: "Chiffon veil",
    description:
      "Veil and wrapper cut from an agreeing palette. Two yards of veil, six of atamfa — the whole set, settled.",
    pricePerYard: k(9800),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(9800) },
      { minYards: 6, maxYards: 11, pricePerYard: k(9100) },
      { minYards: 12, maxYards: null, pricePerYard: k(8400) },
    ],
    minOrderYards: 2,
    stockYards: 210,
    widthIn: 44,
    colourways: [C.rust, C.olive, C.sky, C.cream],
    city: "Kano",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: true,
    views: 3310,
    saves: 187,
    quality: q({
      fibre: "Polyester chiffon",
      gsm: 68,
      weaveTpi: 76,
      marketTier: "Standard chiffon",
      buyerConfirmations: 41,
    }),
    grade: makeGrade(77, "2026-08-16"),
  },
  {
    id: "l-012",
    vendorId: "v-folake",
    title: "Adire eleko, cassava resist",
    fabricType: "adire",
    subType: "Eleko",
    description:
      "Hand-painted cassava paste resist, then indigo. Each piece takes four days. No two are identical and I will not pretend otherwise.",
    pricePerYard: k(16800),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(16800) },
      { minYards: 6, maxYards: 11, pricePerYard: k(15400) },
      { minYards: 12, maxYards: null, pricePerYard: k(14000) },
    ],
    minOrderYards: 2,
    stockYards: 27,
    widthIn: 45,
    colourways: [C.indigo, C.cream],
    city: "Lagos",
    cutOptions: ["continuous"],
    hasDrapeVideo: true,
    views: 1980,
    saves: 244,
    quality: q({
      fibre: "100% cotton",
      gsm: 142,
      weaveTpi: 70,
      marketTier: "Hand resist, natural indigo",
      buyerConfirmations: 26,
    }),
    grade: makeGrade(84, "2026-08-18"),
  },
  {
    id: "l-013",
    vendorId: "v-ngozi",
    title: "Bulk cord lace, asoebi lots",
    fabricType: "lace",
    subType: "Cord lace",
    description:
      "Aba prices for asoebi lots of 20 and above. Same roll, same dye batch, so your guests actually match.",
    pricePerYard: k(38000),
    tiers: [
      { minYards: 1, maxYards: 11, pricePerYard: k(38000) },
      { minYards: 12, maxYards: 49, pricePerYard: k(34500) },
      { minYards: 50, maxYards: null, pricePerYard: k(31000) },
    ],
    minOrderYards: 6,
    stockYards: 480,
    widthIn: 52,
    colourways: [C.wine, C.royal, C.emerald, C.fuchsia, C.gold],
    city: "Aba",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: false,
    views: 5240,
    saves: 133,
    quality: q({
      fibre: "Polyester cord on net",
      gsm: 180,
      weaveTpi: 62,
      marketTier: "Grade 2 cord lace",
      colourfastness: "Slight bleed reported by 3 buyers",
      buyerConfirmations: 57,
    }),
    grade: makeGrade(58, "2026-08-05"),
  },
  {
    id: "l-014",
    vendorId: "v-umar",
    title: "Italian senator, cashmere weight",
    fabricType: "senator",
    subType: "Italian senator",
    description:
      "Proper weight for a kaftan that hangs instead of clinging. Four yards does a full senator with the cap.",
    pricePerYard: k(23500),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(23500) },
      { minYards: 6, maxYards: 11, pricePerYard: k(21800) },
      { minYards: 12, maxYards: null, pricePerYard: k(19900) },
    ],
    minOrderYards: 4,
    stockYards: 165,
    widthIn: 58,
    colourways: [C.black, C.indigo, C.olive, C.cream],
    city: "Kano",
    cutOptions: ["continuous"],
    hasDrapeVideo: false,
    views: 3670,
    saves: 158,
    quality: q({
      fibre: "Wool-polyester cashmere blend",
      gsm: 245,
      weaveTpi: 86,
      marketTier: "Italian mill",
      buyerConfirmations: 44,
    }),
    grade: makeGrade(81, "2026-08-21"),
  },
  {
    id: "l-015",
    vendorId: "v-hauwa",
    title: "African wax, market print",
    fabricType: "ankara",
    subType: "African wax",
    description:
      "Double-face print, good cotton, honest price. My best seller three months running.",
    pricePerYard: k(11400),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(11400) },
      { minYards: 6, maxYards: 11, pricePerYard: k(10500) },
      { minYards: 12, maxYards: null, pricePerYard: k(9600) },
    ],
    minOrderYards: 2,
    stockYards: 288,
    widthIn: 46,
    colourways: [C.emerald, C.wine, C.sky, C.rust, C.gold],
    city: "Kano",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: true,
    views: 7120,
    saves: 394,
    quality: q({
      fibre: "100% cotton",
      gsm: 118,
      weaveTpi: 80,
      marketTier: "African wax",
      buyerConfirmations: 72,
    }),
    grade: makeGrade(82, "2026-08-23"),
  },
  {
    id: "l-016",
    vendorId: "v-adaeze",
    title: "Silk chiffon, plain dye",
    fabricType: "chiffon",
    subType: "Silk chiffon",
    description:
      "Real silk, not polyester pretending. Burns to ash, not to bead — ask me for the video.",
    pricePerYard: k(28000),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(28000) },
      { minYards: 6, maxYards: 11, pricePerYard: k(26000) },
      { minYards: 12, maxYards: null, pricePerYard: k(24000) },
    ],
    minOrderYards: 2,
    stockYards: 74,
    widthIn: 54,
    colourways: [C.cream, C.fuchsia, C.sky, C.olive],
    city: "Lagos",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: true,
    views: 2440,
    saves: 119,
    // Deliberately ungraded — proves "Grade pending" is a real, neutral state.
  },
  {
    id: "l-017",
    vendorId: "v-blessing",
    title: "Guipure lace, chemical net",
    fabricType: "lace",
    subType: "Guipure",
    description:
      "Stiff guipure that stands on its own. Good for peplum and structured sleeves.",
    pricePerYard: k(21500),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(21500) },
      { minYards: 6, maxYards: 11, pricePerYard: k(19800) },
      { minYards: 12, maxYards: null, pricePerYard: k(18000) },
    ],
    minOrderYards: 2,
    stockYards: 88,
    widthIn: 50,
    colourways: [C.cream, C.black, C.wine, C.gold],
    city: "Abuja",
    cutOptions: ["continuous", "separate"],
    hasDrapeVideo: false,
    views: 1760,
    saves: 71,
    quality: q({
      fibre: "Polyester guipure",
      gsm: 205,
      weaveTpi: 55,
      marketTier: "Chemical lace",
      buyerConfirmations: 18,
    }),
    grade: makeGrade(68, "2026-08-12"),
  },
  {
    id: "l-018",
    vendorId: "v-yemi",
    title: "Etu aso-oke, indigo classic",
    fabricType: "aso-oke",
    subType: "Etu",
    description:
      "The guinea-fowl weave. Dark indigo with fine white fleck. Traditional, and it will outlive the wedding.",
    pricePerYard: k(74000),
    tiers: [
      { minYards: 1, maxYards: 5, pricePerYard: k(74000) },
      { minYards: 6, maxYards: 11, pricePerYard: k(69000) },
      { minYards: 12, maxYards: null, pricePerYard: k(64000) },
    ],
    minOrderYards: 4,
    stockYards: 16,
    widthIn: 24,
    colourways: [C.indigo],
    city: "Lagos",
    cutOptions: ["continuous"],
    hasDrapeVideo: true,
    views: 1330,
    saves: 142,
    quality: q({
      fibre: "Handwoven cotton",
      gsm: 265,
      weaveTpi: 46,
      tpiConfidence: "medium",
      marketTier: "Handwoven, traditional etu",
      buyerConfirmations: 15,
    }),
    grade: makeGrade(90, "2026-08-15"),
  },
];

export const listing = (id: string) => LISTINGS.find((l) => l.id === id) ?? LISTINGS[0];

export const listingsByVendor = (vendorId: string) =>
  LISTINGS.filter((l) => l.vendorId === vendorId);

/** Price for a given quantity, walking the bulk ladder. */
export function tierPrice(l: Listing, qty: number) {
  const tier =
    [...l.tiers].reverse().find((t) => qty >= t.minYards) ?? l.tiers[0];
  return tier.pricePerYard;
}

export function nextTier(l: Listing, qty: number) {
  return l.tiers.find((t) => t.minYards > qty);
}

/* -------------------------------------------------------------------------- */
/* Reviews                                                                     */
/* -------------------------------------------------------------------------- */

export const REVIEWS: Review[] = [
  { id: "r1", listingId: "l-002", buyer: "Amina B.", rating: 5, body: "Exactly the hollandais he described. The crackle is there, selvedge stamped. My tailor confirmed it before I even said anything.", yardsBought: 6, at: "2026-08-24", hasPhoto: true },
  { id: "r2", listingId: "l-002", buyer: "Fatima S.", rating: 5, body: "Second time buying from Alhaji Sani. Cut continuous like I asked.", yardsBought: 12, at: "2026-08-18", hasPhoto: true },
  { id: "r3", listingId: "l-002", buyer: "Ngozi A.", rating: 4, body: "Good fabric. Delivery took a day longer than the estimate but he messaged me about it.", yardsBought: 6, at: "2026-08-09", hasPhoto: false },
  { id: "r4", listingId: "l-001", buyer: "Chidinma O.", rating: 5, body: "Bought for 38 guests. Same dye batch across all of it — nobody complained, which at a Nigerian wedding is the highest praise available.", yardsBought: 190, at: "2026-08-21", hasPhoto: true },
  { id: "r5", listingId: "l-001", buyer: "Kemi A.", rating: 5, body: "Heavy cord, holds the sleeve without lining. Worth the price.", yardsBought: 5, at: "2026-08-12", hasPhoto: true },
  { id: "r6", listingId: "l-003", buyer: "Ibrahim M.", rating: 5, body: "You can smell the indigo. Real Kofar Mata. It did crock a little on the first wash like he warned, so no surprise.", yardsBought: 4, at: "2026-08-26", hasPhoto: true },
  { id: "r7", listingId: "l-007", buyer: "Grace U.", rating: 4, body: "It is fancy print and it is priced as fancy print. No complaints — she was honest about what it is.", yardsBought: 12, at: "2026-08-20", hasPhoto: false },
  { id: "r8", listingId: "l-013", buyer: "Blessing N.", rating: 3, body: "Price is good for bulk but the wine bled into my white lining. Check before you sew.", yardsBought: 60, at: "2026-08-14", hasPhoto: true },
  { id: "r9", listingId: "l-004", buyer: "Alhaji Danjuma", rating: 5, body: "Getzner is Getzner. Hologram was there. My riga has held its shape through three Fridays.", yardsBought: 8, at: "2026-08-27", hasPhoto: true },
  { id: "r10", listingId: "l-010", buyer: "Hadiza K.", rating: 5, body: "I have been cheated on Super Wax before. Not this time. The numbering on the selvedge matched.", yardsBought: 6, at: "2026-08-29", hasPhoto: true },
];

export const reviewsFor = (listingId: string) =>
  REVIEWS.filter((r) => r.listingId === listingId);

/* -------------------------------------------------------------------------- */
/* Orders — one at each escrow state (PRD §16.2)                               */
/* -------------------------------------------------------------------------- */

const today = "2026-09-06";
const t = (time: string) => `${today}T${time}:00`;

export const ORDERS: Order[] = [
  {
    id: "o-1",
    ref: "YRD-8842",
    vendorId: "v-sani",
    listingId: "l-002",
    yards: 6,
    pricePerYard: k(17200),
    deliveryFee: k(3500),
    courier: "GIG Logistics",
    trackingNo: "KN-4471",
    placedAt: t("10:24"),
    escrowState: "transit",
    timeline: [
      { state: "held", label: "Payment held in escrow", at: t("10:24") },
      { state: "accepted", label: "Vendor accepted", at: t("10:41") },
      { state: "packed", label: "Cut and packed", at: t("14:02"), note: "6 yards, continuous cut", hasEvidence: true },
      { state: "transit", label: "In transit — GIG, KN-4471", at: t("16:10"), note: "Est. Thu 12 Sep" },
      { state: "delivered", label: "Delivered", at: null },
      { state: "released", label: "You confirm → vendor is paid", at: null },
    ],
  },
  {
    id: "o-2",
    ref: "YRD-8790",
    vendorId: "v-adaeze",
    listingId: "l-001",
    yards: 5,
    pricePerYard: k(62000),
    deliveryFee: k(2800),
    courier: "Kwik",
    trackingNo: "LG-9920",
    placedAt: "2026-09-04T09:12:00",
    escrowState: "delivered",
    timeline: [
      { state: "held", label: "Payment held in escrow", at: "2026-09-04T09:12:00" },
      { state: "accepted", label: "Vendor accepted", at: "2026-09-04T09:30:00" },
      { state: "packed", label: "Cut and packed", at: "2026-09-04T13:44:00", hasEvidence: true },
      { state: "transit", label: "In transit — Kwik, LG-9920", at: "2026-09-05T08:02:00" },
      { state: "delivered", label: "Delivered", at: "2026-09-06T11:31:00", note: "Signed for at Lekki Phase 1" },
      { state: "released", label: "You confirm → vendor is paid", at: null },
    ],
  },
  {
    id: "o-3",
    ref: "YRD-8611",
    vendorId: "v-umar",
    listingId: "l-004",
    yards: 8,
    pricePerYard: k(38500),
    deliveryFee: k(4200),
    courier: "GIG Logistics",
    trackingNo: "KN-4102",
    placedAt: "2026-08-28T15:20:00",
    escrowState: "released",
    timeline: [
      { state: "held", label: "Payment held in escrow", at: "2026-08-28T15:20:00" },
      { state: "accepted", label: "Vendor accepted", at: "2026-08-28T15:38:00" },
      { state: "packed", label: "Cut and packed", at: "2026-08-29T10:05:00", hasEvidence: true },
      { state: "transit", label: "In transit — GIG, KN-4102", at: "2026-08-29T17:40:00" },
      { state: "delivered", label: "Delivered", at: "2026-09-01T12:15:00" },
      { state: "released", label: "Released to Umar & Sons Shadda", at: "2026-09-01T18:02:00" },
    ],
  },
  {
    id: "o-4",
    ref: "YRD-8433",
    vendorId: "v-ngozi",
    listingId: "l-013",
    yards: 60,
    pricePerYard: k(31000),
    deliveryFee: k(9500),
    courier: "GIG Logistics",
    trackingNo: "AB-2210",
    placedAt: "2026-08-22T11:00:00",
    escrowState: "disputed",
    timeline: [
      { state: "held", label: "Payment held in escrow", at: "2026-08-22T11:00:00" },
      { state: "accepted", label: "Vendor accepted", at: "2026-08-22T11:26:00" },
      { state: "packed", label: "Cut and packed", at: "2026-08-23T09:14:00", hasEvidence: true },
      { state: "transit", label: "In transit — GIG, AB-2210", at: "2026-08-23T16:00:00" },
      { state: "delivered", label: "Delivered", at: "2026-08-26T10:40:00" },
      { state: "disputed", label: "You reported: colour bled into lining", at: "2026-08-27T08:15:00", note: "Escrow frozen — vendor has 48h to respond", hasEvidence: true },
    ],
  },
];

export const order = (id: string) => ORDERS.find((o) => o.id === id) ?? ORDERS[0];

/* -------------------------------------------------------------------------- */
/* Bulk / asoebi                                                               */
/* -------------------------------------------------------------------------- */

export const BULK_REQUESTS: BulkRequest[] = [
  {
    id: "b-1",
    ref: "ASO-8842",
    fabricType: "lace",
    colour: "Wine",
    peopleCount: 38,
    yards: 219,
    budgetPerYard: k(45000),
    eventDate: "2026-11-14",
    city: "Lagos",
    sampleRequired: true,
    state: "offers",
    postedAt: "2026-09-05T14:20:00",
    offers: [
      {
        id: "bo-1",
        vendorId: "v-adaeze",
        pricePerYard: k(43500),
        yardsAvailable: 240,
        deliveryDate: "2026-09-19",
        note: "All from one dye batch. I can hold 240 yards for 72 hours while you confirm your list.",
        sampleOffered: true,
        gradeLetter: "A",
      },
      {
        id: "bo-2",
        vendorId: "v-ngozi",
        pricePerYard: k(31000),
        yardsAvailable: 480,
        deliveryDate: "2026-09-16",
        note: "Cheapest you will find for 219 yards. Aba price.",
        sampleOffered: false,
        gradeLetter: "C",
      },
      {
        id: "bo-3",
        vendorId: "v-blessing",
        pricePerYard: k(44800),
        yardsAvailable: 220,
        deliveryDate: "2026-09-24",
        note: "Sequined option available at the same price if the couple wants more shine.",
        sampleOffered: true,
        gradeLetter: "B",
      },
      {
        id: "bo-4",
        vendorId: "v-zainab",
        pricePerYard: k(46200),
        yardsAvailable: 219,
        deliveryDate: "2026-09-21",
        note: "Slightly over your budget but this is bridal-grade. Sample posted today if you want it.",
        sampleOffered: true,
        gradeLetter: "A",
      },
    ],
  },
  {
    id: "b-2",
    ref: "ASO-8710",
    fabricType: "ankara",
    colour: "Emerald",
    peopleCount: 14,
    yards: 84,
    budgetPerYard: k(15000),
    eventDate: "2026-10-03",
    city: "Kano",
    sampleRequired: false,
    state: "open",
    postedAt: "2026-09-06T09:05:00",
    offers: [],
  },
];

export const bulkRequest = (id: string) =>
  BULK_REQUESTS.find((b) => b.id === id) ?? BULK_REQUESTS[0];

/* -------------------------------------------------------------------------- */
/* Reels                                                                       */
/* -------------------------------------------------------------------------- */

export const REELS: Reel[] = [
  { id: "re-1", vendorId: "v-sani", listingId: "l-010", caption: "Super Wax crackle test. Listen with sound on.", hook: "If it doesn't crackle, it isn't Super Wax", likes: 4210, views: 61200 },
  { id: "re-2", vendorId: "v-adaeze", listingId: "l-001", caption: "Six yards of wine cord, unrolled across the table.", hook: "This is what ₦62,000 a yard looks like", likes: 3180, views: 44100 },
  { id: "re-3", vendorId: "v-kofar", listingId: "l-003", caption: "Fifth dip in pit 7. Watch the colour turn in the air.", hook: "It goes in green and comes out blue", likes: 8940, views: 132000 },
  { id: "re-4", vendorId: "v-blessing", listingId: "l-005", caption: "Sequins are sewn, not glued. Proof below.", hook: "Pull test on ₦78,000 lace", likes: 2760, views: 38800, isLive: true, viewers: 412 },
  { id: "re-5", vendorId: "v-umar", listingId: "l-004", caption: "Getzner drape at arm's length. No lining, no clinging.", hook: "Why governors buy this shadda", likes: 1940, views: 27400 },
  { id: "re-6", vendorId: "v-yemi", listingId: "l-006", caption: "Loom 3, Iseyin. Sanyan in progress.", hook: "Two weeks of work, four yards of cloth", likes: 5120, views: 71900 },
  { id: "re-7", vendorId: "v-folake", listingId: "l-012", caption: "Cassava paste going on by hand. Four days per piece.", hook: "Nobody else will have this exact cloth", likes: 3640, views: 52300 },
  { id: "re-8", vendorId: "v-emeka", listingId: "l-008", caption: "Stoned border, daylight sheen. Onitsha Main.", hook: "Intorica at ₦155,000 a yard", likes: 2280, views: 31600 },
  { id: "re-9", vendorId: "v-hauwa", listingId: "l-015", caption: "Both faces, same print. That is how you tell.", hook: "Fancy print vs African wax, in 20 seconds", likes: 6710, views: 98400 },
  { id: "re-10", vendorId: "v-aisha", listingId: "l-011", caption: "Mayafi and atamfa, already agreeing.", hook: "One set, no guessing", likes: 1810, views: 24700 },
];

/* -------------------------------------------------------------------------- */
/* Designs (Advanced — Designer Studio)                                        */
/* -------------------------------------------------------------------------- */

export const DESIGNS: Design[] = [
  { id: "d-1", title: "Dagi Repeat", designer: "Tunde Bakare", designerCity: "Lagos", motifTags: ["Hausa knot", "Geometric"], royaltyPerYard: k(900), runsCompleted: 7, yardsPrinted: 2140, palette: ["#1B2A6B", "#D9A441", "#F6F1E7"] },
  { id: "d-2", title: "Kofar Gate", designer: "Amina Sule", designerCity: "Kano", motifTags: ["Architecture", "Indigo"], royaltyPerYard: k(1200), runsCompleted: 4, yardsPrinted: 980, palette: ["#101B47", "#3B4C99", "#E4E7F4"] },
  { id: "d-3", title: "Groundnut Pyramid", designer: "Ibrahim Danladi", designerCity: "Kano", motifTags: ["Heritage", "Clay"], royaltyPerYard: k(850), runsCompleted: 9, yardsPrinted: 3320, palette: ["#C4622D", "#E8DCC3", "#5A5A2B"] },
  { id: "d-4", title: "Three Basket", designer: "Folake Bakare", designerCity: "Lagos", motifTags: ["Adire", "Traditional"], royaltyPerYard: k(1100), runsCompleted: 6, yardsPrinted: 1640, palette: ["#1B2A6B", "#FBF8F2"] },
  { id: "d-5", title: "Sallah Ram", designer: "Zainab Mohammed", designerCity: "Abuja", motifTags: ["Festival", "Playful"], royaltyPerYard: k(750), runsCompleted: 3, yardsPrinted: 620, palette: ["#0F5C43", "#D9A441", "#F7E5DA"] },
  { id: "d-6", title: "Kwari Line", designer: "Sani Abdullahi Jr.", designerCity: "Kano", motifTags: ["Market", "Stripe"], royaltyPerYard: k(680), runsCompleted: 11, yardsPrinted: 4870, palette: ["#6E1B2E", "#C9A227", "#1E1B18"] },
];

/* -------------------------------------------------------------------------- */
/* Chat                                                                        */
/* -------------------------------------------------------------------------- */

export const THREADS: Thread[] = [
  {
    id: "th-1",
    vendorId: "v-sani",
    messages: [
      { id: "m1", from: "buyer", type: "text", body: "Good afternoon. Is the wax hollandais still available?", at: t("09:41") },
      { id: "m2", from: "vendor", type: "text", body: "Yes madam, 48 yards on the shelf. Which colour?", at: t("09:44") },
      { id: "m3", from: "buyer", type: "text", body: "Emerald. Can you cut 6 yards continuous?", at: t("09:46") },
      { id: "m4", from: "vendor", type: "voice", body: "Voice note", at: t("09:48"), voiceSecs: 14 },
      { id: "m5", from: "vendor", type: "text", body: "Continuous is no problem. For 6 yards it drops to ₦17,200 a yard.", at: t("09:49") },
      { id: "m6", from: "vendor", type: "offer", body: "Offer for 6 yards", at: t("09:50"), offer: { yards: 6, pricePerYard: k(17200), listingId: "l-002" } },
    ],
  },
  {
    id: "th-2",
    vendorId: "v-adaeze",
    messages: [
      { id: "m7", from: "buyer", type: "text", body: "Do you have the wine cord in 190 yards, same batch?", at: "2026-09-05T16:20:00" },
      { id: "m8", from: "vendor", type: "text", body: "I have 240 from one batch. I can hold it for you till Monday.", at: "2026-09-05T16:24:00" },
    ],
  },
  {
    id: "th-3",
    vendorId: "v-kofar",
    messages: [
      { id: "m9", from: "buyer", type: "text", body: "Will the indigo stain my white lining?", at: "2026-09-03T12:10:00" },
      { id: "m10", from: "vendor", type: "text", body: "For the first two washes, yes a little. Wash it alone in cold water twice before your tailor cuts it. After that it holds.", at: "2026-09-03T12:31:00" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Platform stats — the count-up trust band (PRD §12A.2)                       */
/* -------------------------------------------------------------------------- */

export const PLATFORM_STATS = {
  tradedKobo: k(2_140_000_000),
  orders: 4218,
  vendors: 312,
  gradedListings: 187,
  disputeRate: 2.1,
};
