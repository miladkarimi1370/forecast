import { create } from "zustand";
import { ForecastResponse, ForecastResponseForFiveDays, WeatherClientResponse } from "./types";

interface WeatherStore {
    coords: { lat: number; lon: number };
    data: WeatherClientResponse | null;
    dataForFiveDays: ForecastResponseForFiveDays | null,
    loading: boolean;
    error: string | null;

    setCoords: (lat: number, lon: number) => void,
    fetchWeather: (lat: number, lon: number) => Promise<void>;
    fetchWeatherForFiveDays: (lat: number, lon: number) => Promise<void>;
    clearWeather: () => void;
    getUserLocation: () => void;
    isCityOrCoordinateFunc: (value: string) => Promise<void>
}

export const useWeatherStore = create<WeatherStore>((set) => ({
    coords: {
        lat: 35.67189962679011,
        lon: 51.42242320179511,
    },

    data: null,
    dataForFiveDays: null,
    loading: false,
    error: null,
    setCoords: (lat, lon) => set({ coords: { lat, lon }, error: null }),


    fetchWeather: async (lat: number, lon: number) => {
        set({
            loading: true
        })
        const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

        if (!res.ok) throw new Error("the api is not available for simple fetchWeather");

        const res2 = await res.json();

        set({

            data: {
                lat: res2.lat,
                lon: res2.lon,
                id: res2.id,
                main: res2.main,
                description: res2.description,
                icon: res2.icon,
                temp: res2.temp,
                feels_like: res2.feels_like,
                temp_min: res2.temp_min,
                temp_max: res2.temp_max,
                pressure: res2.pressure,
                humidity: res2.humidity,
                sea_level: res2.sea_level,
                grnd_level: res2.grnd_level,
                visibility: res2.visibility,
                speed: res2.speed,
                deg: res2.deg,
                all: res2.all,
                dt: res2.dt,
                country: res2.country,
                sunrise: res2.sunrise,
                sunset: res2.sunset,
                timezone: res2.timezone,
                name: res2.name,
                code: res2.code,

            },
            loading: false
        })
    },
    fetchWeatherForFiveDays: async (lat: number, lon: number) => {
        set({
            loading: true
        })
        const result = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);


        if (!result.ok) throw new Error("the api is not available in fetchWeather for 5 days");

        const res: ForecastResponse = await result.json();

        set({
            dataForFiveDays: {
                country: res.country,
                id_city: res.id_city,
                lat: res.lat,
                lon: res.lon,
                name: res.name,
                population: res.population,
                sunrise: res.sunrise,
                sunset: res.sunset,
                timezone: res.timezone,
                list: res.list
            },
            loading: false
        })

    },
    clearWeather: () =>
        
        set({
            data: null,
            loading: false,
            error: null,
        }),

    getUserLocation: () => {
        if (typeof window === "undefined") return;

        if ("geolocation" in navigator) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    };

                    set({
                        coords: {
                            lat: coords.lat,
                            lon: coords.long,
                        },
                        error: null,
                        loading: false,

                    });
                },
                (error) => {
                    switch (error.code) {
                        case 1:
                            set({ error: "permission denied !!!!" });
                            break;

                        case 2:
                            set({ error: "position unavailable !!!!" });
                            break;

                        case 3:
                            set({ error: "timeout !!!!" });
                            break;
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }
    },
    isCityOrCoordinateFunc: async (value) => {
        const input = value.trim();
        const parts = input.split(",");

        if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
            const myParts1 = Number(parts[0]);
            const myParts2 = Number(parts[1])
            set({
                coords: {
                    lat: myParts1,
                    lon: myParts2
                },

            })

        } else {

            try {
                const response = await fetch(`/api/GeoCodeApi?city=${decodeURIComponent(value)}`);
                if (!response.ok) {
                    throw new Error("نام شهر نامعتبر است ");
                }
                const response2 = await response.json();
                set({
                    coords: {
                        lat: response2.lat,
                        lon: response2.lon
                    },
                    error: null
                })
            } catch (err) {
                set({
                    coords: {
                        lat: 35.67189962679011,
                        lon: 51.42242320179511,
                    },
                    error: "نام شهر معتبر نیست ، به تهران برگشت داده شد "
                })
            }






        }

    }
}));