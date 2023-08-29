import { FC, useState, useEffect } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import bigStar from "../assets/bigStar.png";
import { IDevice } from "../types/device.types";
import { fetchOneDevice } from "../http/deviceAPI";
import { useActions } from "../hooks/useActions";
import { IBasketDevice } from "../types/user.types";
import { useUser } from "../hooks/useUser";
import { LOGIN_ROUTE } from "../utils/consts";

const init: IDevice = {
  id: 0,
  name: "",
  price: 0,
  rating: 0,
  img: "",
  brandId: 0,
  typeId: 0,
  info: [],
};

const DevicePage: FC = () => {
  const { addToBasket } = useActions();
  const { isAuth } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const idDevice = Number(params.id);
  const [device, setDevice] = useState<IDevice>(init);
  useEffect(() => {
    fetchOneDevice(idDevice).then(data => {
      setDevice(data);
    });
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2 style={{ textAlign: "center" }}>{device.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) center center/cover no-repeat`,
                width: 240,
                height: 240,
                fontSize: 64,
              }}
            >
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightblue",
            }}
          >
            <h3>От {new Intl.NumberFormat('ru-RU').format(device.price)} руб.</h3>
            <Button
              onClick={() => {
                isAuth ? addToBasket(device) : navigate(LOGIN_ROUTE);
              }}
            >
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.title}
            style={{
              background: index % 2 === 0 ? "#F3F3F3" : "#FFF",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
