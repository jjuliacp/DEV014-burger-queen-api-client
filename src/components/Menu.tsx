import { useEffect, useState } from "react";
import "../styles/Menu.css";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import OrderSummary from "./OrderSummary";
import { fetchProducts, sendOrder } from "../Services/api";

// Interfaz para definir la estructura de un producto
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
}

const Menu: React.FC = () => {
  const [order, setOrder] = useState<Array<Product>>([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [selected, setSelected] = useState(""); // estado para type
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        console.log(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    loadProducts(); // llamar a la funcion para obtener productos
  }, []); // para que efecto se ejecute una sola vez

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

  const increaseQuantity = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) addProduct(product);
  };

  // Función para contar el número total de items en el pedido
  const getTotalItems = () => {
    return order.reduce((sum, product) => sum + product.quantity, 0);
  };

  //filtrado
  const filteredProducts = products.filter(
    (product) => selected === "" || product.type === selected
  );
  //   función para enviar el pedido a la cocina
  const processOrder = () => {
    setIsOpen((prevState) => !prevState);
  };
  const sendOrderToKitchen = async () => {
    if (!customerName.trim()) {
      alert("Por favor, ingrese el nombre del cliente.");
      return;
    }
    if (order.length === 0) {
      return;
    }

    try {
      const result = await sendOrder(customerName, order, total);
      console.log("Pedido enviado exitosamente:", result);
      // Limpiar el pedido después de enviarlo
      setOrder([]);
      setTotal(0);
      setCustomerName(""); // Limpia el nombre del cliente
      setIsOpen(true); // Abrir el resumen del pedido
    } catch (error) {
      console.error("Error enviando el pedido:", error);
    }
  };

  // Render del componente
  return (
    <>
      <section className="menuContainer">
        <h1>Menú</h1>

        <div className="menuToggle">
          <button
            className={`toggleButton ${selected === "" ? "active" : ""}`}
            onClick={() => setSelected("")}
          >
            Todo
          </button>
          <button
            className={`toggleButton ${
              selected === "Breakfast" ? "active" : ""
            }`}
            onClick={() => setSelected("Breakfast")}
          >
            Desayunos
          </button>
          <button
            className={`toggleButton ${selected === "Lunch" ? "active" : ""}`}
            onClick={() => setSelected("Lunch")}
          >
            Almuerzo/Cena
          </button>
        </div>

        <section className="menuSection">
          {/* <h2 className="menuSectionTittle">Hamburguesas</h2> */}
          {filteredProducts.map((product, index) => (
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
          {/* Botón para enviar pedido (sin funcionalidad por ahora) */}
        </section>
        <button
          disabled={order.length === 0}
          onClick={processOrder} // Llama a la función cuando el botón es presionado
        >
          {order.length === 0
            ? "Nuevo Pedido (0 items)"
            : `Procesar Pedido (${getTotalItems()} items)`}
        </button>
        {isOpen && (
          <OrderSummary
            order={order}
            total={total}
            isOpen={isOpen}
            customerName={customerName}
            setCustomerName={setCustomerName}
            removeProduct={removeProduct}
            increaseQuantity={increaseQuantity}
            sendOrderBtnClick={sendOrderToKitchen}
          />
        )}
      </section>
    </>
  );
};

export default Menu;
