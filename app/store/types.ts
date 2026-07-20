export interface weatherResponse {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}


export interface WeatherClientResponse {
    lat: number,
    lon: number,
    main: string,
    description: string,
    icon: string,
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number,
    visibility: number,
    speed: number,
    deg: number,
   
    all: number,
    dt: number,
    country: string,
    sunrise: number,
    sunset: number,
    timezone: number,
    id: number,
    name: string,
    code: number
}


export interface ForecastResponseForFiveDays {
    list: {
        dt: number;
        dt_txt: string;
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        main: string;
        description: string;
        icon: string;
        speed: number;
        deg: number;
        gust?: number;           // اختیاری
        visibility: number;
        pop: number;
        pod: string;
          rain?: number,
        snow?: number
    }[];

    id_city: number;
    name: string;
    lat: number;
    lon: number;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}


export interface ForecastResponse {
    list: {
        dt: number;
        dt_txt: string;
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        main: string;
        description: string;
        icon: string;
        speed: number;
        deg: number;
        gust?: number;           // اختیاری
        visibility: number;
        pop: number;
        pod: string;
          rain?: number,
        snow?: number
    }[];

    id_city: number;
    name: string;
    lat: number;
    lon: number;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}