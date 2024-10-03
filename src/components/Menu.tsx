import { useState } from "react";
import "../styles/Menu.css";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

// Interfaz para definir la estructura de un producto
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const Menu: React.FC = () => {
  const [order, setOrder] = useState<Array<Product>>([]);
  const [total, setTotal] = useState(0);

  // Datos de ejemplo: array de hamburguesas
  const products: Array<Product> = [
    { id: "1", name: "Hamburguesa Clásica", price: 5, quantity: 0 },
    { id: "2", name: "Hamburguesa con Queso", price: 6, quantity: 0 },
    { id: "3", name: "Hamburguesa Doble", price: 8, quantity: 0 },
    { id: "4", name: "Hamburguesa Vegana", price: 7, quantity: 0 },
    { id: "5", name: "Hamburguesa BBQ", price: 9, quantity: 0 },
  ];

  // Función para agregar productos al pedido
  const addProduct = (product: Product) => {
    const existingProduct = order.find((p) => p.id === product.id);

    if (existingProduct) {
      setOrder((prevOrder) =>
        prevOrder.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setOrder((prevOrder) => [...prevOrder, { ...product, quantity: 1 }]);
    }

    setTotal((prevTotal) => prevTotal + product.price);
  };

  // Función para remover productos del pedido
  const removeProduct = (productId: string) => {
    const existingProduct = order.find((p) => p.id === productId);

    if (existingProduct && existingProduct.quantity > 1) {
      // Si el producto tiene más de 1 en cantidad, solo resta 1
      setOrder((prevOrder) =>
        prevOrder.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
      setTotal((prevTotal) => prevTotal - existingProduct.price);
    } else {
      // Si la cantidad es 1, elimina el producto
      setOrder((prevOrder) => prevOrder.filter((p) => p.id !== productId));
      if (existingProduct) {
        setTotal((prevTotal) => prevTotal - existingProduct.price);
      }
    }
  };

  // Obtener la cantidad del producto en el pedido, si existe
  const getProductQuantity = (productId: string) => {
    const productInOrder = order.find((p) => p.id === productId);
    return productInOrder ? productInOrder.quantity : 0;
  };
  // Función para contar el número total de items en el pedido
  const getTotalItems = () => {
    return order.reduce((sum, product) => sum + product.quantity, 0);
  };
  // Render del componente
  return (
    <>
      <main className="menuContainer">
        <h1>Menú</h1>

        <div className="menuToggle">
          <button className="toggleButton">Desayunos</button>
          <button className="toggleButton active">Almuerzo/Cena</button>
        </div>

        <section className="menuSection">
          <h2 className="menuSectionTittle">Hamburguesas</h2>
          {products.map((product, index) => (
            <div key={`${product.id}-${index}`} className="menuProduct">
              <div className="productDetails">
                <h3 className="menuProductH3">{product.name}</h3>
                <p className="menuProductPrice">${product.price}</p>
              </div>
              <div className="productActions">
                <button
                  onClick={() => removeProduct(product.id)}
                  className="actionButton"
                >
                  <CiCircleMinus />
                </button>
                {/* Mostrar la cantidad correcta del producto en el pedido */}
                <span>{getProductQuantity(product.id)}</span>
                <button
                  onClick={() => addProduct(product)}
                  className="actionButton"
                >
                  <CiCirclePlus />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Resumen del pedido */}
        <section className="menuResumen">
          <div>
            <h2>Resumen del Pedido</h2>
            {order.length === 0 ? (
              <p>No hay productos en el pedido.</p>
            ) : (
              order.map((item, index) => (
                <div key={`${item.id}-${index}`}>
                  <p>
                    {item.name} - ${item.price} x {item.quantity}
                  </p>
                  <button onClick={() => removeProduct(item.id)}>
                    Eliminar
                  </button>
                </div>
              ))
            )}
            <h3>Total: ${total}</h3>
          </div>
        </section>

        {/* Botón para enviar pedido (sin funcionalidad por ahora) */}
        <button disabled={order.length === 0}>
          {order.length === 0
            ? "Nuevo Pedido (0 items)"
            : `Procesar Pedido (${getTotalItems()} items)`}
        </button>
      </main>
    </>
  );
};

export default Menu;
