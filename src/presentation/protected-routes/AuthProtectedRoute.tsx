import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Loader } from "../components/loader/Loader";

type AuthProtectedRouteProps = {
  children: JSX.Element;
};
const AuthProtectedRoute = ({ children }: AuthProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();

  if (user) {
    return <Navigate to="/panel/inicio" />;
  }
  if (loading) {
    return <Loader />;
  }

  if (pathname === "/panel/iniciar-sesion" || pathname === "/") {
    return <Navigate to="/iniciar-sesion" />;
  }

  return children;
};

export default AuthProtectedRoute;
