export const getToken = (): string | null => { //  null si no existe
    const token = localStorage.getItem("token");
    return token;
};

export const getUserRole = () => localStorage.getItem("role") ?? "guest";
export const setToken = (accestoken: string, role: string): void => { //  null si no existe
    localStorage.setItem("token", accestoken);
    localStorage.setItem("role", role);
};