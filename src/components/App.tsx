import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import Orders from "./Orders";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

export default App;
