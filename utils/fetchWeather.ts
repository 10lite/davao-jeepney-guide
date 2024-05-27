import { WeatherInfo } from "@custom-types/openweather-types";

const fetchWeather = async ({
  longitude,
  latitude,
}: {
  longitude: string;
  latitude: string;
}): Promise<WeatherInfo | null> => {
  const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

  if (!apiKey) {
    console.error("API key is missing");
    return null;
  }

  const url = "https://api.openweathermap.org/data/2.5/weather";
  const params = {
    lat: latitude,
    lon: longitude,
    appid: apiKey,
    units: "metric",
  };

  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${url}?${query}`, { cache: "no-store" });

    if (!response.ok) {
      console.error(
        "Failed to fetch weather data",
        response.status,
        response.statusText
      );
      return null;
    }

    const data = await response.json();
    const returnParams = {
      weather: data.weather[0],
      main: {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
      },
      dt: data.dt,
      name: data.name,
    };

    return returnParams;
  } catch (error) {
    console.error("Error fetching weather data", error);
    return null;
  }
};

export default fetchWeather;
