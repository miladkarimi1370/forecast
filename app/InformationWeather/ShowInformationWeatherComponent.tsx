"use client";
import Image from "next/image";
import { ChangeNumbersToPersian } from "../services/ChangeNumbersToPersian";
import { getWindDirection } from "../services/CalculateDegreeOfWind";
import { useEffect, useState } from "react";



type TInfo = {
    hasShadow: boolean,
    hour: string,
    minute: string,
    icon: string,
    temp: number,
    humidity: number,
    deg: number,
    speed: number,
    pop: number,
    precipitation?: number

}

export default function ShowInformationWeatherComponent({ deg, hasShadow, hour, icon, minute, speed, temp, pop, precipitation }: TInfo) {
    const [bg, setBG] = useState<string | null>(null)
    const calculatePrecipitionChance = (num: number) => {
        return Math.round(num * 100);
    }

    useEffect(() => {
    
        if (temp) {
            let myREsult = calculateBGOfTemp(temp);
            if (myREsult) {
                setBG(myREsult)
            }

        }

    }, [])

    const calculateBGOfTemp = (temp: number) => {

        const myTemp = Math.round(temp);
        let bgOpacity:  string = "bg-red-400/10";
        switch (myTemp) {
            case 32:
                bgOpacity ="bg-red-400/10" ;
                break;
            case 34:
                bgOpacity = "bg-red-400/20";
                break;
            case 36:
                bgOpacity = "bg-red-400/30";
                break;
            case 38:
                bgOpacity = "bg-red-400/40";
                break;
            case 40:
                bgOpacity = "bg-red-400/50";
                break;
            case 42:
                bgOpacity = "bg-red-400/60";
                break;
            case 44:
                bgOpacity = "bg-red-400/70";
                break;
            case 46:
                bgOpacity = "bg-red-400/80";
                break;
            default: "bg-red-400/00"
                break;
        }
        bgOpacity = bgOpacity.toString();
        return bgOpacity
    }

    return (
        <>
            <div className={`w-20 flex-none   
                 ${hasShadow ? "bg-gray-600/10" : "bg-transparent"}
                  flex flex-col justify-stretch items-center gap-4`}>
                <p dir="ltr " className="row center text-sm  *:text-gray-600 *:font-bold pt-2"><span className="hour ">
                    {hour < "10" ? ChangeNumbersToPersian(0) + ChangeNumbersToPersian(hour) : ChangeNumbersToPersian(hour)} </span> : <span className="minute ">
                        {minute < "10" ? ChangeNumbersToPersian(0) + ChangeNumbersToPersian(minute) : ChangeNumbersToPersian(minute)}
                    </span>
                </p>
                <div className="relative w-10 h-10 bg-white">
                    <Image
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt="Weather"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>
                <p dir="ltr" className={`text-sm text-favourite-dark-blue ${bg} w-full text-center py-1`}>{ChangeNumbersToPersian(temp)} {"\u00B0"} C</p>
                <p className="text-sm flex justify-center items-center border-b-2 border-b-gray-600/30 py-1" dir="rtl"> {" ' "} {ChangeNumbersToPersian(precipitation ?? 0)} {" ' "} میلیمتر</p>
                <p className="text-sm text-blue-800" dir="rtl">{ChangeNumbersToPersian(Number(calculatePrecipitionChance(pop))) + "%"}</p>
                <div className="flex justify-center items-center">
                    <div >
                        <svg style={{ transform: `rotate(${deg}deg)` }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                        </svg>

                    </div>
                    <p>{getWindDirection(deg)}</p>
                </div>
                <p className="text-sm text-center" dir="ltr">{ChangeNumbersToPersian(speed)} {" "}km/h</p>
            </div>
        </>
    )
}