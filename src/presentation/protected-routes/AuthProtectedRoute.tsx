import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Loader } from "../components/loader/Loader";

type AuthProtectedRouteProps = {
    children: JSX.Element;
  }
  const AuthProtectedRoute = ({ children }: AuthProtectedRouteProps) => {
    const {user, loading} = useAuth();
    const { pathname } = useLocation();

    // useEffect(() =>{
    //   if (!user && pathname.startsWith("panel")) {
    //     navigate("/iniciar-sesion", {replace: true})
    //   }
    // })
  
    if (user) {
      return <Navigate to='/panel/inicio' />;
    }
    if (loading) {
      return (
        <Loader/>
      )
    }
    
    if (pathname === ("/panel/iniciar-sesion") || pathname === '/') {
      return <Navigate to='/iniciar-sesion' />;
    }
    // if (pathname.startsWith("/panel") && !user) {
    //   return <Navigate to={"/iniciar-sesion"}/>      
    // }
  
    return children;
  }
  
  export default AuthProtectedRoute;