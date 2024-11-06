import { Navigate } from "react-router-dom";
import { getToken, getUserRole } from "../utils/localstorage";

interface PrivateRouteProps {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRole,
}) => {
  const token = getToken();
  const userRole = getUserRole();
  console.log("token de la api ", token);

  // Si no hay token, es decir logueado, redirige a /login
  if (!token) {
    return <Navigate to="/" />;
  }
  if (requiredRole && requiredRole !== userRole) {
    return <Navigate to="/403" />; // Redirecciona a la página de error 403
  }

  // Si hay token, permite el acceso a la ruta
  return children;
};

export default ProtectedRoute;
