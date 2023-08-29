import { FC, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createType } from "../../http/deviceAPI";

interface ICreateType {
  show: boolean;
  onHide: () => void;
}

const CreateType: FC<ICreateType> = ({ show, onHide }) => {
  const [value, setValue] = useState("");

  const addType = () => {
    createType({name: value});
    setValue('');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите название типа"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={addType}>
          Добавить
        </Button>
        <Button variant="danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
