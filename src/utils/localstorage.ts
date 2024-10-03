export const getToken = (): string | null => { //  null si no existe
    const token = localStorage.getItem("token");
    return token;
};


export const setToken = (accestoken: string): void => { //  null si no existe
    localStorage.setItem("token", accestoken);
};