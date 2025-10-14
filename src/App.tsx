import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Login } from "./auth/pages";
import IndexPage from "./IndexPage";
import {
  Academics,
  AddResults,
  ApplicationsPage,
  ChangePassword,
  Dashboard,
  DashboardIndex,
  DepartmentSelector,
  ManageDepartment,
  ManageFaculty,
  ViewStaffs,
  ViewStaffDetails,
  RolesAndPermissions,
  AccessControl,
  ManageFeesPage,
  OtherDepartmentFeesPage,
  NursingFees,
} from "@/pages/dashboard";
import { ProtectedRoute } from "@/routes/ProtectedRoutes";

const App = () => {
  return (
    <div className="relative w-full h-screen overflow-x-hidden bg-white text-black">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardIndex />} />
            <Route path="academics" element={<Academics />} />
            <Route
              path="academics/manage-faculty"
              element={<ManageFaculty />}
            />
            <Route
              path="academics/manage-department"
              element={<ManageDepartment />}
            />
            <Route path="select-department" element={<DepartmentSelector />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="add-results" element={<AddResults />} />
            <Route path="bursary/manage-fees" element={<ManageFeesPage />} />
            <Route
              path="bursary/manage-fees/other-department"
              element={<OtherDepartmentFeesPage />}
            />
            <Route
              path="bursary/manage-fees/nursing"
              element={<NursingFees />}
            />
            <Route path="staffs" element={<ViewStaffs />} />
            <Route path="staffs/:staffId" element={<ViewStaffDetails />} />
            <Route
              path="roles-and-permissions"
              element={<RolesAndPermissions />}
            />
            <Route path="access-control" element={<AccessControl />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<p>Not found!</p>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
