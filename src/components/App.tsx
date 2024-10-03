import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";

import MenuPage from "./MenuPage";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <MenuPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
