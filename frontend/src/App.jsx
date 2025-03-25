import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRotues";
import { ReviewerRoutes } from "./routes/ReviewerRoutes";

function App() {
  return (
    <>
      <Routes>
        {/* User routes */}
        <Route path="/reviewer/*" element={<ReviewerRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
}

export default App;
