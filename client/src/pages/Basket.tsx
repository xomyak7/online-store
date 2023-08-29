import { FC } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BasketItem from "../components/BasketItem";
import { useUser } from "../hooks/useUser";

const Basket: FC = () => {
  const { basket } = useUser();
  console.log(basket)

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h2>Корзина</h2>
          {basket.count === 0 ? (
            <h2>В корзине нет товаров</h2>
          ) : (
            basket.devices.map(device => (
              <BasketItem key={device.id} device={device} />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Basket;
