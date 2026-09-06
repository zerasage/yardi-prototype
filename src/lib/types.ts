/**
 * Domain types — mirrors the data model in PRD §11.
 * Money in kobo (bigint in production, number here). Yards allow halves.
 */

export type Mode = "basic" | "advanced";

export type GradeLetter = "A" | "B" | "C" | "D";
export type GradeStatus = "verified" | "pending" | "withdrawn";

export type City = "Kano" | "Lagos" | "Abuja" | "Onitsha" | "Aba";

export type MarketId =
  | "kantin-kwari"
  | "balogun"
  | "wuse"
  | "onitsha-main"
  | "ariaria";

export interface Market {
  id: MarketId;
  name: string;
  city: City;
  blurb: string;
  vendorCount: number;
}

export type FabricTypeId =
  | "ankara"
  | "lace"
  | "aso-oke"
  | "adire"
  | "shadda"
  | "george"
  | "senator"
  | "brocade"
  | "chiffon"
  | "veil";

export interface FabricType {
  id: FabricTypeId;
  name: string;
  nameHa: string;
  index: string;
  blurb: string;
  /** Sub-types for the category accordion — PRD §12A.2 (Fabrico pattern). */
  subTypes: string[];
}

export interface Vendor {
  id: string;
  shopName: string;
  ownerName: string;
  market: MarketId;
  stallNo: string;
  city: City;
  joined: string;
  rating: number;
  ordersCompleted: number;
  responseMins: number;
  onTimePct: number;
  verifications: string[];
  languages: string[];
  bio: string;
  /** Advanced only. */
  subscription?: "verified-plus";
}

export interface PriceTier {
  minYards: number;
  maxYards: number | null;
  pricePerYard: number;
}

export interface Colourway {
  name: string;
  hex: string;
  accent: string;
}

export interface QualityRecord {
  fibre: string;
  gsm: number;
  weaveTpi: number;
  tpiConfidence: "high" | "medium" | "low";
  colourfastness: string;
  marketTier: string;
  selvedgeVerified: boolean;
  bothFacesIdentical: boolean;
  capturedAt: string;
  buyerConfirmations: number;
  spotChecks: number;
}

export interface Grade {
  letter: GradeLetter;
  score: number;
  status: GradeStatus;
  verifiedAt: string;
  components: { label: string; weight: number; scored: number }[];
}

export interface Listing {
  id: string;
  vendorId: string;
  title: string;
  fabricType: FabricTypeId;
  subType: string;
  description: string;
  pricePerYard: number;
  tiers: PriceTier[];
  minOrderYards: number;
  stockYards: number;
  widthIn: number;
  colourways: Colourway[];
  city: City;
  cutOptions: ("continuous" | "separate")[];
  hasDrapeVideo: boolean;
  views: number;
  saves: number;
  /** Advanced only — undefined means "Grade pending". */
  quality?: QualityRecord;
  grade?: Grade;
}

export interface Review {
  id: string;
  listingId: string;
  buyer: string;
  rating: number;
  body: string;
  yardsBought: number;
  at: string;
  hasPhoto: boolean;
}

export type EscrowState =
  | "held"
  | "accepted"
  | "packed"
  | "transit"
  | "delivered"
  | "released"
  | "disputed";

export interface EscrowEvent {
  state: EscrowState;
  label: string;
  at: string | null;
  note?: string;
  hasEvidence?: boolean;
}

export interface Order {
  id: string;
  ref: string;
  vendorId: string;
  listingId: string;
  yards: number;
  pricePerYard: number;
  deliveryFee: number;
  courier: string;
  trackingNo: string;
  placedAt: string;
  escrowState: EscrowState;
  timeline: EscrowEvent[];
}

export interface BulkOffer {
  id: string;
  vendorId: string;
  pricePerYard: number;
  yardsAvailable: number;
  deliveryDate: string;
  note: string;
  sampleOffered: boolean;
  gradeLetter?: GradeLetter;
}

export interface BulkRequest {
  id: string;
  ref: string;
  fabricType: FabricTypeId;
  colour: string;
  peopleCount: number;
  yards: number;
  budgetPerYard: number;
  eventDate: string;
  city: City;
  sampleRequired: boolean;
  state: "open" | "offers" | "accepted" | "fulfilled";
  postedAt: string;
  offers: BulkOffer[];
}

export interface Reel {
  id: string;
  vendorId: string;
  listingId: string;
  caption: string;
  hook: string;
  likes: number;
  views: number;
  isLive?: boolean;
  viewers?: number;
}

export interface Design {
  id: string;
  title: string;
  designer: string;
  designerCity: City;
  motifTags: string[];
  royaltyPerYard: number;
  runsCompleted: number;
  yardsPrinted: number;
  palette: string[];
}

export interface ChatMessage {
  id: string;
  from: "buyer" | "vendor";
  type: "text" | "offer" | "listing" | "voice";
  body: string;
  at: string;
  offer?: { yards: number; pricePerYard: number; listingId: string };
  voiceSecs?: number;
}

export interface Thread {
  id: string;
  vendorId: string;
  messages: ChatMessage[];
}

export interface CartLine {
  listingId: string;
  colourway: string;
  yards: number;
  cutType: "continuous" | "separate";
}
