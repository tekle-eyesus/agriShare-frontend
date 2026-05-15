import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/farmer/Dashboard"));
const Assets = lazy(() => import("../pages/farmer/Assets"));
const Listings = lazy(() => import("../pages/farmer/Listings"));
const ListingDetail = lazy(() => import("../pages/farmer/ListingDetail"));
const Investors = lazy(() => import("../pages/farmer/Investors"));
const Profile = lazy(() => import("../pages/global/Profile"));
// const Updates = lazy(() => import("../pages/farmer/Updates"));
// const Wallet = lazy(() => import("../pages/farmer/Wallet"));
// const Support = lazy(() => import("../pages/farmer/Support"));

function FarmerRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/assets" element={<Assets />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/listings/:id" element={<ListingDetail />} />
      <Route path="/investors" element={<Investors />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      {/* <Route path="/updates" element={<Updates />} /> */}
      {/* <Route path="/wallet" element={<Wallet />} /> */}
      {/* <Route path="/support" element={<Support />} /> */}
    </Routes>
  );
}

export default FarmerRoutes;
