import { useEffect } from "react";
import { getOrders } from "../Services/api";

const OrdersView: React.FC = () => {
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await getOrders();

        console.log(ordersData);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    loadOrders(); // llamar a la funcion para obtener productos
  }, []); // para que efecto se ejecute una sola vez
  return (
    <>
      <h1>hola soy una orden de ejemplo</h1>
    </>
  );
};
export default OrdersView;
