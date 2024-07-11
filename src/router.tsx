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
            "./presentation/pages/outsite/Login"
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
            "./presentation/pages/panel/views/Home"
          );
          return { Component: HomePage.default };
        },
      },
      {
        path: "register",
        async lazy() {
          const RegisterPage = await import(
            "./presentation/pages/panel/views/RegisterPage"
          );
          return { Component: RegisterPage.default };
        },
      },
      {
        path:"recordatorios-todos",
        async lazy() {
          const AllTaskRemindersPage = await import ("./presentation/pages/panel/views/AllTasksRemindersPage");
          return{Component: AllTaskRemindersPage.default}
        }
      },
      {
        path:"nuevo-recordatorio",
        async lazy() {
          const AddTaskReminderPage = await import ("./presentation/pages/panel/views/AddTaskReminderPage");
          return{Component: AddTaskReminderPage.default}
        }
      },
      {
        path: "*",
        async lazy() {
          const NotFoudPage = await import(
            "./presentation/pages/outsite/NotFoundPage"
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
          const ProfileUpdatePage = await import('./presentation/pages/panel/views/ProfileUpdatePage');
          return { Component: ProfileUpdatePage.default };
        }
      },
      {
        path: 'estadisticas',
        async lazy(){
          const IncomeExpenseStatistcsPage = await import("./presentation/pages/panel/views/IncomeExpenseStatisticsPage");
          return { Component: IncomeExpenseStatistcsPage.default}
        }
      }
    ],
  },
  {
    path: "*",
    async lazy() {
      const NotfoundPage = await import(
        "./presentation/pages/outsite/NotFoundPage"
      );
      return { element: <NotfoundPage.default /> };
    },
  },
]);
export default router;
