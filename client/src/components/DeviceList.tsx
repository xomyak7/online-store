import { FC } from "react";
import { useDevices } from "../hooks/useDevices";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList: FC = () => {
  const { devices } = useDevices();
  
  return <Row className="d-flex mb-3">
    {devices.map(device => <DeviceItem key={device.id} device={device} />)}
  </Row>;
};

export default DeviceList;
