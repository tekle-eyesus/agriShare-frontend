export const mockInvestors = [
  {
    id: 1,
    name: "Abebe Kebede",
    shares: 10,
    amount: 10000,
    date: "2026-04-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Tigist Hailu",
    shares: 5,
    amount: 5000,
    date: "2026-04-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Mulugeta Desta",
    shares: 15,
    amount: 15000,
    date: "2026-04-22",
    status: "Active",
  },
  {
    id: 4,
    name: "Sara Ahmed",
    shares: 8,
    amount: 8000,
    date: "2026-04-25",
    status: "Active",
  },
];

export const mockUpdates = [
  {
    id: 1,
    title: "Harvest Progress Update",
    body: "We've completed 60% of the teff harvest. Quality looks excellent this season!",
    date: "2026-04-20",
    images: 2,
  },
  {
    id: 2,
    title: "Irrigation System Upgrade",
    body: "Installed new drip irrigation to improve water efficiency.",
    date: "2026-04-10",
    images: 3,
  },
];

export const mockReviews = [
  {
    id: 1,
    investor: "Abebe Kebede",
    rating: 5,
    review:
      "Excellent communication and transparency. Very happy with this investment!",
    date: "2026-04-18",
  },
  {
    id: 2,
    investor: "Tigist Hailu",
    rating: 5,
    review:
      "Great updates and professional management. Looking forward to the harvest!",
    date: "2026-04-21",
  },
];

export const investmentData = [
  { month: "Jan", amount: 50000 },
  { month: "Feb", amount: 120000 },
  { month: "Mar", amount: 200000 },
  { month: "Apr", amount: 325000 },
];

export const shareDistribution = [
  { name: "Large holders (>10 shares)", value: 45, color: "#2E7D32" },
  { name: "Medium holders (5-10 shares)", value: 30, color: "#4CAF50" },
  { name: "Small holders (<5 shares)", value: 25, color: "#C8E6C9" },
];

export const pastDistributions = [
  {
    id: 1,
    date: "Feb 15, 2026",
    amount: 25000,
    investors: 20,
    status: "Completed",
  },
];
