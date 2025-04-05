// routes/ReviewerRoutes.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import ReviewerAuthPage from "../pages/reviewer/ReviewerAuthPage";
import ReviewerHome from "../pages/reviewer/ReviewerHome";
import ReviewerProfile from "../pages/reviewer/ReviewerProfile";
import ReviewerStudents from "../pages/reviewer/ReviewerStudent";
import ReviewerStudentDetails from "../pages/reviewer/ReviewerStudentsDetails";
import NotFound from "../pages/user/NotFound";

export function ReviewerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReviewerHome />} />
      <Route path="auth" element={<ReviewerAuthPage />} />
      <Route path="profile" element={<ReviewerProfile />} />
      <Route path="dashboard" element={<Navigate to="/reviewer" replace />} />
      <Route path="students">
        <Route index element={<ReviewerStudents />} />
        <Route path=":id" element={<ReviewerStudentDetails />} />
      </Route>
      {/* Reviewer-specific 404 */}
      <Route path="*" element={<NotFound role="reviewer" />} />
    </Routes>
  );
}