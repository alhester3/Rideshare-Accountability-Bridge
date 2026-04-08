import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import {
  AnalyticsPage,
  AppealsPage,
  AuditCompliancePage,
  DashboardPage,
  ExplanationPage,
  FairnessCenterPage,
  LandingPage,
  UserManagementPage,
  WhatIfSimulationPage
} from "./pages";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/explanation/:decisionId" element={<ExplanationPage />} />
        <Route path="/fairness" element={<FairnessCenterPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/appeals" element={<AppealsPage />} />
        <Route path="/audit" element={<AuditCompliancePage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/simulation" element={<WhatIfSimulationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
