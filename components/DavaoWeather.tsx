"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import fetchWeather from "@/utils/fetchWeather";
import fetchAirQuality from "@/utils/fetchAirQuality";
import { WeatherInfo } from "@custom-types/openweather-types";

const DavaoWeather = ({ className = "" }: { className?: string }) => {
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
  const [aqi, setAqi] = useState<{ aqi: number } | null>(null);
  const [loading, setLoading] = useState(true);

  const longitude = "125.6205";
  const latitude = "7.0852";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const weather = await fetchWeather({ longitude, latitude });
      const airQuality = await fetchAirQuality({ longitude, latitude });
      setWeatherData(weather);
      setAqi(airQuality);
      setLoading(false);
    };

    fetchData();
  }, [longitude, latitude]);

  if (loading) return <div>Loading...</div>;

  return (
    <Card key="1" className={`w-full max-w-md border-gray-400 ${className}`}>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-center">{weatherData?.name}</CardTitle>
          <CardDescription className="text-center">
            Last updated:{" "}
            {weatherData
              ? moment.unix(weatherData.dt).startOf("minute").fromNow()
              : "Loading..."}
          </CardDescription>
        </div>
        {weatherData && (
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">
              {Math.round(weatherData.main.temp)}°
            </div>
            <img
              alt={weatherData.weather.description}
              height={48}
              src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`}
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width={48}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LeafIcon className="w-6 h-6 text-green-500" />
            <div>
              <div className="font-medium">Air Quality</div>
            </div>
          </div>
          {aqi?.aqi == 1 && (
            <Badge variant="default" className="bg-green-600">
              {aqi?.aqi} AQI (Good)
            </Badge>
          )}
          {aqi?.aqi == 2 && (
            <Badge variant="default" className="bg-yellow-600">
              {aqi?.aqi} AQI (Fair)
            </Badge>
          )}
          {aqi?.aqi == 3 && (
            <Badge variant="default" className="bg-orange-600">
              {aqi?.aqi} AQI (Moderate)
            </Badge>
          )}
          {aqi?.aqi == 4 && (
            <Badge variant="default" className="bg-red-600">
              {aqi?.aqi} AQI (Poor)
            </Badge>
          )}
          {aqi?.aqi == 5 && (
            <Badge variant="default" className="bg-purple-600">
              {aqi?.aqi} AQI (Very Poor)
            </Badge>
          )}
        </div>
        {weatherData && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DropletIcon className="w-6 h-6 text-blue-500" />
              <div>
                <div className="font-medium">Humidity</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {weatherData.main.humidity}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThermometerIcon className="w-6 h-6 text-orange-500" />
              <div>
                <div className="font-medium">Feels Like</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(weatherData.main.feels_like)}°
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DropletIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const ThermometerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </svg>
);

export default DavaoWeather;
