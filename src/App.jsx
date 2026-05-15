import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuth";

const Loader = lazy(() => import("./components/ui/Loader"));
const UserRoutes = lazy(() => import("./routes/User.routes"));
const Landing = lazy(() => import("./pages/Home"));
const FarmerVerification = lazy(() => import("./pages/farmer/Verification"));
const NotFound = lazy(() => import("./pages/global/NotFound"));
//TODO: for users who does not verify their email navigate the to the Verification page
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
//TODO: since we don't use temp password then we can use it for the forget pass
const ChangeTempPassword = lazy(
  () => import("./pages/auth/ChangeTempPassword"),
);
//TODO: make sure it is only valid for users that are not verified and the checkAuth returns null
const OTPVerification = lazy(() => import("./pages/auth/OTPVerification"));
//TODO: also for this make sure we have a way of sending a reset code at the moment we only have verification OTP for signup
const SendResetOTP = lazy(() => import("./pages/auth/SendResetOTP"));
// const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

//TODO: 🌩️🌩️make shared and modal components see if they are similar across and reuse them
//TODO: prepare a reusable pagination for all the pages that needs it
function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const user = authUser;
  const isLoaded = !isCheckingAuth;
  const isSignedIn = !!authUser;
  const userRole = user?.role;
  const getRootRedirect = () => {
    if (!isLoaded) return <Loader isFullPage={true} />;
    if (!isSignedIn) return <Navigate to="/login" replace />;
    if (userRole === "farmer" && user.verificationStatus !== "verified") {
      return <Navigate to="/verification" replace />;
    }
    return <Navigate to={`/${userRole}`} replace />;
  };
  return (
    <Routes>
      <Route index element={getRootRedirect()} />
      <Route
        path="/landing"
        element={isSignedIn ? <Navigate to="/" replace /> : <Landing />}
      />
      <Route
        path="/verification"
        element={
          userRole === "farmer" && user.verificationStatus !== "verified" ? (
            <FarmerVerification />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/login"
        element={isSignedIn ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={isSignedIn ? <Navigate to="/" replace /> : <Signup />}
      />
      <Route path="/change-password" element={<ChangeTempPassword />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      <Route path="/send-reset-OTP" element={<SendResetOTP />} />
      <Route
        path="/*"
        element={
          !isLoaded ? (
            <Loader isFullPage={true} />
          ) : isSignedIn ? (
            <UserRoutes />
          ) : (
            <Navigate to="/landing" replace />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
