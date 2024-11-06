import { parseJwt } from "../utils/decodeToken";
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
export const sendOrder = async (customerName: string, order: any) => {
    const token = getToken();
    console.log("Token:", token);
    const decodedToken = parseJwt(token)
    const userId = Number(decodedToken.sub);
    // formatear fecha
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            userId: userId,
            client: customerName,         // Nombre del cliente
            products: order.map((product: any) => ({
                qty: product.quantity,    // Cantidad de productos
                product: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    type: product.type,
                    dateEntry: formattedDate,  // Fecha actual para la creación de la orden
                },
            })),
            status: "pending",            // Estado del pedido

            dataEntry: formattedDate,  // Fecha actual para la creación de la orden


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

//modificar el estatus de orden 
export const updateOrderStatus = async (orderId: number, status: string, dateProcessed?: string) => {
    try {
        const response = await fetch(`http://localhost:8080/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status, dateProcessed }),
        });
        if (!response.ok) throw new Error("Error actualizando el estado del pedido");
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error actualizando el estado del pedido:", error);
        throw error;
    }
};
