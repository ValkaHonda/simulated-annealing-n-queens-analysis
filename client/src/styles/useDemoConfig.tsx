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
    data: makeDataFrom(series, inputData, seriesName),
  });

  React.useEffect(() => {
    setState((old: any) => ({
      ...old,
      data: makeDataFrom(series, inputData, seriesName),
    }));
  }, [count, dataType, datums, series, useR, inputData, seriesName]);

  return {
    ...state,
  };
}

function makeDataFrom(series: any, inputData: any, seriesName: string) {
  const result = [...new Array(series)].map((d, i) =>
    makeSeries(i, inputData, seriesName)
  );

  console.log({ result });
  return result;
}

function makeSeries(i: any, inputData: any, seriesName: string) {
  return {
    label: seriesName,
    data: inputData.map((input: any, i: number) => {
      return {
        primary: `${input.x}`,
        secondary: `${input.y}`,
      };
    }),
  };
}
