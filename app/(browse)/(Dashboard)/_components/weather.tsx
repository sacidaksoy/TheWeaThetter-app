"use client";

import { Callout } from "@tremor/react";
import { useWeather } from "../_queries/useWeather";
import { CheckCircleIcon } from "lucide-react";
import StatCard from "./stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TempChart } from "./temp-chart";
import { HumidityChart } from "./humidity-chart";
import ErrorPage from "@/app/error";
import { useCityPicker } from "@/store/use-city-picker";
import { redirect } from "next/navigation";

type Coordinates = {
  latitude: string;
  longitude: string;
};

export default function Weather({ latitude, longitude }: Coordinates) {
  const {
    data: results,
    isLoading,
    isError,
  } = useWeather(Number(latitude), Number(longitude));
  const { selectedCountry } = useCityPicker((state) => state);

  if (isLoading) {
    return <WeatherSkeleton />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (!selectedCountry) redirect("/");

  const rawTime = results?.current.time;
  const dateObject = rawTime ? new Date(rawTime as string) : null;

  const formattedTime = dateObject?.toLocaleString();

  return (
    <div className="p-5">
      <div className="pb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Todays Overview</h2>
          <p className="text-sm text-gray-400">
            Last Updated at: {formattedTime} {results?.timezone}
          </p>
        </div>
        <div>
          <p>Current: {results?.current.apparent_temperature}°C</p>
        </div>
      </div>
      {/* 
      <div>
        <CityPicker />
      </div> */}

      <div className="m-2 mb-10">
        <Callout
          className="mt-4 rounded-tremor-full"
          title="No critical system data"
          icon={CheckCircleIcon}
          color="green"
        >
          All systems are currently within their default operating ranges.
        </Callout>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
        <StatCard
          title="Maximum Temperature"
          metric={results?.daily.temperature_2m_max[0].toFixed(1) as string}
          color="yellow"
        />
        <StatCard
          title="Minimum Temperature"
          metric={results?.daily.temperature_2m_min[0].toFixed(1) as string}
          color="green"
        />

        <StatCard
          title="UV Index"
          metric={results?.daily.uv_index_max[0].toFixed(1) as string}
          color="rose"
        />
        {Number(results?.daily.uv_index_max[0].toFixed(1)) > 5 && (
          <Callout
            title="The UV is high today, be sure to wear SPF!"
            color="rose"
          />
        )}

        <div className="flex space-x-3">
          <StatCard
            title="Wind Speed"
            metric={`${results?.current.wind_speed_10m.toFixed(1)} m/s`}
            color="cyan"
          />
          <StatCard
            title="Wind Direction"
            metric={`${results?.current.wind_direction_10m.toFixed(1)}°`}
            color="violet"
          />
        </div>
      </div>
      <hr className="mb-5" />

      <div className="space-y-3">
        {/* {TempChart} */}
        <TempChart results={results as WeatherData} />
        {/* {RainChart} */}
        <HumidityChart results={results as WeatherData} />
        {/* {HumidityChart} */}
      </div>
    </div>
  );
}

const WeatherSkeleton = () => {
  return (
    <div className="p-5">
      <div className="pb-5">
        <Skeleton className="h-6 w-[100px] mb-2" />
        <Skeleton className="h-6 w-[400px]" />
      </div>

      <div className="m-2 mb-10">
        <div className="mt-4 rounded-tremor-full">
          <Skeleton className="h-20 w-[1300px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
        <Skeleton className="h-20 w-[750px]" />
        <Skeleton className="h-20 w-[750px]" />
        <Skeleton className="h-20 w-[750px]" />
        <div className="flex space-x-3">
          <Skeleton className="h-20 w-[368px]" />
          <Skeleton className="h-20 w-[368px]" />
        </div>
      </div>
      <hr className="mb-5" />

      <div className="space-y-3">
        {/* {TempChart} */}
        {/* {RainChart} */}
        {/* {HumidityChart} */}
      </div>
    </div>
  );
};
