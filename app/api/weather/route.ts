
import { WeatherClientResponse, weatherResponse } from "@/app/store/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const lat = request.nextUrl.searchParams.get("lat") || 35.67189962679011;
    const long = request.nextUrl.searchParams.get("lon") || 51.42242320179511;
    const API_KEY = process.env._WEATHERMAP_API_KEY;
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric&lang=fa`
        );

        if (!res.ok) {
            return NextResponse.json({ error: "شهر یافت نشد" }, { status: res.status });
        }

        const data: weatherResponse = await res.json();

        const result: WeatherClientResponse = {
            lat: data.coord.lat,
            lon: data.coord.lon,
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            sea_level: data.main.sea_level,
            grnd_level: data.main.grnd_level,
            visibility: data.visibility,
            speed: data.wind.speed,
            deg: data.wind.speed,
     
            all: data.clouds.all,
            dt: data.dt,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            timezone: data.timezone,
            id: data.id,
            name: data.name,
            code: data.cod
        }

        return NextResponse.json(result)

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
    }
}