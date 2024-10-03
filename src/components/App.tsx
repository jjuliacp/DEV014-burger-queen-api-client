import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import Orders from "./Orders";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
