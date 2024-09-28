import ContainerOrders from "./ContainerOrdesrs";
import Sidebar from "./Sidebar";

const Orders: React.FC = () => {
  return (
    <>
      <nav>
        <Sidebar />
      </nav>
      <main>
        <ContainerOrders />
      </main>
    </>
  );
};

export default Orders;
