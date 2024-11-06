import { useEffect, useState } from "react";
import { getOrders } from "../Services/api";
import "../styles/OrdersView.css";
import { useNavigate } from "react-router-dom";
// para definir la estructura de la orden
interface Order {
  id: string;
  client: string;
  status: string;
  dataEntry: string;
  products: Array<{
    qty: number;
    name: string;
    product: { name: string; price: number };
  }>;
}

const OrdersView: React.FC = () => {
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData); // almacenar las ordenes
        console.log(ordersData);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    loadOrders(); // llamar a la funcion para obtener productos
  }, []); // para que efecto se ejecute una sola vez

  //funcion para sumar items de productos
  const sumItems = (order: Order) => {
    return order.products.reduce((acc, curr) => acc + curr.qty, 0);
  };
  //funcion para calcular el total de pagar
  const total = (order: Order) => {
    return order.products.reduce(
      (acc, item) => acc + item.qty * item.product.price,
      0
    );
  };
  console.log("Total a pagar:", total);

  const handleNewOrder = () => {
    navigate("/menu"); // Ajusta la ruta según tu configuración de rutas
  };
  // filtrar botones
  const filteredOrders = orders.filter((order) => {
    if (filter === "pending" || filter === "delivering") {
      return order.status === "pending" || order.status === "delivering";
    }
    if (filter === "delivered" || filter === "canceled") {
      return order.status === "delivered" || order.status === "canceled";
    }
    return true;
  });

  return (
    <section className="ordersContainer">
      <h1>Pedidos</h1>
      <button onClick={handleNewOrder}>Nuevo Pedido</button>
      <div className="filter-buttons">
        <button onClick={() => setFilter("pending")}>Activos</button>
        <button onClick={() => setFilter("delivered")}>Cerrados</button>
      </div>
      {filteredOrders.length === 0 ? (
        <p>No hay pedidos disponibles</p>
      ) : (
        <ul className="ordersList">
          {filteredOrders.map((order) => (
            <li key={order.id} className="ordersItem">
              <h2>Pedido #{order.id}</h2>
              <p>Estado: {order.status}</p>
              <button
                onClick={() => console.log("Ver detalles de la orden", order)}
              >
                Ver Detalles
              </button>
              <p>Nombre de Cliente: {order.client}</p>
              {/* <p>Fecha: {order.dataEntry}</p> */}
              <p>Items en total: {sumItems(order)}</p>
              <p>Total a agar: ${total(order)}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default OrdersView;
