import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Loader } from "../components/loader/Loader";
import React, { useEffect, useState } from "react";
type PanelProtectedRouteProps = {
  children: React.ReactNode; // Usa React.ReactNode para permitir cualquier tipo de nodo como children
};

const PanelProtectedRoute = ({ children }: PanelProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [simulatedLoading, setSimulatedLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSimulatedLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/iniciar-sesion");
    }
  }, [user, loading, navigate, simulatedLoading]);

  if (loading || simulatedLoading) {
    return <Loader />;
  }

  return <>{children}</>; // Renderiza children solo si están permitidos
};

export default PanelProtectedRoute;
