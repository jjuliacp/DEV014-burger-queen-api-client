import ContainerOrders from "./ContainerOrders";
import Menu from "./Menu";

import Sidebar from "./Sidebar";

const MenuPage: React.FC = () => {
  return (
    <>
      {" "}
      <nav>
        <Sidebar />
      </nav>
      <main>
        <ContainerOrders>
          <Menu />
        </ContainerOrders>
      </main>
    </>
  );
};

export default MenuPage;
