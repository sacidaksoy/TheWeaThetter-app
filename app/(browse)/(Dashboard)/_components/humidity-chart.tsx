"use client";

import { AreaChart, Card, Title } from "@tremor/react";

type HumidityChartProps = {
  results: WeatherData;
};

export function HumidityChart({ results }: HumidityChartProps) {
  const hourly = results.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Humidity": results.hourly.relative_humidity_2m[i],
  }));

  const dataFormatter = (number: number) => `${number} °C`;

  return (
    <Card>
      <Title>Humidity Hourly</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Humidity"]}
        colors={["blue"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}
