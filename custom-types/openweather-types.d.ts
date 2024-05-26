interface Location {
  longitude: string;
  latitude: string;
}

export interface WeatherInfo {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  dt: number;
  name: string;
}
