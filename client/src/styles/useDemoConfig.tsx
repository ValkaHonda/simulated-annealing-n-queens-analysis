import React from "react";

export default function useChartConfig({
  inputData,
  seriesName,
  series,
  useR,
  count = 1,
  resizable = true,
  canRandomize = true,
  dataType = "linear",
  elementType = "line",
  primaryAxisType = "linear",
  secondaryAxisType = "linear",
  primaryAxisPosition = "bottom",
  secondaryAxisPosition = "left",
  primaryAxisStack = false,
  secondaryAxisStack = true,
  primaryAxisShow = true,
  secondaryAxisShow = true,
  tooltipAnchor = "closest",
  tooltipAlign = "auto",
  grouping = "primary",
  snapCursor = true,
  datums = 10,
}: any) {
  const [state, setState] = React.useState<any>({
    inputData,
    seriesName,
    count,
    resizable,
    canRandomize,
    dataType,
    elementType,
    primaryAxisType,
    secondaryAxisType,
    primaryAxisPosition,
    secondaryAxisPosition,
    primaryAxisStack,
    secondaryAxisStack,
    primaryAxisShow,
    secondaryAxisShow,
    tooltipAnchor,
    tooltipAlign,
    grouping,
    snapCursor,
    datums,
    data: makeDataFrom(inputData),
  });

  React.useEffect(() => {
    setState((old: any) => ({
      ...old,
      data: makeDataFrom(inputData),
    }));
  }, [count, dataType, datums, series, useR, inputData, seriesName]);

  return {
    ...state,
  };
}

function makeDataFrom(inputData: any) {
  const result = [...inputData].map(makeSeries);
  return result;
}

function makeSeries(inputData: any) {
  const seriesName: string = inputData.n;
  const coordinates: { x: string; y: string }[] = inputData.data;
  return {
    label: `Number of Queens: ${seriesName}`,
    data: coordinates.map(({ x, y }) => {
      return {
        primary: `${x}`,
        secondary: `${y}`,
      };
    }),
  };
}
