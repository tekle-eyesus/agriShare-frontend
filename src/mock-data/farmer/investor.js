export const mockInvestors = [
  {
    id: 1,
    name: "Abebe Kebede",
    email: "abebe.k@email.com",
    phone: "+251-91-123-4567",
    totalInvested: 15000,
    listings: ["Teff Farm", "Coffee Plantation"],
    firstInvestment: "2026-01-15",
    lastInvestment: "2026-04-15",
  },
  {
    id: 2,
    name: "Tigist Hailu",
    email: "tigist.h@email.com",
    phone: "+251-91-234-5678",
    totalInvested: 25000,
    listings: ["Coffee Plantation"],
    firstInvestment: "2026-02-10",
    lastInvestment: "2026-04-20",
  },
  {
    id: 3,
    name: "Mulugeta Desta",
    email: "mulugeta.d@email.com",
    phone: "+251-91-345-6789",
    totalInvested: 35000,
    listings: ["Teff Farm", "Coffee Plantation"],
    firstInvestment: "2026-01-20",
    lastInvestment: "2026-04-22",
  },
  {
    id: 4,
    name: "Sara Ahmed",
    email: "sara.a@email.com",
    phone: "+251-91-456-7890",
    totalInvested: 18000,
    listings: ["Teff Farm"],
    firstInvestment: "2026-03-05",
    lastInvestment: "2026-04-25",
  },
];

export const mockInvestmentHistory = {
  1: [
    {
      listing: "Teff Farm - Gozamin",
      shares: 10,
      amount: 10000,
      date: "2026-01-15",
    },
    {
      listing: "Coffee Plantation - Jimma",
      shares: 5,
      amount: 5000,
      date: "2026-04-15",
    },
  ],
  2: [
    {
      listing: "Coffee Plantation - Jimma",
      shares: 25,
      amount: 25000,
      date: "2026-02-10",
    },
  ],
  3: [
    {
      listing: "Teff Farm - Gozamin",
      shares: 25,
      amount: 25000,
      date: "2026-01-20",
    },
    {
      listing: "Coffee Plantation - Jimma",
      shares: 10,
      amount: 10000,
      date: "2026-04-22",
    },
  ],
  4: [
    {
      listing: "Teff Farm - Gozamin",
      shares: 18,
      amount: 18000,
      date: "2026-03-05",
    },
  ],
};
