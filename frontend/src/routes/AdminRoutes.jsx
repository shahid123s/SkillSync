// routes/AdminRoutes.jsx
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageCourses from "../pages/admin/ManageCourses";
import PendingReviewers from "../pages/admin/PendingReviewersPage";
import AdminLogin from "../pages/admin/AdminLogin";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="reviewers" element={<PendingReviewers />} />
      </Route>
    </Routes>
  );
}