export interface TforecastResponse {

    cod: string,
    message: number,
    cnt: number,
    list: [
        {
            dt: number,
            main: {
                temp: number,
                feels_like: number,
                temp_min: number,
                temp_max: number,
                pressure: number,
                sea_level: number,
                grnd_level: number,
                humidity: number,
                temp_kf: number,
                dew_point: number
            },
            weather: [
                {
                    id: number,
                    main: string,
                    description: string,
                    icon: string
                }
            ],
            clouds: {
                all: number
            },
            wind: {
                speed: number,
                deg: number,
                gust: number
            },
            visibility: number,
            pop: number,
            rain?: {
                "3h": number
            },
            snow?: {
                "3h": number
            },
            sys: {
                pod: string
            },
            dt_txt: string
        }],
    city: {
        id: number,
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }

}

export interface TresultForForecast {
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