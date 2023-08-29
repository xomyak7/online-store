import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import DevicePage from "./pages/DevicePage";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/consts";

interface RoutesTypes {
  path: string,
  element: React.ReactNode
}

export const adminRoutes: RoutesTypes[] = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
]

export const authRoutes: RoutesTypes[] = [
  {
    path: BASKET_ROUTE,
    element: <Basket />,
  },
];

export const publicRoutes: RoutesTypes[] = [
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    element: <DevicePage />,
  },
];
