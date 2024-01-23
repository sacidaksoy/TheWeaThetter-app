import service from "@/service";
import { useQuery } from "@tanstack/react-query";

export async function getWeather(latitude: number, longitude: number) {
  const response = await service.get<WeatherData>(
    `forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,uv_index,uv_index_clear_sky&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,uv_index_clear_sky_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`
  );
  return response.data;
}

export const useWeather = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ["weather", { latitude, longitude }],
    queryFn: () => getWeather(latitude, longitude),
  });
};
