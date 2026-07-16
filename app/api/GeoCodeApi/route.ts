import { NextRequest, NextResponse } from "next/server"
import { GeoTypes } from "./type";

export async function GET(request: NextRequest) {
    const city = request.nextUrl.searchParams.get("city") || "Tehran";
   
    const API_KEY = process.env._WEATHERMAP_API_KEY;

    try {
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);
        const data = await res.json();
        if (!data.length) {
            return NextResponse.json(
                { error: "شهر یافت نشد" },
                { status: 404 }
            );
        }


const myCity = data[0];


        const response: GeoTypes = {
            name: myCity.name,
            country: myCity.country,
            local_names: myCity.local_names.fa,
            lat: myCity.lat,
            lon: myCity.lon
        }
        return NextResponse.json(response)
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
    }
}