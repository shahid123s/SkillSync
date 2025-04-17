// routes/UserRoutes.jsx
import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/user/AuthPage";
import Home from "../pages/user/HomePage";
import LandingPage from "../pages/user/LandingPage";
import CoursesPage from "../pages/user/CoursesPage";
import CoursePage from "../pages/user/CoursePage";
import NotFound from "../pages/user/NotFound";

export function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="home" element={<Home />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="courses" element={<CoursesPage />} />
      <Route path="courses/:id" element={<CoursePage />} />
      {/* User-specific 404 */}
      <Route path="*" element={<NotFound role="user" />} />
    </Routes>
  );
}