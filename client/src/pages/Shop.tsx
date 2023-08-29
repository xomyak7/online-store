import { FC, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import { useActions } from "../hooks/useActions";
import Pages from "../components/Pages";
import { useDevices } from "../hooks/useDevices";

const Shop: FC = () => {
  const { getTypes, getBrands, getDevices, setTotalCount } = useActions();
  const {currentPage, limit, selectedBrand, selectedType} = useDevices()

  useEffect(() => {
    fetchTypes().then(data => getTypes(data));
    fetchBrands().then(data => getBrands(data));
  }, []);

  useEffect(() => {
    fetchDevices(selectedType.id, selectedBrand.id, currentPage, limit).then(data => {
      getDevices(data.rows);
      setTotalCount(data.count);
    });
  }, [currentPage, selectedType, selectedBrand])

  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
