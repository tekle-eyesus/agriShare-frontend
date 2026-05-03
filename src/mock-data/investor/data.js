// Centralized mock data for the AgriShare investor portal.
export const PORTFOLIO_KPIS = {
  totalInvested: { value: 125_000, trend: 15 },
  portfolioValue: { value: 142_500, trend: 14 },
  totalReturns: { value: 17_500, trend: 22 },
  activeInvestments: { value: 5 },
};

export const ALLOCATION_BY_TYPE = [
  { name: "Farmland", value: 85_000 },
  { name: "Livestock", value: 40_000 },
];

export const ALLOCATION_BY_SECTOR = [
  { name: "Crops", value: 60_000 },
  { name: "Coffee", value: 25_000 },
  { name: "Dairy", value: 22_000 },
  { name: "Poultry", value: 10_000 },
  { name: "Honey", value: 8_000 },
];

export const DISTRIBUTION_HISTORY = [
  { month: "Nov", amount: 1800 },
  { month: "Dec", amount: 2100 },
  { month: "Jan", amount: 2500 },
  { month: "Feb", amount: 2500 },
  { month: "Mar", amount: 3000 },
  { month: "Apr", amount: 3000 },
];

export const PORTFOLIO_VALUE_TIME = Array.from({ length: 12 }, (_, i) => {
  const base = 100_000 + i * 3500 + Math.sin(i / 2) * 4000;
  return {
    month: ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr"][i],
    value: Math.round(base),
    invested: Math.round(95_000 + i * 2500),
  };
});

export const LISTINGS = [
  {
    id: 1, title: "Teff Farm — Gozamin Investment", farmer: "Abebe Kebede", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
    type: "Farmland", sector: "Crops",
    goal: 500_000, raised: 325_000, percentage: 65, investors: 24, daysRemaining: 8,
    status: "active", roi: 12, roiType: "fixed", riskLevel: "low",
    minInvestment: 1000, sharePrice: 1000, totalShares: 500, sharesAvailable: 175,
    description: "5.5 hectare teff farm in Gozamin district managed by a third-generation farmer with 15+ years of experience cultivating premium white teff for the Addis Ababa market.",
    location: "Amhara, East Gojjam, Gozamin",
    payoutFrequency: "Quarterly", duration: 12, expectedFirstPayout: "2026-07-15",
    useOfFunds: [
      { label: "Seeds & inputs", pct: 35 },
      { label: "Labor", pct: 25 },
      { label: "Irrigation upgrade", pct: 20 },
      { label: "Storage", pct: 12 },
      { label: "Logistics", pct: 8 },
    ],
    risks: ["Rainfall variability", "Market price fluctuation", "Pest outbreaks"],
  },
  {
    id: 2, title: "Coffee Plantation — Jimma", farmer: "Tigist Worku", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=800",
    type: "Farmland", sector: "Coffee",
    goal: 750_000, raised: 750_000, percentage: 100, investors: 41, daysRemaining: 0,
    status: "funded", roi: 20, roiType: "variable", riskLevel: "medium",
    minInvestment: 2500, sharePrice: 2500, totalShares: 300, sharesAvailable: 0,
    description: "Shaded Arabica plantation in the Jimma forest belt, sourcing for specialty export markets.",
    location: "Oromia, Jimma", payoutFrequency: "Bi-annual", duration: 24, expectedFirstPayout: "2026-10-01",
    useOfFunds: [
      { label: "Processing equipment", pct: 40 },
      { label: "Labor", pct: 30 },
      { label: "Certification", pct: 15 },
      { label: "Logistics", pct: 15 },
    ],
    risks: ["Coffee leaf rust", "Export price swings"],
  },
  {
    id: 3, title: "Dairy Cattle Herd — Arsi", farmer: "Bekele Tadesse", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800",
    type: "Livestock", sector: "Dairy",
    goal: 300_000, raised: 135_000, percentage: 45, investors: 12, daysRemaining: 15,
    status: "active", roi: 15, roiType: "fixed", riskLevel: "medium",
    minInvestment: 500, sharePrice: 500, totalShares: 600, sharesAvailable: 330,
    description: "Mixed Holstein × Boran herd of 24 head with full vaccination records and a guaranteed milk-buyer contract.",
    location: "Oromia, Arsi", payoutFrequency: "Monthly", duration: 18, expectedFirstPayout: "2026-06-01",
    useOfFunds: [{label:"New stock", pct: 45},{label:"Feed", pct: 30},{label:"Veterinary", pct: 15},{label:"Equipment", pct: 10}],
    risks: ["Disease outbreak", "Feed cost rise"],
  },
  {
    id: 4, title: "Organic Vegetable Farm", farmer: "Hanna Abebe", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800",
    type: "Farmland", sector: "Crops",
    goal: 200_000, raised: 160_000, percentage: 80, investors: 18, daysRemaining: 5,
    status: "active", roi: 10, roiType: "fixed", riskLevel: "low",
    minInvestment: 500, sharePrice: 500, totalShares: 400, sharesAvailable: 80,
    description: "Certified organic vegetable plot supplying Addis restaurants weekly.",
    location: "Amhara, South Gondar", payoutFrequency: "Quarterly", duration: 12, expectedFirstPayout: "2026-08-01",
    useOfFunds: [{label:"Greenhouse", pct: 50},{label:"Seeds", pct: 25},{label:"Labor", pct: 25}],
    risks: ["Pest pressure"],
  },
  {
    id: 5, title: "Poultry Farm Expansion", farmer: "Yonas Teshome", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=800",
    type: "Livestock", sector: "Poultry",
    goal: 150_000, raised: 45_000, percentage: 30, investors: 7, daysRemaining: 20,
    status: "active", roi: 18, roiType: "variable", riskLevel: "high",
    minInvestment: 250, sharePrice: 250, totalShares: 600, sharesAvailable: 420,
    description: "Expansion of broiler operation from 800 to 2,400 birds with new climate-controlled house.",
    location: "Oromia, West Shewa", payoutFrequency: "Quarterly", duration: 12, expectedFirstPayout: "2026-09-15",
    useOfFunds: [{label:"Coop construction", pct: 55},{label:"Chicks", pct: 25},{label:"Feed", pct: 20}],
    risks: ["Avian disease", "Feed price"],
  },
  {
    id: 6, title: "Honey Production — Wollega", farmer: "Meron Girma", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800",
    type: "Livestock", sector: "Honey",
    goal: 100_000, raised: 60_000, percentage: 60, investors: 14, daysRemaining: 10,
    status: "active", roi: 25, roiType: "variable", riskLevel: "medium",
    minInvestment: 250, sharePrice: 250, totalShares: 400, sharesAvailable: 160,
    description: "80 modern hives with eucalyptus and forest forage producing premium dark honey.",
    location: "Oromia, Wollega", payoutFrequency: "Bi-annual", duration: 18, expectedFirstPayout: "2026-11-01",
    useOfFunds: [{label:"Hives", pct: 60},{label:"Equipment", pct: 25},{label:"Training", pct: 15}],
    risks: ["Colony collapse", "Drought"],
  },
  {
    id: 7, title: "Wheat Cooperative — Bale", farmer: "Solomon Kassa", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800",
    type: "Farmland", sector: "Crops",
    goal: 1_000_000, raised: 410_000, percentage: 41, investors: 22, daysRemaining: 12,
    status: "active", roi: 14, roiType: "fixed", riskLevel: "medium",
    minInvestment: 1000, sharePrice: 1000, totalShares: 1000, sharesAvailable: 590,
    description: "Highland wheat cooperative plot with shared storage facilities.",
    location: "Oromia, Bale", payoutFrequency: "Annual", duration: 12, expectedFirstPayout: "2027-04-01",
    useOfFunds: [{label:"Inputs", pct: 40},{label:"Labor", pct: 30},{label:"Storage", pct: 20},{label:"Logistics", pct: 10}],
    risks: ["Rust disease", "Weather"],
  },
  {
    id: 8, title: "Sesame Farm — Humera", farmer: "Lemlem Gebre", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800",
    type: "Farmland", sector: "Crops",
    goal: 400_000, raised: 280_000, percentage: 70, investors: 19, daysRemaining: 6,
    status: "active", roi: 16, roiType: "variable", riskLevel: "medium",
    minInvestment: 1000, sharePrice: 1000, totalShares: 400, sharesAvailable: 120,
    description: "Lowland sesame export-grade plot in Humera region.",
    location: "Tigray, Western", payoutFrequency: "Annual", duration: 10, expectedFirstPayout: "2026-12-01",
    useOfFunds: [{label:"Inputs", pct: 45},{label:"Labor", pct: 35},{label:"Logistics", pct: 20}],
    risks: ["Border instability", "Rainfall"],
  },
  {
    id: 9, title: "Goat Herd — Borena", farmer: "Solomon Kassa", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1518715308788-3005759c61d3?w=800",
    type: "Livestock", sector: "Dairy",
    goal: 250_000, raised: 95_000, percentage: 38, investors: 11, daysRemaining: 5,
    status: "active", roi: 17, roiType: "variable", riskLevel: "high",
    minInvestment: 500, sharePrice: 500, totalShares: 500, sharesAvailable: 310,
    description: "Pastoralist Borana goat herd with rotational grazing.",
    location: "Oromia, Borena", payoutFrequency: "Bi-annual", duration: 18, expectedFirstPayout: "2026-10-15",
    useOfFunds: [{label:"Stock", pct: 60},{label:"Veterinary", pct: 25},{label:"Water", pct: 15}],
    risks: ["Drought", "Disease"],
  },
  {
    id: 10, title: "Sheep Flock — Menz", farmer: "Hanna Abebe", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800",
    type: "Livestock", sector: "Dairy",
    goal: 180_000, raised: 90_000, percentage: 50, investors: 9, daysRemaining: 14,
    status: "active", roi: 13, roiType: "fixed", riskLevel: "low",
    minInvestment: 500, sharePrice: 500, totalShares: 360, sharesAvailable: 180,
    description: "Highland Menz sheep flock for wool and mutton.",
    location: "Amhara, North Shewa", payoutFrequency: "Quarterly", duration: 18, expectedFirstPayout: "2026-08-15",
    useOfFunds: [{label:"Stock", pct: 55},{label:"Feed", pct: 30},{label:"Veterinary", pct: 15}],
    risks: ["Cold spells"],
  },
  {
    id: 11, title: "Avocado Orchard — Sidama", farmer: "Mulugeta Desta", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800",
    type: "Farmland", sector: "Crops",
    goal: 600_000, raised: 180_000, percentage: 30, investors: 13, daysRemaining: 22,
    status: "active", roi: 22, roiType: "variable", riskLevel: "medium",
    minInvestment: 1500, sharePrice: 1500, totalShares: 400, sharesAvailable: 280,
    description: "New Hass avocado orchard targeting Middle East export.",
    location: "SNNPR, Sidama", payoutFrequency: "Annual", duration: 36, expectedFirstPayout: "2027-06-01",
    useOfFunds: [{label:"Saplings", pct: 35},{label:"Irrigation", pct: 35},{label:"Labor", pct: 30}],
    risks: ["Long maturation period"],
  },
  {
    id: 12, title: "Highland Honey Project", farmer: "Meron Girma", farmerVerified: true,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800",
    type: "Livestock", sector: "Honey",
    goal: 200_000, raised: 110_000, percentage: 55, investors: 15, daysRemaining: 9,
    status: "active", roi: 21, roiType: "variable", riskLevel: "low",
    minInvestment: 250, sharePrice: 250, totalShares: 800, sharesAvailable: 360,
    description: "Highland honey expansion across two new apiaries.",
    location: "Amhara, South Gondar", payoutFrequency: "Bi-annual", duration: 18, expectedFirstPayout: "2026-12-15",
    useOfFunds: [{label:"Hives", pct: 70},{label:"Equipment", pct: 30}],
    risks: ["Pesticide drift"],
  },
];

export const INVESTMENTS = [
  { id: 1, listingId: 1, listingTitle: "Teff Farm — Gozamin", type: "Farmland",
    shares: 10, amountInvested: 10_000, currentValue: 11_200, roi: 12,
    status: "active", nextPayout: "2026-05-15", nextPayoutAmount: 1200, investedDate: "2026-04-15" },
  { id: 2, listingId: 2, listingTitle: "Coffee Plantation — Jimma", type: "Farmland",
    shares: 5, amountInvested: 12_500, currentValue: 15_000, roi: 20,
    status: "funded", nextPayout: "2026-06-01", nextPayoutAmount: 1000, investedDate: "2026-04-10" },
  { id: 3, listingId: 3, listingTitle: "Dairy Cattle — Arsi", type: "Livestock",
    shares: 15, amountInvested: 7_500, currentValue: 7_875, roi: 5,
    status: "active", nextPayout: "2026-07-01", nextPayoutAmount: 600, investedDate: "2026-03-22" },
  { id: 4, listingId: 4, listingTitle: "Organic Vegetable Farm", type: "Farmland",
    shares: 8, amountInvested: 4_000, currentValue: 4_200, roi: 5,
    status: "completed", nextPayout: null, nextPayoutAmount: 0, investedDate: "2025-11-01" },
  { id: 5, listingId: 6, listingTitle: "Honey Production — Wollega", type: "Livestock",
    shares: 12, amountInvested: 3_000, currentValue: 3_450, roi: 15,
    status: "active", nextPayout: "2026-08-01", nextPayoutAmount: 320, investedDate: "2026-02-14" },
];

export const DISTRIBUTIONS = [
  { id: 1, listingId: 1, listingTitle: "Teff Farm", amount: 1200, date: "2026-04-15", type: "profit", reference: "DST-2026-0415-001" },
  { id: 2, listingId: 2, listingTitle: "Coffee Plantation", amount: 1000, date: "2026-04-01", type: "profit", reference: "DST-2026-0401-002" },
  { id: 3, listingId: 1, listingTitle: "Teff Farm", amount: 1100, date: "2026-01-15", type: "profit", reference: "DST-2026-0115-001" },
  { id: 4, listingId: 2, listingTitle: "Coffee Plantation", amount: 900, date: "2026-01-01", type: "profit", reference: "DST-2026-0101-002" },
  { id: 5, listingId: 3, listingTitle: "Dairy Cattle", amount: 600, date: "2025-12-15", type: "profit", reference: "DST-2025-1215-003" },
  { id: 6, listingId: 4, listingTitle: "Organic Vegetable Farm", amount: 800, date: "2025-12-01", type: "profit", reference: "DST-2025-1201-004" },
  { id: 7, listingId: 6, listingTitle: "Honey Production", amount: 450, date: "2025-11-15", type: "profit", reference: "DST-2025-1115-006" },
  { id: 8, listingId: 1, listingTitle: "Teff Farm", amount: 1050, date: "2025-10-15", type: "profit", reference: "DST-2025-1015-001" },
];

export const REFUND_REQUESTS = [
  { id: "REQ-001", listingId: 1, listingTitle: "Teff Farm — Gozamin", amount: 10_000, shares: 10, requestedAt: "2026-04-20", status: "pending", reason: "Unable to maintain commitment due to personal cash flow needs.", adminNote: "" },
  { id: "REQ-002", listingId: 2, listingTitle: "Coffee Plantation — Jimma", amount: 5_000, shares: 5, requestedAt: "2026-03-15", status: "approved", reason: "Reallocating to other projects.", adminNote: "Approved, processed via wallet refund." },
];

export const WALLET = {
  balance: 24_500,
  totalDeposited: 150_000,
  totalWithdrawn: 8_000,
  totalEarned: 17_500,
  pendingDistributions: 3_120,
};

export const WALLET_TXNS = [
  { id: 1, type: "distribution", amount: 1200, status: "completed", date: "2026-04-15", reference: "DST-001" },
  { id: 2, type: "investment", amount: -5000, status: "completed", date: "2026-04-10", reference: "INV-001" },
  { id: 3, type: "deposit", amount: 10_000, status: "completed", date: "2026-04-05", reference: "DEP-Telebirr-1140" },
  { id: 4, type: "withdrawal", amount: -2_000, status: "completed", date: "2026-03-20", reference: "WDR-CBE-2200" },
  { id: 5, type: "distribution", amount: 1000, status: "completed", date: "2026-04-01", reference: "DST-002" },
  { id: 6, type: "investment", amount: -10_000, status: "completed", date: "2026-04-15", reference: "INV-002" },
  { id: 7, type: "deposit", amount: 25_000, status: "completed", date: "2026-03-01", reference: "DEP-Chapa-9821" },
  { id: 8, type: "investment", amount: -7_500, status: "completed", date: "2026-03-22", reference: "INV-003" },
  { id: 9, type: "deposit", amount: 5_000, status: "pending", date: "2026-04-28", reference: "DEP-Telebirr-1199" },
  { id: 10, type: "distribution", amount: 320, status: "completed", date: "2026-02-15", reference: "DST-003" },
];

export const REVIEWS = [
  { id: 1, listingId: 1, listingTitle: "Teff Farm — Gozamin", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400", rating: 5, text: "Excellent investment, great communication from the farmer. Updates posted weekly with photos and clear progress reports.", date: "2026-04-20", farmerResponse: "Thank you so much! Your support means a lot to our cooperative." },
  { id: 2, listingId: 2, listingTitle: "Coffee Plantation — Jimma", image: "https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=400", rating: 4, text: "Good returns, looking forward to next harvest. Documentation could be a little more frequent.", date: "2026-04-01", farmerResponse: "" },
];

export const NOTIFICATIONS = [
  { id: 1, type: "investment", title: "Investment successful", message: "Your investment in Teff Farm — Gozamin was successful (10 shares).", at: "2 hours ago", read: false },
  { id: 2, type: "distribution", title: "Distribution received", message: "You received 1,200 ETB from Teff Farm — Gozamin.", at: "2 days ago", read: false },
  { id: 3, type: "update", title: "New farmer update", message: "Abebe Kebede posted a harvest progress update.", at: "3 days ago", read: true },
  { id: 4, type: "review", title: "Farmer responded", message: "Tigist Worku replied to your review on Coffee Plantation.", at: "1 week ago", read: true },
  { id: 5, type: "investment", title: "Funding goal reached", message: "Coffee Plantation — Jimma has reached its goal!", at: "2 weeks ago", read: true },
  { id: 6, type: "distribution", title: "Distribution received", message: "You received 1,000 ETB from Coffee Plantation.", at: "3 weeks ago", read: true },
];

export const UPDATES_TIMELINE = [
  { id: 1, title: "First seedlings planted", body: "We have successfully planted on 3.5 hectares this week with the new improved teff variety. Soil moisture is excellent.", date: "2026-04-25", images: ["https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600"] },
  { id: 2, title: "Irrigation upgrade complete", body: "The drip irrigation system was completed ahead of schedule. Coverage is now 100% of cultivated area.", date: "2026-04-18", images: ["https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600"] },
  { id: 3, title: "Soil testing complete", body: "Results show excellent nutrient balance. We are ready for the planting season.", date: "2026-04-10", images: [] },
];

export const LISTING_REVIEWS = [
  { id: 1, reviewer: "Yodit Solomon", rating: 5, text: "Reliable farmer with consistent updates.", date: "2026-04-20" },
  { id: 2, reviewer: "Daniel A.", rating: 4, text: "Smooth process and good ROI.", date: "2026-03-12" },
  { id: 3, reviewer: "Selam T.", rating: 5, text: "Highly recommended.", date: "2026-02-28" },
];

export const PIE_COLORS = ["#2E7D32", "#4CAF50", "#FF9800", "#2196F3", "#6B21A8", "#F44336"];
