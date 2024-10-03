import Sidebar from "./Sidebar";

interface Order {
  id: number;
  item: string;
  quantity: number;
}

const orders: Order[] = [
  { id: 1, item: "Item 1", quantity: 2 },
  { id: 2, item: "Item 2", quantity: 5 },
  { id: 3, item: "Item 3", quantity: 1 },
];

const Orders: React.FC = () => {
  return (
    <>
      <main className="order-container">
        <section>
          <Sidebar />
        </section>
        <div>
          <h1>Orders</h1>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                {order.item} - Quantity: {order.quantity}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Orders;
