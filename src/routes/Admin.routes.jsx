import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const FarmerVerification = lazy(
  () => import("../pages/admin/FarmerVerification"),
);
const AssetVerification = lazy(
  () => import("../pages/admin/AssetVerification"),
);
const RiskMonitor = lazy(() => import("../pages/admin/RiskMonitor"));
const RefundRequests = lazy(() => import("../pages/admin/RefundRequests"));
//TODO: make the analyics use real data
const Analytics = lazy(() => import("../pages/admin/Analytics"));
const UserManagement = lazy(() => import("../pages/admin/UserManagement"));
const Profile = lazy(() => import("../pages/global/Profile"));
// const Operations = lazy(() => import("../pages/admin/Operations"));
// const SystemLogs = lazy(() => import("../pages/admin/SystemLogs"));

function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="/farmers" element={<FarmerVerification />} />
      <Route path="/assets" element={<AssetVerification />} />
      <Route path="/risk" element={<RiskMonitor />} />
      <Route path="/refunds" element={<RefundRequests />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      {/* <Route path="/logs" element={<SystemLogs />} /> */}
      {/* <Route path="/operations" element={<Operations />} /> */}
    </Routes>
  );
}

export default AdminRoutes;
