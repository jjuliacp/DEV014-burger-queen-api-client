import { getToken } from "../utils/localstorage";

// Función para obtener productos del backend
export const fetchProducts = async () => {
    const response = await fetch("http://localhost:8080/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching products: ${response.status}`);
    }

    return await response.json();
};

// Función para enviar el pedido a la cocina
export const sendOrder = async (customerName: string, order: any, total: number) => {
    const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            customerName,
            products: order.map((product: any) => ({
                id: product.id,
                name: product.name,
                quantity: product.quantity,
            })),
            total,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error sending order: ${response.status}`);
    }

    return await response.json();
};