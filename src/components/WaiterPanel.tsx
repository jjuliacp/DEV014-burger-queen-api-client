import { useEffect, useState } from "react";
import { getOrders } from "../Services/api";
import Layout from "./Layout";
import "../styles/WaiterPanel.css";
// Interfaz para los pedidos
interface Order {
  id: string;
  dataEntry: string;
  status: string;
  totalAmount: number;
}

// Componente principal del panel
const WaiterPanel: React.FC = () => {
  const [activeOrders, setActiveOrders] = useState<Array<Order>>([]);
  const [processed, setProcessed] = useState(0);
  const [cancelled, setCancelled] = useState(0);
  const [orderHistory, setOrderHistory] = useState<Array<Order>>([]);
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await getOrders();
        // obtener fecha
        const today = new Date();
        const todayString = `${today.getFullYear()}-${String(
          today.getDate()
        ).padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}`;

        const filteredOrders = ordersData.filter((order: Order) => {
          // Extraer la parte de la fecha de dataEntry
          const orderDateParts = order.dataEntry.split(" ")[0].split("-");
          const orderFormattedDate = `${orderDateParts[0]}-${orderDateParts[1]}-${orderDateParts[2]}`; // Cambiar a YYYY-DD-MM
          console.log(orderFormattedDate);
          console.log(todayString);
          return orderFormattedDate === todayString;
        });

        setActiveOrders(filteredOrders);
        // console.log(filteredOrders);
        setProcessed(
          filteredOrders.filter((order: Order) => order.status === "delivered")
            .length
        );
        setCancelled(
          filteredOrders.filter((order: Order) => order.status === "canceled")
            .length
        );
        setOrderHistory(ordersData);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    loadOrders(); // llamar a la funcion para obtener productos
  }, []); // para que efecto se ejecute una sola vez
  return (
    <Layout>
      <section className="containerWaiterPanel">
        <div>
          <h1>Bienvenido aqui esta tu resumen : </h1>
        </div>
        <section className="sectionWaiterPanel">
          <section>
            <h2>Pedidos Activos</h2>
            {activeOrders.length === 0 ? ( // Verificar si no hay pedidos activos
              <p>No hay pedidos activos el día de hoy.</p>
            ) : (
              <ul>
                {activeOrders.map((order) => (
                  <li key={order.id}>
                    Pedido #{order.id} - Fecha: {order.dataEntry} - Estado:{" "}
                    {order.status}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div>
            <h3>Resumen del dia</h3>
            <h4>Pedidos procesados:{processed}</h4>
            <h4>Pedidos cancelados:{cancelled}</h4>
            <h4>Total de pedidos realizados: {processed + cancelled}</h4>
          </div>
          <div>
            <h3>Historial de pedidos</h3>
            {orderHistory.length === 0 ? (
              <p>No hay historial de pedidos.</p>
            ) : (
              <ul>
                {orderHistory.map((order) => (
                  <li key={order.id} className="orderHistoryItem">
                    Pedido #{order.id} - Fecha: {order.dataEntry} - Estado:{" "}
                    {order.status} - Total: ${order.totalAmount}
                    <button
                      onClick={() => alert(`Detalles del Pedido #${order.id}`)}
                    >
                      Más detalles
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div>
              <p>Pedido #54</p>
              <p>Total a pagar:</p>
            </div>
            <button>mas detalles</button>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default WaiterPanel;
