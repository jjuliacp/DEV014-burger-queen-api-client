import { useEffect, useState } from "react";
import { Order } from "./OrdersView";
import { getOrders, updateOrderStatus } from "../Services/api";
import Layout from "./Layout";

//gestionar pedidos por el jefe de cocina
const KitchenOrders: React.FC = () => {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<{ [key: number]: string }>(
    {}
  );
  const date = new Date();
  const dateFormatted = `${date.getFullYear()}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    const loadOrders = async () => {
      const ordersData = await getOrders();

      const sortedOrders = ordersData.sort(
        (a: Order, b: Order) =>
          new Date(b.dataEntry).getTime() - new Date(a.dataEntry).getTime()
      );
      console.log(sortedOrders);
      setOrders(sortedOrders);

      sortedOrders.forEach((order: Order) => {
        if (order.status === "delivered" && order.dateProcessed) {
          const time = calculateOrders(order.dataEntry, order.dateProcessed);
          setDeliveryTimes((prev) => ({ ...prev, [order.id]: time }));
        }
      });
    };
    loadOrders();
  }, []);
  const updateStatus = async (orderId: number, newStatus: string) => {
    const dateProcessed = dateFormatted;

    await updateOrderStatus(orderId, newStatus, dateProcessed);
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, dateProcessed }
          : order
      )
    );
    if (newStatus === "delivered") {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        const time = calculateOrders(order.dataEntry, dateProcessed);

        setDeliveryTimes((prev) => ({ ...prev, [orderId]: time }));
      }
    }
  };
  //calaculate time of order status update from pending to delivered order
  const calculateOrders = (
    dataEntry: string,
    dateProcessed: string
  ): string => {
    const entryTime = new Date(dataEntry).getTime();
    const processedTime = new Date(dateProcessed).getTime();

    // Diferencia en milisegundos
    const timeDifference = processedTime - entryTime;

    // Convertimos la diferencia a minutos
    const minutes = Math.floor(timeDifference / (1000 * 60));
    console.log("tiempo: " + minutes);
    return `tiempo de preparación ${minutes} minutos`;
  };

  return (
    <Layout>
    <section className="menuContainer">
      <h1>Panel de cocina</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="orderItem">
            <h2>Pedido #{order.id}</h2>
            <p>Cliente: {order.client}</p>
            <p>Estado actual: {order.status}</p>
            <p>Fecha: {order.dataEntry}</p>
            {order.status === "delivered" && (
              <p>Pedido entregado: {deliveryTimes[order.id]}</p>
            )}
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
                Listo para entregar
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
    </Layout>
  );
};
export default KitchenOrders;
