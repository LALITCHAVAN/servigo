import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

import { HomePage } from "@/pages/public/HomePage";
import { ServicesPage } from "@/pages/public/ServicesPage";
import { ServiceDetailsPage } from "@/pages/public/ServiceDetailsPage";
import { ProfessionalsPage } from "@/pages/public/ProfessionalsPage";
import { ProfessionalProfilePage } from "@/pages/public/ProfessionalProfilePage";
import { AboutPage } from "@/pages/public/AboutPage";
import { ContactPage } from "@/pages/public/ContactPage";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";

import { DashboardPage } from "@/pages/customer/DashboardPage";
import { MyBookingsPage } from "@/pages/customer/MyBookingsPage";
import { BookingPage } from "@/pages/customer/BookingPage";

import { ProfessionalDashboardPage } from "@/pages/professional/ProfessionalDashboardPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";

import { pageTransition } from "@/animations/variants";
import { useAuth } from "@/context/AuthContext";

// ==========================================
// PROTECTED ROUTE
// ==========================================

function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication check is complete
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <>{children}</>;
}

// ==========================================
// ANIMATED ROUTES
// ==========================================

function AnimatedRoutes() {
  const location = useLocation();

  const authRoutes = ["/login", "/register"];

  const isAuthRoute = authRoutes.includes(
    location.pathname
  );

  return (
    <>
      {!isAuthRoute && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Routes location={location}>
            {/* PUBLIC ROUTES */}

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/about"
              element={<AboutPage />}
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />

            {/* AUTH ROUTES */}

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/register"
              element={<RegisterPage />}
            />

            {/* PROTECTED ROUTES */}

            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <ServicesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/services/:slug"
              element={
                <ProtectedRoute>
                  <ServiceDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/professionals"
              element={
                <ProtectedRoute>
                  <ProfessionalsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/professionals/:id"
              element={
                <ProtectedRoute>
                  <ProfessionalProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/pro-dashboard"
              element={
                <ProtectedRoute>
                  <ProfessionalDashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}

            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!isAuthRoute && <Footer />}
    </>
  );
}

// ==========================================
// APP
// ==========================================

export default function App() {
  return <AnimatedRoutes />;
}