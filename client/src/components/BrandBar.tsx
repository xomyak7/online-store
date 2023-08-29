import { FC } from "react";
import { useDevices } from "../hooks/useDevices";
import { Card, Row } from "react-bootstrap";
import { useActions } from "../hooks/useActions";

const BrandBar: FC = () => {
  const { brands, selectedBrand } = useDevices();
  const { setSelectedBrand } = useActions();

  return (
    <Row className="d-flex mt-2">
      {brands.map(brand => (
        <Card
          key={brand.id}
          className="p-2"
          style={{
            maxWidth: "9%",
            marginRight: 3,
            textAlign: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => {
            setSelectedBrand(brand);
          }}
          border={brand.id === selectedBrand.id ? "danger" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
};

export default BrandBar;
