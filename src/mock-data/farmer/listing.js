export const mockListings = [
  {
    _id: "1",
    asset: {
      _id: "1",
      name: "Teff Farm - Gozamin",
      type: "farmland",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
          description: "Aerial view of teff farm",
        },
      ],
    },
    farmer: {
      _id: "farmer_001",
      name: "Abebe Kebede",
      verificationStatus: "verified",
    },
    status: "active",
    investmentGoalBirr: 500000,
    sharesToSellPercent: 49,
    expectedTotalYieldBirr: 500000,
    pitchTitle: "Premium Teff Farm Investment Opportunity",
    pitchText:
      "5.5 hectare teff farm in Gozamin district managed by a third-generation farmer with 15+ years of experience cultivating premium white teff for the Addis Ababa market. The farm uses modern irrigation techniques and has consistently high yields due to fertile black soil and favorable climate conditions.",
    useOfFunds:
      "Expansion of irrigation system, purchase of modern farming equipment, working capital for seeds and fertilizers, and labor costs for the planting season.",
    riskFactors:
      "Rainfall variability, Market price fluctuation, Pest outbreaks",
    investmentDeadline: "2024-12-31",
    totalInvestedBirr: 325000,
    payoutMode: "fixed",
    payoffDaysFromRelease: 90,
    paydayDate: "2025-03-31",
    fundingGoalReachedAt: "2024-10-15",
    releasedToFarmerAt: null,
    refundedAt: null,
    refundReason: null,
    minSharesPerInvestor: 1,
    sharePricePerTokenBirr: 1000,
    shareTokenAddress: "0x123456789012345678901234567890",
    shareTokenSymbol: "TS-TEFF-001",
    totalShares: 100,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    _id: "2",
    asset: {
      _id: "2",
      name: "Coffee Plantation - Jimma",
      type: "farmland",
      photos: [
        {
          url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop",
          description: "Coffee plantation overview",
        },
      ],
    },
    farmer: {
      _id: "farmer_002",
      name: "Chala Kassa",
      verificationStatus: "verified",
    },
    status: "funded",
    investmentGoalBirr: 750000,
    sharesToSellPercent: 30,
    expectedTotalYieldBirr: 1200000,
    pitchTitle: "Premium Coffee Plantation Investment",
    pitchText:
      "12 hectare coffee plantation in Jimma zone with established Arabica coffee plants. The farm has been in production for 8 years and consistently produces high-quality specialty coffee beans for export markets.",
    useOfFunds:
      "Processing facility upgrade, organic certification, international marketing campaigns, and working capital for harvest season.",
    riskFactors: "Climate change impact, Price volatility, Disease outbreaks",
    investmentDeadline: "2024-11-30",
    totalInvestedBirr: 750000,
    payoutMode: "offset",
    payoffDaysFromRelease: 180,
    paydayDate: "2025-06-30",
    fundingGoalReachedAt: "2024-09-01",
    releasedToFarmerAt: "2024-09-15",
    refundedAt: null,
    refundReason: null,
    minSharesPerInvestor: 5,
    sharePricePerTokenBirr: 1500,
    shareTokenAddress: "0x9876543210987654321",
    shareTokenSymbol: "TS-COFFEE-002",
    totalShares: 200,
    createdAt: "2024-02-01",
    updatedAt: "2024-02-01",
  },
];

export const mockAssets = [
  {
    id: 1,
    name: "Teff Farm - Gozamin",
    type: "Farmland",
    size: "5.5 hectares",
    verified: true,
  },
  {
    id: 2,
    name: "Coffee Plantation - Jimma",
    type: "Farmland",
    size: "12 hectares",
    verified: true,
  },
  {
    id: 3,
    name: "Dairy Cattle Herd",
    type: "Livestock",
    size: "24 heads",
    verified: false,
  },
];
