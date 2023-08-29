import { FC, useMemo } from "react";
import { useActions } from "../hooks/useActions";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  NavLink,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { useUser } from "../hooks/useUser";
import { BsCart2 } from "react-icons/bs";

const logOut = (
  logOutUser: ActionCreatorWithoutPayload,
  navigate: NavigateFunction,
  pathname: string
) => {
  logOutUser();
  localStorage.removeItem("token");
  if (pathname === ADMIN_ROUTE || pathname === BASKET_ROUTE) {
    navigate(SHOP_ROUTE);
  }
};

const NavBar: FC = () => {
  const { isAuth, user, basket } = useUser();
  const { logOutUser } = useActions();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const value = useMemo(
    () =>
      basket.devices.reduce(
        (acc, device) => acc + device.price * device.count,
        0
      ),
    [basket.count]
  );

  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <NavLink
          style={{ color: "white", textDecoration: "none" }}
          to={SHOP_ROUTE}
        >
          КупиДевайс
        </NavLink>
        {isAuth ? (
          <Nav className="ms-auto" style={{ color: "white" }}>
            {user.role === "ADMIN" ? (
              <Button className="me-3" onClick={() => navigate(ADMIN_ROUTE)}>
                Админ панель
              </Button>
            ) : (
              ""
            )}
            <Button
              className="me-3 d-flex flex-nowrap"
              style={{ position: "relative" }}
              onClick={() => navigate(BASKET_ROUTE)}
            >
              <BsCart2 size={20} />
              {basket.count === 0 ? (
                <span> Корзина</span>
              ) : (
                <div>
                  <span className="circle">{basket.count}</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;{new Intl.NumberFormat('ru-RU').format(value)} ₽</span>
                </div>
              )}
            </Button>
            <Button
              className="me-3"
              onClick={() => logOut(logOutUser, navigate, pathname)}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto" style={{ color: "white" }}>
            <Button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
