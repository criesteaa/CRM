import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import SalesFunnel from "./components/sales/SalesFunnel";
import SchedulePage from "./components/schedule/SchedulePage";
import StaffPage from "./components/staff/StaffPage";
import LeadPage from "./components/leads/LeadPage";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales-funnel"
              element={
                <ProtectedRoute>
                  <SalesFunnel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <SchedulePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute>
                  <StaffPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lead"
              element={
                <ProtectedRoute>
                  <LeadPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
