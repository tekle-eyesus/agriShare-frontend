export const mockListings = [
  {
    id: 1,
    title: "Teff Farm - Gozamin District",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    goal: 500000,
    raised: 325000,
    percentage: 65,
    investors: 24,
    daysRemaining: 12,
    status: "Active",
  },
  {
    id: 2,
    title: "Coffee Plantation - Jimma",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop",
    goal: 750000,
    raised: 750000,
    percentage: 100,
    investors: 45,
    daysRemaining: 0,
    status: "Funded",
  },
];

export const mockInvestorActivity = [
  {
    id: 1,
    investor: "Abebe Kebede",
    action: "invested 5,000 ETB in",
    listing: "Teff Farm - Gozamin",
    amount: 5000,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    investor: "Tigist Hailu",
    action: "purchased 10 shares in",
    listing: "Coffee Plantation - Jimma",
    amount: 10000,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    investor: "Mulugeta Desta",
    action: "invested 15,000 ETB in",
    listing: "Teff Farm - Gozamin",
    amount: 15000,
    timestamp: "1 day ago",
  },
];

export const mockUpdates = [
  {
    id: 1,
    title: "Harvest Progress Update",
    listing: "Teff Farm - Gozamin",
    postedAt: "3 days ago",
  },
  {
    id: 2,
    title: "Coffee Beans Ready",
    listing: "Coffee Plantation - Jimma",
    postedAt: "1 week ago",
  },
];

export const mockNotifications = [
  {
    id: 1,
    type: "success",
    icon: "check",
    title: "Your listing has been verified",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "info",
    icon: "trending",
    title: "Funding goal reached!",
    time: "1 day ago",
  },
];
