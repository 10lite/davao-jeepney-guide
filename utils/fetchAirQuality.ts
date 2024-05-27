const fetchAirQuality = async ({
  longitude,
  latitude,
}: {
  longitude: string;
  latitude: string;
}): Promise<{ aqi: number } | null> => {
  const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

  if (!apiKey) {
    console.error("API key is missing");
    return null;
  }

  const url = "https://api.openweathermap.org/data/2.5/air_pollution";
  const params = {
    lat: latitude,
    lon: longitude,
    appid: apiKey,
  };

  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${url}?${query}`, { cache: "no-store" });

    if (!response.ok) {
      console.error(
        "Failed to fetch air quality data",
        response.status,
        response.statusText
      );
      return null;
    }

    const data = await response.json();
    const returnParams = {
      aqi: data.list[0].main.aqi as number,
    };

    return returnParams;
  } catch (error) {
    console.error("Error fetching air quality data", error);
    return null;
  }
};

export default fetchAirQuality;
