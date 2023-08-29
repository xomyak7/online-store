import { FC, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useDevices } from "../../hooks/useDevices";
import { useActions } from "../../hooks/useActions";
import { createDevice, fetchBrands, fetchDevices, fetchTypes } from "../../http/deviceAPI";
import { IBrand, IType, IInfo } from "../../types/device.types";

interface ICreateDevice {
  show: boolean;
  onHide: () => void;
}

const CreateDevice: FC<ICreateDevice> = ({ show, onHide }) => {
  const { getTypes, getBrands } = useActions();
  const { types, brands } = useDevices();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState<File>({} as File);
  const [selectedTypeDevice, setSelectedTypeDevice] = useState<IType>(
    {} as IType
  );
  const [selectedBrandDevice, setSelectedBrandDevice] = useState<IBrand>(
    {} as IBrand
  );
  const [info, setInfo] = useState<IInfo[]>([]);

  useEffect(() => {
    fetchTypes().then(data => getTypes(data));
    fetchBrands().then(data => getBrands(data));
  }, []);

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const removeInfo = (number: number) => {
    setInfo(info.filter(i => i.number !== number));
  };

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', `${selectedBrandDevice.id}`);
    formData.append('typeId', `${selectedTypeDevice.id}`);
    formData.append('info', JSON.stringify(info));
    createDevice(formData).then(() => onHide())
  }

  const close = () => {
    onHide();
    setName("");
    setPrice(0);
    setSelectedTypeDevice({} as IType);
    setSelectedBrandDevice({} as IBrand);
    setFile({} as File);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {selectedTypeDevice.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map(type => (
                <Dropdown.Item
                  onClick={() => setSelectedTypeDevice(type)}
                  active={selectedTypeDevice.id === type.id}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {selectedBrandDevice.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map(brand => (
                <Dropdown.Item
                  onClick={() => setSelectedBrandDevice(brand)}
                  active={selectedBrandDevice.id === brand.id}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            type="number"
            placeholder="Введите стоимость устройства"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant="dark" onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map(i => (
            <Row key={i.number} className="mt-3">
              <Col md={4}>
                <Form.Control
                  placeholder="Введите название свойства"
                  value={i.title}
                  onChange={e => changeInfo("title", e.target.value, i.number)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Введите описание свойства"
                  value={i.description}
                  onChange={e => changeInfo("description", e.target.value, i.number)}
                />
              </Col>
              <Col md={4}>
                <Button variant="danger" onClick={() => removeInfo(i.number)}>
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={addDevice}>
          Добавить
        </Button>
        <Button variant="danger" onClick={close}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
