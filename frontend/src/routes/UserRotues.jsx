import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";

export function UserRoutes (){
    return (
        <>
    <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="auth" element={<AuthPage />} />
    </Routes>
    </>
    )
}