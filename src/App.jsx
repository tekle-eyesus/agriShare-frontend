import { Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import Login from "./pages/auth/Login";
// import ChangeTempPassword from "./pages/auth/ChangeTempPassword";
// import OTPVerification from "./pages/auth/OTPVerification";
// import ResetPassword from "./pages/auth/ResetPassword";
import SendResetOTP from "./pages/auth/SendResetOTP";

import Home from "./pages/Home";
import NotFound from "./pages/global/NotFound";
import Dashboard from "./pages/farmer/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import InvestorDashboard from "./pages/investor/Dashboard";
import InvestorProfile from "./pages/investor/Profile";
import InvestorDistributions from "./pages/investor/Distributions";
import MarketPlace from "./pages/investor/MarketPlace";
import InvestorListingDetail from "./pages/investor/ListingDetail";
import Investments from "./pages/investor/MyInvestments";
import InvestorReview from "./pages/investor/MyReviews";
import InvestorNotifications from "./pages/investor/Notifications";
import InvestorRefundRequests from "./pages/investor/Refunds";
import Wallet from "./pages/investor/WalletPage";

import Assets from "./pages/farmer/Assets";
import Listings from "./pages/farmer/Listings";
import ListingDetail from "./pages/farmer/ListingDetail";
import UserManagement from "./pages/admin/UserManagement";
import AssetVerifications from "./pages/admin/AssetVerification";
import FarmerVerifications from "./pages/admin/FarmerVerification";
import Analytics from "./pages/admin/Analytics";
import Operations from "./pages/admin/Operations";
import RefundRequests from "./pages/admin/RefundRequests";
import RiskMonitor from "./pages/admin/RiskMonitor";
import SystemLogs from "./pages/admin/SystemLogs";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      {/* <Route path="/change-password" element={<ChangeTempPassword />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
      <Route path="/send-reset-OTP" element={<SendResetOTP />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/investor/dashboard" element={<InvestorDashboard />} />
        <Route path="/investor/profile" element={<InvestorProfile />} />
        <Route
          path="/investor/distributions"
          element={<InvestorDistributions />}
        />
        <Route path="/investor/marketplace" element={<MarketPlace />} />
        <Route
          path="/investor/listing/:id"
          element={<InvestorListingDetail />}
        />
        <Route path="/investor/investments" element={<Investments />} />
        <Route path="/investor/reviews" element={<InvestorReview />} />
        <Route
          path="/investor/notifications"
          element={<InvestorNotifications />}
        />
        <Route path="/investor/refunds" element={<InvestorRefundRequests />} />
        <Route path="/investor/wallet" element={<Wallet />} />
        <Route path="/farmer/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route
          path="/admin/asset-verification"
          element={<AssetVerifications />}
        />
        <Route
          path="/admin/farmer-verification"
          element={<FarmerVerifications />}
        />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/operations" element={<Operations />} />
        <Route path="/admin/refund-requests" element={<RefundRequests />} />
        <Route path="/admin/risk-monitor" element={<RiskMonitor />} />
        <Route path="/admin/system-logs" element={<SystemLogs />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
