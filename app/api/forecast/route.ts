import { NextRequest, NextResponse } from "next/server";
import { TforecastResponse, TresultForForecast } from "./type";

export async function GET(request: NextRequest) {
    const lat = request.nextUrl.searchParams.get("lat") || 35.67189962679011;
    const lon = request.nextUrl.searchParams.get("lon") || 51.42242320179511
    const API_KEY = process.env._WEATHERMAP_API_KEY;


    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fa`);

        if (!res.ok) {
            return NextResponse.json({ error: "اطلاعات شهر مورد نظر در خصوص پیش بینی آب و هوا  درست نبود" }, { status: res.status })
        }
        const response: TforecastResponse = await res.json();

        const result: TresultForForecast = {
            list: response.list.map((value) => {
                return {
                    dt: value.dt,
                    temp: value.main.temp,
                    feels_like: value.main.feels_like,
                    temp_min: value.main.temp_min,
                    temp_max: value.main.temp_max,
                    pressure: value.main.pressure,
                    sea_level: value.main.sea_level,
                    grnd_level: value.main.grnd_level,
                    humidity: value.main.humidity,
                    main: value.weather[0].main,
                    description: value.weather[0].description,
                    icon: value.weather[0].icon,
                    speed: value.wind.speed,
                    deg: value.wind.deg,
                    gust: value.wind.gust,
                    visibility: value.visibility,
                    pop: value.pop,
                    pod: value.sys.pod,
                    dt_txt: value.dt_txt,
                    rain: value.rain?.["3h"],
                    snow: value.snow?.["3h"]
                }

            },

            ),
            id_city: response.city.id,
            country: response.city.country,
            lat: response.city.coord.lat,
            lon: response.city.coord.lon,
            name: response.city.name,
            population: response.city.population,
            sunrise: response.city.sunrise,
            sunset: response.city.sunset,
            timezone: response.city.timezone
        }


        return NextResponse.json(result)

    } catch (err: any) {
        return NextResponse.json({ "err": err }, { status: 500 })
    }


} 