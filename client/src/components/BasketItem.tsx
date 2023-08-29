import { FC, useMemo } from "react";
import { IBasketDevice } from "../types/user.types";
import { Card, Image, Row } from "react-bootstrap";
import { useActions } from "../hooks/useActions";
import { BsTrash } from "react-icons/bs";
import { IconContext } from "react-icons";
import { DEVICE_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

interface IBasketItem {
  device: IBasketDevice;
}

const BasketItem: FC<IBasketItem> = ({ device }) => {
  const { addToBasket, removeOneFromBasket, removeFromBasket } = useActions();
  const navigate = useNavigate();
  const value = useMemo(() => device.count * device.price, [device.count]);

  return (
    <Row>
      {device.count > 0 ? (
        <Card className="mb-4" border={"gray"}>
          <div className="d-flex flex-nowrap m-3">
            <Image
              src={process.env.REACT_APP_API_URL + device.img}
              style={{ width: 200, height: 200 }}
            />
            <div
              className="d-flex justify-content-between"
              style={{ flexGrow: 1 }}
            >
              <div className="ms-3" style={{ flexGrow: 1 }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h2
                    className="device__click"
                    onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
                  >
                    {device.name}
                  </h2>
                  <IconContext.Provider
                    value={{
                      color: "red",
                      className: "icon__delete",
                      size: 22,
                    }}
                  >
                    <div
                    onClick={() => removeFromBasket(device)}>
                      <BsTrash />
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex button-cart">
                    <div
                      className="ps-3 pe-3 button-cart__click"
                      onClick={() => removeOneFromBasket(device)}
                    >
                      -
                    </div>
                    <p className="m-0">{device.count}</p>
                    <div
                      className="ps-3 pe-3 button-cart__click"
                      onClick={() => addToBasket(device)}
                    >
                      +
                    </div>
                  </div>
                  <h5 className="m-0" style={{ fontSize: 23 }}>
                    {new Intl.NumberFormat('ru-RU').format(value) + " ₽"}
                  </h5>
                </div>
                <p style={{ fontSize: 16, color: "gray", marginTop: 3 }}>
                  {new Intl.NumberFormat('ru-RU').format(device.price) + " ₽/шт"}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        ""
      )}
    </Row>
  );
};

export default BasketItem;
