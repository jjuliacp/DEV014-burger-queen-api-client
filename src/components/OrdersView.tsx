import { useEffect, useState } from "react";
import { getOrders } from "../Services/api";
import "../styles/OrdersView.css";
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
  return (
    <section className="ordersContainer">
      <h1>Pedidos</h1>
      <button onClick={() => console.log("BOTON DE NUEVO PEDIDO")}>
        Nuevo Pedido
      </button>
      <div className="filter-buttons">
        <button onClick={() => console.log("activos")}>Activos</button>
        <button onClick={() => console.log("cerrados")}>Cerrados</button>
      </div>
      {orders.length === 0 ? (
        <p>No hay pedidos disponibles</p>
      ) : (
        <ul className="ordersList">
          {orders.map((order) => (
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
