import { FC } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../routes";
import ErrorPage from "../pages/ErrorPage";
import Shop from "../pages/Shop";
import NavBar from "./NavBar";
import { useUser } from "../hooks/useUser";

const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const AppRouter: FC = () => {
  const { isAuth, user } = useUser();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout />} errorElement={<ErrorPage />}>
          <Route path="/" element={<Shop />} errorElement={<ErrorPage />} />

          {user.role === "ADMIN" &&
            adminRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

          {isAuth &&
            authRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}

          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
