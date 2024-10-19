// Función para decodificar el JWT y extraer el payload
export const parseJwt = (token: string | null) => {
    if (!token) {
        throw new Error("No token provided");
    }

    // Los tokens JWT tienen 3 partes separadas por '.'
    const base64Url = token.split('.')[1];
    if (!base64Url) {
        throw new Error("Invalid token format");
    }

    // Decodifica la parte del payload (que está en base64)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );

    // Retorna el objeto JSON con los datos del payload
    return JSON.parse(jsonPayload);
};
