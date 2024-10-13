import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./Login";
import MenuPage from "./MenuPage";
import ProtectedRoute from "./ProtectedRoute";
import OrdersPage from "./OrdersPage";
import Sidebar from "./Sidebar";
import WaiterView from "./WaiterView";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  return (
    <>
      {/* Sidebar que se muestra en todas las rutas menos en login */}
      {!isLoginPage && <Sidebar />}

      {/* Definición de rutas */}
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/panel" element={<WaiterView />} />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <MenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
