import { Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRotues";

function App() {
  return (
    <>
      <Routes>
        {/* User routes */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
}

export default App;
