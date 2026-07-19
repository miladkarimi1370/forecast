"use client";
import { ChangeStringtoPersianDate } from "@/app/services/ChangeNumbersToPersian";

import { useWeatherStore } from "@/app/store/store";

import { useEffect, useState } from "react";
import ShowInformationWeatherComponent from "../ShowInformationWeatherComponent";
import TopComponentInFiveDaysShowing from "./topComponentInFiveDaysShowing/TopComponentInFiveDaysShwing";


export default function FiveDaysInfo() {
    const [justFiveDaysForSelection, setJustFiveDaysForSelection] = useState<any>(null);
    const [wichDayYouWantToShow, setWichDayYouWantToShow] = useState<string | null>(null);
    const { dataForFiveDays } = useWeatherStore()


    const myResult = dataForFiveDays && dataForFiveDays.list.map((value, index) => {

        if (value.dt_txt.slice(0, 10) == wichDayYouWantToShow) {
      
            return (
                <ShowInformationWeatherComponent
                    hasShadow
                    deg={value.deg}
                    hour={value.dt_txt.slice(11, 13)}
                    minute={value.dt_txt.slice(14, 16)}
                    humidity={value.humidity}
                    icon={value.icon}
                    speed={value.speed}
                    temp={value.temp}
                    key={index}
                    pop={value.pop}
                    precipitation={value.rain ?? value.snow ?? null}
                />
            )

        }
    })




    const changeDayForSelection = (command: "next" | "prev") => {
        if (!wichDayYouWantToShow) return;
        const current = new Date(wichDayYouWantToShow);
        const min = new Date(justFiveDaysForSelection[0].dt_txt.slice(0, 10));
        const max = new Date(justFiveDaysForSelection[justFiveDaysForSelection.length - 1].dt_txt.slice(0, 10));

        const full = (date: Date) => {
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        }

        if (command === "next") {
            const next = new Date(current);
            next.setDate(next.getDate() + 1);
            if (next <= max) {
                setWichDayYouWantToShow(
                    full(next)
                )

            }


        } else {

            const prev = new Date(current);
            prev.setDate(prev.getDate() - 1);
            if (prev >= min) {
                setWichDayYouWantToShow(
                    full(prev)
                )

            }
        }
    }


    useEffect(() => {
        if (dataForFiveDays) {

            const myResult = dataForFiveDays.list.filter((value) => {
                if (value.dt_txt.includes("12:00:00")) {
                    return value
                }
            })
            if (myResult) {

                const myCurrentREsult = myResult[0].dt_txt.slice(0, 10);


                setWichDayYouWantToShow(myCurrentREsult);
                setJustFiveDaysForSelection(myResult);

            }
        }
    }, [dataForFiveDays])
    return (
        <>
            <div className="w-full h-3/12 ">
                <div className="w-full   flex justify-between items-center py-4 *:px-3 ">

                    <div className="flex justify-center items-center gap-2">
                        <div className="row center gap-2">
                            <div className="bg-favourite-purple rounded-full text-white w-10 h-10 row center cursor-pointer hover:opacity-45" onClick={() => changeDayForSelection("prev")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>

                            </div>
                            <div className="bg-favourite-purple rounded-full text-white w-10 h-10 row center cursor-pointer hover:opacity-45" onClick={() => changeDayForSelection("next")}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>

                            </div>
                        </div>
                        <select
                            name="days"
                            id="days"
                            className="border-2 border-gray-600/30 rounded-full hover:bg-gray-600/30 text-sm cursor-pointer *:text-sm hover:*:bg-white p-1 text-gray-600"
                            value={wichDayYouWantToShow || ""}
                            onChange={(e) => setWichDayYouWantToShow(e.target.value)}

                        >
                            {
                                justFiveDaysForSelection && justFiveDaysForSelection.map((value: any, index: number) => {
                                    return (
                                        <option value={value.dt_txt.slice(0, 10)} key={index}>
                                            {ChangeStringtoPersianDate(value.dt_txt.slice(0, 10))}
                                        </option>
                                    )
                                })
                            }



                        </select>

                    </div>
                    <h3 className="text-favourite-dark-blue font-bold text-sm">پیش بینی آب و هوای در روزهای آینده</h3>
                </div>
                <div className="w-full  flex justify-start gap-2   border-b-2 text-gray-600/20 px-4" >

                    {
                        justFiveDaysForSelection && justFiveDaysForSelection.map((value: any, index: number) => {
                            return (
                                <TopComponentInFiveDaysShowing
                             
                                    key={value.dt_txt + index}
                                    src={value.icon}
                                    temp={value.temp}
                                    dt_txt={value.dt_txt}
                                    hasShadow={value.dt_txt.slice(0, 10) == wichDayYouWantToShow}
                                />
                            )
                        })
                    }







                </div>
                <div className="w-full flex justify-start gap-2  px-4  ">



                    {
                        myResult && myResult
                    }



                </div>
            </div>
        </>
    )
}