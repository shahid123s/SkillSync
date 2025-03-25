import { Route, Routes } from "react-router-dom";
import ReviewerAuthPage from "../pages/reviewer/ReviewerAuthPage";
import ReviewerHome from "../pages/reviewer/ReviewerHome";
import ReviewerProfile from "../pages/reviewer/ReviewerProfile";
import ReviewerStudents from "../pages/reviewer/ReviewerStudent";
import ReviewerStudentDetails from "../pages/reviewer/ReviewerStudentsDetails";

export function ReviewerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReviewerHome />} />
      <Route path="auth" element={<ReviewerAuthPage />} />
      <Route path="profile" element={<ReviewerProfile/>} />
      <Route path="students">
        <Route index element={<ReviewerStudents/>} />
        <Route path=":id" element={<ReviewerStudentDetails />} />
      </Route>
    </Routes>
  );
}
