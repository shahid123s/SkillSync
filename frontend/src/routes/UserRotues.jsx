import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/user/AuthPage";
import Home from "../pages/user/HomePage";
import LandingPage from "../pages/user/LandingPage";
import CreateCourseForm from "../components/user/course/dummy";

export function UserRoutes (){
    return (
        <>
    <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home/>} />
            <Route path="landing-page" element={<LandingPage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="dummy" element={<CreateCourseForm />} />
    </Routes>
    </>
    )
}