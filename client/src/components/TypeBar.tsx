import { FC } from "react";
import { ListGroup } from "react-bootstrap";
import { useDevices } from "../hooks/useDevices";
import { useActions } from "../hooks/useActions";

const TypeBar: FC = () => {
  const { types, selectedType } = useDevices();
  const { setSelectedType } = useActions();
  return (
    <ListGroup className="mt-2">
      {types.map(type => (
        <ListGroup.Item
          key={type.name}
          style={{ cursor: "pointer", userSelect: "none" }}
          active={type.id === selectedType.id}
          onClick={() => {
            setSelectedType(type);
          }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
