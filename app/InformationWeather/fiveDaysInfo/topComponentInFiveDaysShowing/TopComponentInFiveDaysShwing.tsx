"use client";
import { ChangeNumbersToPersian } from "@/app/services/ChangeNumbersToPersian";
import { GetDayOfDTTXT } from "@/app/services/GetDayOfDTTXT";
import Image from "next/image";
import { SyntheticEvent } from "react";

type Tinfo = {
    src: string,
    temp: number , 
    dt_txt : string , 
    hasShadow : boolean , 

}

export default function TopComponentInFiveDaysShowing({ src  , temp , dt_txt , hasShadow  } : Tinfo ) {
    
const clickHandler = (e: SyntheticEvent ) => {
    console.log(e)
 }
    return (
        <>
            <div
       
            className={`w-20 flex flex-col items-center justify-center gap-2 ${hasShadow ? "bg-gray-100" : "bg-transparent"} cursor-pointer hover:bg-gray-100 `}
             onClick={clickHandler}>
                <p className="text-favourite-light-blue text-sm font-bold py-2">{dt_txt && GetDayOfDTTXT(dt_txt)}</p>
                <div className="relative w-10 h-10 bg-white">
                    <Image
                        src={`https://openweathermap.org/img/wn/${src}@2x.png`}
                        alt="icons/weather"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>
                <p className="text-sm text-favourite-light-blue py-2" dir="ltr">{ChangeNumbersToPersian(temp)} {"\u00B0"} C</p>
            </div>

        </>
    )
}