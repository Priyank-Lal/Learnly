import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Loader from "../components/layout/Loader";

const SignUp = lazy(() => import("../pages/SignUp"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const GoalDetail = lazy(() => import("../pages/GoalDetail"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Settings = lazy(() => import("../pages/Settings"));
const Profile = lazy(() => import("../pages/Profile"));
const Goals = lazy(() => import("../pages/Goals"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const MainRoutes = () => {
  return (
    <>
      <Suspense
        fallback={
          <Loader/>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route
            path="/signUp"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/goal-detail/:id"
            element={
              <ProtectedRoutes>
                <GoalDetail />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoutes>
                <Analytics />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/goals"
            element={
              <ProtectedRoutes>
                <Goals />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default MainRoutes;
