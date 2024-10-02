import { Route, Routes } from "react-router-dom";
import ContainerOrders from "./ContainerOrders";
import Sidebar from "./Sidebar";
import Menu from "./Menu";

const OrdersPage: React.FC = () => {
  return (
    <>
      <nav>
        <Sidebar />
      </nav>
      <main>
        <ContainerOrders>
          <Routes>
            <Route path="/menu" element={<Menu />} />

            {/* Puedes agregar más rutas según necesites */}
          </Routes>
        </ContainerOrders>
      </main>
    </>
  );
};

export default OrdersPage;
