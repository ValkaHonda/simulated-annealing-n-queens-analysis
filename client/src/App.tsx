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
  FormFeedback,
  Spinner,
} from "reactstrap";
import { Chart } from "react-charts";
import useDemoConfig from "./styles/useDemoConfig";

const isNumber = (num?: number): num is number => {
  return Number(num) === 0 ? true : !!Number(num);
};

// const dataFromApiAdvanced = [
//   {
//     n: 7,
//     coolingFactor: [
//       { x: 0, y: 21 },
//       { x: 10, y: 20 },
//       { x: 20, y: 20 },
//       { x: 30, y: 30 },
//       { x: 40, y: 60 },
//       { x: 50, y: 100 },
//       { x: 60, y: 150 },
//       { x: 70, y: 170 },
//       { x: 80, y: 180 },
//       { x: 90, y: 185 },
//     ],
//     temperature: [
//       { x: 0, y: 21 },
//       { x: 10, y: 20 },
//       { x: 20, y: 20 },
//       { x: 30, y: 30 },
//       { x: 40, y: 60 },
//       { x: 50, y: 100 },
//       { x: 60, y: 150 },
//       { x: 70, y: 170 },
//       { x: 80, y: 180 },
//       { x: 90, y: 185 },
//     ],
//   },
//   {
//     n: 8,
//     coolingFactor: [
//       { x: 0, y: 31 },
//       { x: 10, y: 30 },
//       { x: 20, y: 40 },
//       { x: 30, y: 40 },
//       { x: 40, y: 70 },
//       { x: 50, y: 110 },
//       { x: 60, y: 160 },
//       { x: 70, y: 180 },
//       { x: 80, y: 190 },
//       { x: 90, y: 195 },
//     ],
//     temperature: [
//       { x: 0, y: 21 },
//       { x: 10, y: 20 },
//       { x: 20, y: 20 },
//       { x: 30, y: 30 },
//       { x: 40, y: 60 },
//       { x: 50, y: 100 },
//       { x: 60, y: 150 },
//       { x: 70, y: 170 },
//       { x: 80, y: 180 },
//       { x: 90, y: 185 },
//     ],
//   },
// ];

// const dataFromApi = [
//   { x: 0, y: 21 },
//   { x: 10, y: 20 },
//   { x: 20, y: 20 },
//   { x: 30, y: 30 },
//   { x: 40, y: 60 },
//   { x: 50, y: 100 },
//   { x: 60, y: 150 },
//   { x: 70, y: 170 },
//   { x: 80, y: 180 },
//   { x: 90, y: 185 },
// ];

const groupBy = (parameterName: string) => (object: any) => ({
  n: object.n,
  data: object[parameterName],
});

function App() {
  const [modal, setModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [dataFromApi, setDataFromAPI] = useState([]);
  const [formState, setFormState] = useState<{
    queensCountFrom?: number;
    queensCountTo?: number;
    tempFrom?: number;
    tempTo?: number;
    tempStep?: number;
    coolingFactorFrom?: number;
    coolingFactorTo?: number;
    coolingFactorStep?: number;
    isSubmitButtonClicked: boolean;
  }>({ isSubmitButtonClicked: false });

  const {
    queensCountFrom,
    queensCountTo,
    tempFrom,
    tempTo,
    tempStep,
    coolingFactorFrom,
    coolingFactorTo,
    coolingFactorStep,
    isSubmitButtonClicked,
  } = formState;

  const toggle = () => setModal(!modal);

  const temperatureResults: any =
    dataFromApi.length > 0
      ? dataFromApi.map(groupBy("temperature"))
      : undefined;

  const coolingFactorResults: any =
    dataFromApi.length > 0
      ? dataFromApi.map(groupBy("coolingFactor"))
      : undefined;

  const isQueensCountFromInvalid =
    (isSubmitButtonClicked && !queensCountFrom) ||
    (isNumber(queensCountFrom) && isNumber(queensCountTo)
      ? queensCountFrom < 4 || queensCountFrom > queensCountTo
      : false);

  const isQueensCountToInvalid =
    (isSubmitButtonClicked && !queensCountTo) ||
    (isNumber(queensCountFrom) && isNumber(queensCountTo)
      ? queensCountFrom < 4 || queensCountFrom > queensCountTo
      : false);

  const isTempFromInvalid =
    (isSubmitButtonClicked && !tempFrom) ||
    (isNumber(tempFrom) && isNumber(tempTo) ? tempFrom > tempTo : false);

  const isTempToInvalid =
    (isSubmitButtonClicked && !tempTo) ||
    (isNumber(tempFrom) && isNumber(tempTo) ? tempFrom > tempTo : false);

  const isTempStepInvalid =
    (isSubmitButtonClicked && !tempStep) ||
    (isNumber(tempStep) ? tempStep <= 0 : false);

  const isCoolingFactorFromInvalid =
    (isSubmitButtonClicked && !coolingFactorFrom) ||
    (isNumber(coolingFactorFrom) && isNumber(coolingFactorTo)
      ? coolingFactorFrom > coolingFactorTo ||
        coolingFactorFrom < 0 ||
        coolingFactorFrom > 1
      : false);

  const isCoolingFactorToInvalid =
    (isSubmitButtonClicked && !coolingFactorTo) ||
    (isNumber(coolingFactorFrom) && isNumber(coolingFactorTo)
      ? coolingFactorFrom > coolingFactorTo ||
        coolingFactorFrom < 0 ||
        coolingFactorFrom > 1
      : false);

  const isCoolingFactorStepInvalid =
    (isSubmitButtonClicked && !coolingFactorStep) ||
    (isNumber(coolingFactorStep) ? coolingFactorStep <= 0 : false);

  const areAllFieldsFilled =
    isNumber(queensCountFrom) &&
    isNumber(queensCountTo) &&
    isNumber(tempFrom) &&
    isNumber(tempTo) &&
    isNumber(tempStep) &&
    isNumber(coolingFactorFrom) &&
    isNumber(coolingFactorTo) &&
    isNumber(coolingFactorStep);

  const isFormInvalid =
    isQueensCountFromInvalid ||
    isQueensCountToInvalid ||
    isTempFromInvalid ||
    isTempToInvalid ||
    isTempStepInvalid ||
    isCoolingFactorFromInvalid ||
    isCoolingFactorToInvalid;

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
          <Form
            onChange={(e: any) => {
              if (e.target) {
                setFormState({
                  ...formState,
                  [e.target.name]: isNumber(e.target.value)
                    ? Number(e.target.value)
                    : undefined,
                });
              }
            }}
          >
            <Label className="font-weight-bold">Брой Царици</Label>
            <FormGroup>
              <Label>От</Label>
              <Input
                value={queensCountFrom}
                invalid={isQueensCountFromInvalid}
                type="number"
                name="queensCountFrom"
              />
              <FormFeedback>
                Трябва да е поне 4 и да е по-малко или равно на крайния брой
                царици.
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label>До</Label>
              <Input
                invalid={isQueensCountToInvalid}
                value={queensCountTo}
                type="number"
                name="queensCountTo"
              />
              <FormFeedback>
                Трябва да е поне 4 и да е по-голямо или равно на началния брой
                царици.
              </FormFeedback>
            </FormGroup>

            <Label className="font-weight-bold">Начална Температура</Label>
            <FormGroup>
              <Label>От</Label>
              <Input
                value={tempFrom}
                invalid={isTempFromInvalid}
                type="number"
                name="tempFrom"
              />
              <FormFeedback>
                Трябва да е по-малко или равно на крайния диапазон на
                температура.
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>До</Label>
              <Input
                value={tempTo}
                invalid={isTempToInvalid}
                type="number"
                name="tempTo"
              />
              <FormFeedback>
                Трябва да е повече или равно на началния диапазон на
                температура.
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Стъпка</Label>
              <Input
                value={tempStep}
                invalid={isTempStepInvalid}
                type="number"
                name="tempStep"
              />
              <FormFeedback>Трябва да е положително число.</FormFeedback>
            </FormGroup>
            <Label className="font-weight-bold">Коефициент на Охлаждане</Label>
            <FormGroup>
              <Label>От</Label>
              <Input
                value={coolingFactorFrom}
                invalid={isCoolingFactorFromInvalid}
                type="number"
                name="coolingFactorFrom"
              />
              <FormFeedback>
                Трябва да е по-малко или равно на крайния диапазон на коефициент
                за охлаждане и да е в диапазона [0, 1].
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>До</Label>
              <Input
                value={coolingFactorTo}
                invalid={isCoolingFactorToInvalid}
                type="number"
                name="coolingFactorTo"
              />
              <FormFeedback>
                Трябва да е по-голямо или равно на началния диапазон на
                коефициент за охлаждане и да е в диапазона [0, 1].
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Стъпка</Label>
              <Input
                invalid={isCoolingFactorStepInvalid}
                value={coolingFactorStep}
                type="number"
                name="coolingFactorStep"
              />
              <FormFeedback>Трябва да е в диапазона [0, 1].</FormFeedback>
            </FormGroup>
            <div className="btn-to-send-data">
              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setFormState((prev) => ({
                    ...prev,
                    isSubmitButtonClicked: true,
                  }));

                  const isFormFullyFilled =
                    !isFormInvalid && areAllFieldsFilled;

                  if (isFormFullyFilled) {
                    setIsFetching(true);
                    fetch(
                      `http://localhost:8080/data?queensCountFrom=${queensCountFrom}&queensCountTo=${queensCountTo}&tempFrom=${tempFrom}&tempTo=${tempTo}&tempStep=${tempStep}&coolingFactorFrom=${coolingFactorFrom}&coolingFactorTo=${coolingFactorTo}&coolingFactorStep=${coolingFactorStep}`
                    )
                      .then((res) => res.json())
                      .then((receiveData) => {
                        setDataFromAPI(receiveData);
                        console.log({ receiveData });

                        setIsFetching(false);
                      })
                      .catch((err) => {
                        console.log("FAILED REQUEST:", err);
                        setIsFetching(false);
                      });
                  }
                }}
                color="success"
              >
                Изследвай
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      {isFetching && (
        <div className="custom-spinner">
          <Spinner size="lg" color="primary" />
        </div>
      )}
      {!isFetching && temperatureResults && (
        <div className="temperature-chart">
          <CustomChart inputData={temperatureResults} />
        </div>
      )}
      {!isFetching && coolingFactorResults && (
        <div
          className="cooling-factor-chart"
          style={{ display: "flex", marginTop: "180px" }}
        >
          <CustomChart inputData={coolingFactorResults} />
        </div>
      )}
    </div>
  );
}

const CustomChart = (props: any) => {
  const { data } = useDemoConfig({
    series: 1,
    inputData: props.inputData,
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
