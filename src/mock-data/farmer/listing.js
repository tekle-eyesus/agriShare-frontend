export const mockListings = [
  {
    id: 1,
    title: "Teff Farm - Gozamin Investment",
    asset: "Teff Farm - Gozamin",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    goal: 500000,
    raised: 325000,
    percentage: 65,
    investors: 24,
    sharesSold: 65,
    totalShares: 100,
    deadline: "12 days",
    status: "Active",
    payoutMode: "Fixed ROI (12%)",
  },
  {
    id: 2,
    title: "Coffee Plantation - Jimma",
    asset: "Coffee Plantation",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop",
    goal: 750000,
    raised: 750000,
    percentage: 100,
    investors: 45,
    sharesSold: 150,
    totalShares: 150,
    deadline: "Funded",
    status: "Funded",
    payoutMode: "Revenue Share (20%)",
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
