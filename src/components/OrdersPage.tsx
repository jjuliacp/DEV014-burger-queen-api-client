import Layout from "./Layout";
import OrdersView from "./OrdersView";

const OrdersPage: React.FC = () => {
  return (
    <>
      <main>
        <Layout>
          <OrdersView />
        </Layout>
      </main>
    </>
  );
};

export default OrdersPage;
