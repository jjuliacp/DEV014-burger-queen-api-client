import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import Orders from "./OrdersPage";

import MenuPage from "./MenuPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
