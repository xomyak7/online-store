import { FC, useEffect, useState } from "react";
import { Container, Form, Card, Row, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { IUser } from "../types/user.types";
import { useActions } from "../hooks/useActions";
import { useUser } from "../hooks/useUser";

const Auth: FC = () => {
  const navigate = useNavigate();
  const {isAuth} = useUser();
  const { setAuthUser } = useActions();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuth) {
      navigate(SHOP_ROUTE);
    }
  }, [])

  const click = async (event: any) => {
    try {
      event.preventDefault();
      let data: IUser;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      setAuthUser(data)
      navigate(SHOP_ROUTE);
    } catch (e: any) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            type="password"
            placeholder="Введите ваш пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between mt-3">
            {isLogin ? (
              <div style={{ maxWidth: "50%" }}>
                Нет аккаунта?{" "}
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={REGISTRATION_ROUTE}
                >
                  Зарегистрируйся!
                </NavLink>
              </div>
            ) : (
              <div style={{ maxWidth: "50%" }}>
                Есть аккаунт?{" "}
                <NavLink style={{ textDecoration: "none" }} to={LOGIN_ROUTE}>
                  Войдите!
                </NavLink>
              </div>
            )}
            <Button
              variant="outline-primary"
              style={{ maxWidth: "25%", marginRight: 11 }}
              type="submit"
              onClick={e => click(e)}
            >
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
