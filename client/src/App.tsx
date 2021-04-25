import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { Chart } from "react-charts";
import useDemoConfig from "./styles/useDemoConfig";

const dataFromApiAdvanced = [
  {
    n: 7,
    coolingFactor: [
      { x: 0, y: 21 },
      { x: 10, y: 20 },
      { x: 20, y: 20 },
      { x: 30, y: 30 },
      { x: 40, y: 60 },
      { x: 50, y: 100 },
      { x: 60, y: 150 },
      { x: 70, y: 170 },
      { x: 80, y: 180 },
      { x: 90, y: 185 },
    ],
    temperature: [
      { x: 0, y: 21 },
      { x: 10, y: 20 },
      { x: 20, y: 20 },
      { x: 30, y: 30 },
      { x: 40, y: 60 },
      { x: 50, y: 100 },
      { x: 60, y: 150 },
      { x: 70, y: 170 },
      { x: 80, y: 180 },
      { x: 90, y: 185 },
    ],
  },
  {
    n: 8,
    coolingFactor: [
      { x: 0, y: 21 },
      { x: 10, y: 20 },
      { x: 20, y: 20 },
      { x: 30, y: 30 },
      { x: 40, y: 60 },
      { x: 50, y: 100 },
      { x: 60, y: 150 },
      { x: 70, y: 170 },
      { x: 80, y: 180 },
      { x: 90, y: 185 },
    ],
    temperature: [
      { x: 0, y: 21 },
      { x: 10, y: 20 },
      { x: 20, y: 20 },
      { x: 30, y: 30 },
      { x: 40, y: 60 },
      { x: 50, y: 100 },
      { x: 60, y: 150 },
      { x: 70, y: 170 },
      { x: 80, y: 180 },
      { x: 90, y: 185 },
    ],
  },
];

const dataFromApi = [
  { x: 0, y: 21 },
  { x: 10, y: 20 },
  { x: 20, y: 20 },
  { x: 30, y: 30 },
  { x: 40, y: 60 },
  { x: 50, y: 100 },
  { x: 60, y: 150 },
  { x: 70, y: 170 },
  { x: 80, y: 180 },
  { x: 90, y: 185 },
];

function App() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="App container py-3">
      <h1 className="heading">Изследването на Елена, Стефани и Валентин</h1>
      <Button className="btn-to-open-modal" color="success" onClick={toggle}>
        Конфигурация на Изследването
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Конфигурирайте параметрите на алгоритъма "Симулирано Закаляване"
        </ModalHeader>
        <ModalBody>
          <Form>
            <Label className="font-weight-bold">Брой Царици</Label>
            <FormGroup>
              <Label>От</Label>
              <Input type="number" name="queensCountFrom" />
            </FormGroup>

            <FormGroup>
              <Label>До</Label>
              <Input type="number" name="queensCountTo" />
            </FormGroup>

            <Label className="font-weight-bold">Начална Температура</Label>
            <FormGroup>
              <Label>От</Label>
              <Input type="number" name="tempFrom" />
            </FormGroup>
            <FormGroup>
              <Label>До</Label>
              <Input type="number" name="tempTo" />
            </FormGroup>
            <FormGroup>
              <Label>Стъпка</Label>
              <Input type="number" name="tempStep" />
            </FormGroup>
            <Label className="font-weight-bold">Коефициент на Охлаждане</Label>
            <FormGroup>
              <Label>От</Label>
              <Input type="number" name="coolingFactorFrom" />
            </FormGroup>
            <FormGroup>
              <Label>До</Label>
              <Input type="number" name="coolingFactorTo" />
            </FormGroup>
            <FormGroup>
              <Label>Стъпка</Label>
              <Input type="number" name="coolingFactorStep" />
            </FormGroup>
            <div className="btn-to-send-data">
              <Button color="success">Изследвай</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <CustomChart inputData={dataFromApi} seriesName="Initial Temperature" />
    </div>
  );
}

const CustomChart = (props: any) => {
  const { data } = useDemoConfig({
    series: 1,
    inputData: props.inputData,
    seriesName: props.seriesName,
  });

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "linear",
        position: "bottom",
        // filterTicks: (ticks) =>
        //   ticks.filter((date) => +timeDay.floor(date) === +date),
      },
      { type: "linear", position: "left" },
    ],
    []
  );

  const series = React.useMemo(
    () => ({
      showPoints: true,
    }),
    []
  );

  return <Chart data={data} series={series} axes={axes} tooltip />;
};

export default App;
