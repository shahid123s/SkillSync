import { Route, Routes } from "react-router-dom";
import ReviewerAuthPage from "../pages/reviewer/ReviewerAuthPage";
import ReviewerHome from "../pages/reviewer/ReviewerHome";
import ReviewerProfile from "../pages/reviewer/ReviewerProfile";

export function ReviewerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReviewerHome />} />
      <Route path="/auth" element={<ReviewerAuthPage />} />
      <Route path="profile" element={<ReviewerProfile/>} />
    </Routes>
  );
}
