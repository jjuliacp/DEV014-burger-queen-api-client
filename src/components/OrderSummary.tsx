import { IoAddCircle, IoChevronBack, IoTrash } from "react-icons/io5";
import "../styles/OrderSummary.css";
import { useState } from "react";
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  order: Array<Product>;
  total: number;
  isOpen: boolean;
  customerName: string;
  setCustomerName: (name: string) => void;
  removeProduct: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  sendOrderBtnClick: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  total,
  isOpen,
  customerName,
  setCustomerName,
  removeProduct,
  increaseQuantity,
  sendOrderBtnClick,
}) => {
  const [isActive, setIsActive] = useState(isOpen); // Estado para controlar si el resumen está abierto

  const handleBackClick = () => {
    setIsActive(false); // Cierra el resumen cuando se hace clic en la flecha
  };
  return (
    <section className={`menuResumen ${isActive ? "active" : ""}`}>
      <span className="backIconOrder" onClick={handleBackClick}>
        <IoChevronBack />
      </span>
      <h2>Resumen del Pedido</h2>
      <div className="customerOrder">
        <label htmlFor="customerName">Nombre del Cliente:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          placeholder="Ingrese su nombre"
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      {order.length === 0 ? (
        <p>No hay productos en el pedido.</p>
      ) : (
        order.map((item) => (
          <div key={item.id} className="order-item">
            <div className="orderList">
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
            <div className="order-controls">
              {/* Botones de incrementar/decrementar cantidad */}
              <button
                className="actionButtonTrash"
                onClick={() => removeProduct(item.id)}
              >
                <IoTrash />
              </button>
              <span>{item.quantity}</span>
              <button
                className="actionButtonAdd"
                onClick={() => increaseQuantity(item.id)}
              >
                <IoAddCircle />
              </button>
              {/* Botón para eliminar el producto */}
            </div>
          </div>
        ))
      )}
      <h3 className="total">Total: ${total}</h3>
      <button className="sendOrderBtn" onClick={sendOrderBtnClick}>
        Enviar a Cocina
      </button>
    </section>
  );
};

export default OrderSummary;
