import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/investor/Dashboard"));
const Marketplace = lazy(() => import("../pages/investor/MarketPlace"));
const ListingDetail = lazy(() => import("../pages/investor/ListingDetail"));
const Investments = lazy(() => import("../pages/investor/MyInvestments"));
const Distributions = lazy(() => import("../pages/investor/Distributions"));
const Refunds = lazy(() => import("../pages/investor/Refunds"));
const Wallet = lazy(() => import("../pages/investor/WalletPage"));
const Notifications = lazy(() => import("../pages/investor/Notifications"));
const Profile = lazy(() => import("../pages/global/Profile"));

function InvestorRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/:id" element={<ListingDetail />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/distributions" element={<Distributions />} />
      <Route path="/refunds" element={<Refunds />} />
      <Route path="/wallet" element={<Wallet />} />
      {/* <Route path="/reviews" element={<Reviews />} /> */}
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default InvestorRoutes;
