import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/ui/Loader";
import { useAuthStore } from "../store/useAuth";

const AppLayout = lazy(() => import("../components/layout/AppLayout"));
const FarmerRoutes = lazy(() => import("./Farmer.routes"));
const InvestorRoutes = lazy(() => import("./Investor.routes"));
const AdminRoutes = lazy(() => import("./Admin.routes"));
const NotFound = lazy(() => import("../pages/global/NotFound"));
// const Profile = lazy(() => import("../pages/Profile"));

const ProtectedRoute = ({ children, requiredRole }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  const isLoaded = !isCheckingAuth;
  const isSignedIn = !!authUser;
  const userRole = authUser?.role;

  if (!isLoaded) {
    return <Loader isFullPage={true} />;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};

function UserRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="admin/*"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="farmer/*"
          element={
            <ProtectedRoute requiredRole="farmer">
              <FarmerRoutes />
            </ProtectedRoute>
          }
        />
        <Route
          path="investor/*"
          element={
            <ProtectedRoute requiredRole="investor">
              <InvestorRoutes />
            </ProtectedRoute>
          }
        />
        {/* <Route path="profile" element={<Profile />} /> */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
      <Route path="404" element={<NotFound />} />
    </Routes>
  );
}

export default UserRoutes;
