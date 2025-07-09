import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login } from "./auth/pages";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { Index } from "@/pages/dashboard/Index";
import { Profile } from "@/pages/dashboard/Profile";
import Fees from "@/pages/dashboard/Fees";
import ChangePassword from "@/pages/dashboard/ChangePassword";
import OnBoarding from "@/pages/dashboard/OnBoarding";
import IndexPage from "./IndexPage";

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-x-hidden bg-white text-black">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route>
            <Route path="/auth/login" element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Index />} />
            <Route path="profile" element={<Profile />} />
            <Route path="fees" element={<Fees />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="onboarding" element={<OnBoarding />} />
          </Route>
          <Route path="*" element={<p>Not found!</p>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
