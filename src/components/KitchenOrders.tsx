import { useEffect, useState } from "react";
import { Order } from "./OrdersView";
import { getOrders, updateOrderStatus } from "../Services/api";

//gestionar pedidos por el jefe de cocina
const KitchenOrders: React.FC = () => {
  const [orders, setOrders] = useState<Array<Order>>([]);
  useEffect(() => {
    const loadOrders = async () => {
      const ordersData = await getOrders();
      setOrders(ordersData);
    };
    loadOrders();
  }, []);
  const updateStatus = async (orderId: number, newStatus: string) => {
    const dateProcessed = new Date().toISOString();
    console.log("dia procesado:", dateProcessed);
    await updateOrderStatus(orderId, newStatus, dateProcessed);
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, dateProcessed }
          : order
      )
    );
  };
  return (
    <section className="kitchenPanel">
      <h1>Panel de cocina</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="orderItem">
            <h2>Pedido #{order.id}</h2>
            <p>Cliente: {order.client}</p>
            <p>Estado actual: {order.status}</p>
            <div className="status-buttons">
              <button
                onClick={() => updateStatus(order.id, "pending")}
                disabled={order.status === "pending"}
              >
                Pendiente
              </button>
              <button
                onClick={() => updateStatus(order.id, "delivering")}
                disabled={order.status === "delivering"}
              >
                En entrega
              </button>
              <button
                onClick={() => updateStatus(order.id, "delivered")}
                disabled={order.status === "delivered"}
              >
                Entregado
              </button>
              <button
                onClick={() => updateStatus(order.id, "canceled")}
                disabled={order.status === "canceled"}
              >
                Cancelado
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default KitchenOrders;
