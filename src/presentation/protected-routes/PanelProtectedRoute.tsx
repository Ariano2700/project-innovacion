import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Loader } from "../components/loader/Loader";
import  React, { useEffect, useState } from "react";
type PanelProtectedRouteProps = {
    children: React.ReactNode; // Usa React.ReactNode para permitir cualquier tipo de nodo como children
  };
  
  const PanelProtectedRoute = ({ children }: PanelProtectedRouteProps) => {
    const { user, loading, role } = useAuth();
    const navigate = useNavigate();
    const [simulatedLoading, setSimulatedLoading] = useState(true);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setSimulatedLoading(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }, []);
  
    if (!user && !loading) {
      return <Navigate to={"/iniciar-sesion"} />;
    }
    if (loading) {
      return <Loader />;
    }
  
    // Filtra los elementos que no tienen propiedades antes de acceder a props
    const isAllowed = React.Children.toArray(children).filter(child => React.isValidElement(child)).some(
      (child: any) => !child.props.allowedRoles || child.props.allowedRoles.includes(role)
    );
  
    if (!loading && !simulatedLoading) {
      if (!isAllowed) {
        navigate("/inicio");
        return null;
      }
    }
    return <>{children}</>; // Renderiza children solo si están permitidos
  };
  
  export default PanelProtectedRoute;
