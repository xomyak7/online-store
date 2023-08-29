import { FC } from "react";
import { IDevice } from "../types/device.types";
import { Card, Col, Image } from "react-bootstrap";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

interface IDeviceItem {
  device: IDevice;
}

const DeviceItem: FC<IDeviceItem> = ({ device }) => {
  const navigate = useNavigate();

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
    >
      <Card style={{ width: "100%", cursor: "pointer" }} border={"dark"}>
        <Image
          src={process.env.REACT_APP_API_URL + device.img}
          width={"100%"}
          height={215}
          style={{ borderRadius: "5px 5px 0 0" }}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center ms-1 me-1">
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {device.name}
          </div>
          <div className="d-flex align-items-center">
            <div className="ms-2">{device.rating}</div>
            <Image src={star} width={18} height={18}></Image>
          </div>
        </div>
        <div className="ms-1">{new Intl.NumberFormat('ru-RU').format(device.price) + " руб."}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
