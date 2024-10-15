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
            client: customerName,         // Nombre del cliente
            dateEntry: new Date().toISOString(),  // Fecha actual para la creación de la orden
            products: order.map((product: any) => ({
                product: {
                    qty: product.quantity,    // Cantidad de productos
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    type: product.type,
                },
            })),
            status: "pending",            // Estado del pedido

            total,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error sending order: ${response.status}`);
    }

    return await response.json();
};
// Función para obtener los pedidos 
export const getOrders = async () => {
    try {
        const response = await fetch("http://localhost:8080/orders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,  // Suponiendo que tienes una función para obtener el token
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching orders: ${response.status}`);
        }

        const data = await response.json();
        return data;  // Retorna los datos de los pedidos
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};