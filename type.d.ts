interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  wind_direction_10m: number;
  wind_speed_10m: number
}

interface CurrentUnits {
  apparent_temperature: string;
  interval: string;
  is_day: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
}

interface Daily {
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
  weather_code: number[];
  wind_direction_10m_dominant: number[];
  wind_speed_10m_max: number[];
  uv_index_max: number[];
  uv_index_clear_sky_max: number[];
}

interface DailyUnits {
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weather_code: string;
}

interface Hourly {
  apparent_temperature: number[];
  dew_point_2m: number[];
  relative_humidity_2m: number[];
  temperature_2m: number[];
  time: string[];
  uv_index: number[];
  uv_index_clear_sky: number[];
}

interface HourlyUnits {
  apparent_temperature: string;
  dew_point_2m: string;
  relative_humidity_2m: string;
  temperature_2m: string;
  time: string;
  uv_index: string;
  uv_index_clear_sky: string;
}

interface WeatherData {
  current: Current;
  current_units: CurrentUnits;
  daily: Daily;
  daily_units: DailyUnits;
  hourly: Hourly;
  hourly_units: HourlyUnits;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
