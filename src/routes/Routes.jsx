import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Login from "../components/Login";
import Page404 from "../components/Page404";
import MyQueries from "../components/MyQueries";
import AddQuery from "../components/AddQuery";
import AllQueries from "../components/AllQueries";
import QueryDetails from "../components/QueryDetails";
import MyRecommendation from "../components/MyRecommendation";
import RecommendationsForMe from "../components/RecommendationsForMe";
import Register from "../components/Register";
import PrivateRoutes from "./PrivateRoutes";
import UpdateQuery from "../components/UpdateQuery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/myQueries",
        element: (
          <PrivateRoutes>
            <MyQueries />
          </PrivateRoutes>
        ),
      },
      {
        path: "/addQuery",
        element: (
          <PrivateRoutes>
            <AddQuery />
          </PrivateRoutes>
        ),
      },
      {
        path: "/allqueries",
        element: <AllQueries />,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoutes>
            <QueryDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/myrecommendations",
        element: (
          <PrivateRoutes>
            <MyRecommendation />
          </PrivateRoutes>
        ),
      },
      {
        path: "/recommendationsforme",
        element: (
          <PrivateRoutes>
            <RecommendationsForMe />
          </PrivateRoutes>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/update/:id",
        element: <UpdateQuery />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
