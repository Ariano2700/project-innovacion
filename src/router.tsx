import { Navigate, createBrowserRouter } from "react-router-dom";
import NotfoundPage from "./presentation/pages/outsite/NotFoundPage/NotfoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const AuthProtectedRoute = await import(
        "./presentation/protected-routes/AuthProtectedRoute"
      );
      const OutsideWrapper = await import(
        "./presentation/pages/outsite/OutsideWrapper"
      );

      const AuthProtectedRouteEl = AuthProtectedRoute.default;

      return {
        element: (
          <AuthProtectedRouteEl>
            <OutsideWrapper.default />
          </AuthProtectedRouteEl>
        ),
      };
    },
    children: [
      {
        path: "/iniciar-sesion",
        async lazy() {
          const LoginPage = await import(
            "./presentation/pages/outsite/Login/Login"
          );
          return { Component: LoginPage.default };
        },
      },
    ],
  },
  {
    path: "/panel",
    async lazy() {
      const PanelProtectedRoute = await import(
        "./presentation/protected-routes/PanelProtectedRoute"
      );
      const PanelWrapper = await import(
        "./presentation/pages/panel/PanelWrapper"
      );

      const PanelProtectedRouteEl = PanelProtectedRoute.default;

      return {
        element: (
          <PanelProtectedRouteEl>
            <PanelWrapper.default />
          </PanelProtectedRouteEl>
        ),
      };
    },
    children: [
      {
        index: true,
        element: <Navigate to="/panel/inicio" />,
      },
      {
        path: "inicio",
        async lazy() {
          const HomePage = await import(
            "./presentation/pages/panel/views/Home/HomePage"
          );
          return { Component: HomePage.default };
        },
      },
      {
        path: "register",
        async lazy() {
          const RegisterPage = await import(
            "./presentation/pages/panel/views/Register/Register"
          );
          return { Component: RegisterPage.default };
        },
      },
    ],
  },
  {
    path:"*",
    element:<NotfoundPage/>
  }
]);
export default router;
