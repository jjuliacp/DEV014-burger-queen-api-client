import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localstorage";

interface PrivateRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = getToken();
  console.log("token de la api ", token);
  // Si no hay token, es decir logueado, redirige a /login
  if (!token) {
    return <Navigate to="/" />;
  }

  // Si hay token, permite el acceso a la ruta
  return children;
};

export default ProtectedRoute;
