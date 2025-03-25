import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRotues";
import { ReviewerRoutes } from "./routes/ReviewerRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";

function App() {
  return (
    <>
      <Routes>
        {/* User routes */}
        <Route path="/reviewer/*" element={<ReviewerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
}

export default App;
