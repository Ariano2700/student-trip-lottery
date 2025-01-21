import { Navigate, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const SearchPage = await import(
        "./presentation/pages/outsite/SearchPage"
      );
      return { Component: SearchPage.default };
    },
  },
  {
    path: "/promotion",
    async lazy() {
      const PromotionPage = await import(
        "./presentation/pages/outsite/Promotion"
      );
      return { Component: PromotionPage.default };
    },
  },
  {
    path: "iniciar-sesion",
    async lazy() {
      const LoginPage = await import("./presentation/pages/outsite/Login");
      return { Component: LoginPage.default };
    },
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
            "./presentation/pages/panel/views/home"
          );
          return { Component: HomePage.default };
        },
      },
      {
        path: "todos-los-participantes",
        async lazy() {
          const AllParticipantsPage = await import(
            "./presentation/pages/panel/views/AllStickers"
          );
          return { Component: AllParticipantsPage.default };
        },
      },
      {
        path: "numeros-faltantes",
        async lazy() {
          const MissingLotteryNumbersPage = await import(
            "./presentation/pages/panel/views/MissingStickersNumbers"
          );
          return { Component: MissingLotteryNumbersPage.default };
        },
      },
      {
        path: "*",
        async lazy() {
          const NotFoudPage = await import(
            "./presentation/pages/outsite/NotFoundPage"
          );
          return { Component: NotFoudPage.default };
        },
      },
    ],
  },
  {
    path: "/ticket/:uid",
    async lazy() {
      const TicketPage = await import(
        "./presentation/pages/outsite/TicketPage"
      );
      return { Component: TicketPage.default };
    },
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
