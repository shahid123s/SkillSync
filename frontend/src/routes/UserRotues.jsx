import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/user/AuthPage";
import Home from "../pages/user/HomePage";
import LandingPage from "../pages/user/LandingPage";
import CreateCourseForm from "../components/user/course/dummy";
import CoursePage from "../pages/user/CoursePage";

export function UserRoutes (){
    return (
        <>
    <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="home" element={<Home/>} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="dummy" element={<CreateCourseForm />} />
            <Route path="details/:id" element={<CoursePage />} />
    </Routes>
    </>
    )
}