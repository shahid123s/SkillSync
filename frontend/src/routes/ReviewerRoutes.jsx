import { Route, Routes } from "react-router-dom";
import ReviewerAuthPage from "../pages/reviewer/ReviewerAuthPage";

export function ReviewerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ReviewerAuthPage />} />
    </Routes>
  );
}
