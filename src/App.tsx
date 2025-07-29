import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login } from "./auth/pages";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { Index } from "@/pages/dashboard/Index";
import { Academics } from "@/pages/dashboard/Academics";
import { ManageFaculty } from "@/pages/dashboard/ManageFaculty";
import Fees from "@/pages/dashboard/Fees";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import IndexPage from "./IndexPage";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { DepartmentSelector } from "./pages/dashboard/DepartmentSelector";
import { ApplicationsPage } from "./pages/dashboard/ApplicationsPage";

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-x-hidden bg-white text-black">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Index />} />
            <Route path="academics" element={<Academics />} />
            <Route
              path="academics/manage-faculty"
              element={<ManageFaculty />}
            />
            <Route path="select-department" element={<DepartmentSelector />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="fees" element={<Fees />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<p>Not found!</p>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
