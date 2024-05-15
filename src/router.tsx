import { Navigate, createBrowserRouter } from "react-router-dom";

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
      {
        path:"prueba",
        async lazy() {
          const pruebaPage = await import ("./presentation/pages/panel/views/pruebaXD/index");
          return{Component: pruebaPage.default}
        }
      },
      {
        path: "*",
        async lazy() {
          const NotFoudPage = await import(
            "./presentation/pages/outsite/NotFoundPage/NotfoundPage"
          );
          return { Component: NotFoudPage.default}
        },
      },
      {
        path: 'usuario/perfil',
        async lazy() {
          const ProfilePage = await import('./presentation/pages/panel/views/ProfilePage');
          return { Component: ProfilePage.default };
        }
      },
      {
        path: 'usuario/actualizar-perfil',
        async lazy() {
          const ProfileUpdatePage = await import('./presentation/pages/panel/views/ProfileUpdate');
          return { Component: ProfileUpdatePage.default };
        }
      }
    ],
  },
  {
    path: "*",
    async lazy() {
      const NotfoundPage = await import(
        "./presentation/pages/outsite/NotFoundPage/NotfoundPage"
      );
      return { element: <NotfoundPage.default /> };
    },
  },
]);
export default router;
