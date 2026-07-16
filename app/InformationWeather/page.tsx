"use client";
import Image from "next/image";
import { ChangeNumbersToPersian, ChangeNumbersToPersianDate, ChangeStringtoPersianDate } from "../services/ChangeNumbersToPersian";

import { useShowDrawer } from "../store/drawerStore";
import { useWeatherStore } from "../store/store";
import { useEffect, useState } from "react";
import { calculateAltitude } from "../services/CalculateAltitude";
import { CalculateCurrentTime } from "../services/CalculateCurrentTime";
import { CalculateUTC } from "../services/CalculateUTC";
import ShowInformationWeatherComponent from "./ShowInformationWeatherComponent";


interface latAndlng {
    minute: string,
    degree: string
}



export default function InformationWeather() {
    const { active, changeDrawerState, showDrawer } = useShowDrawer();
    const { data, dataForFiveDays } = useWeatherStore();
    const [localDataForFiveDays, setLocalDataForFiveDays] = useState<[] | null>(null);
    const [justFiveDaysForSelection, setJustFiveDaysForSelection] = useState<any>(null);
    const [wichDayYouWantToShow , setWichDayYouWantToShow] = useState<string | null>(null);
    const [lat, setLat] = useState<latAndlng>({
        minute: "0",
        degree: "0",

    });
    const [long, setLong] = useState<latAndlng>({
        minute: "0",
        degree: "0",

    });
    const [time, setTime] = useState({
        hour: "00",
        minute: "00",
        day: "00",
        month: "00",
        year: "0000"
    })
    const changeNumberToDegAndMinutes = (num: any, latOrLng: any) => {
        let myNum;

        if (num) {
            myNum = num.toFixed(2);
            myNum = myNum.split(".");
            if (latOrLng === "lat") {
                setLat({
                    minute: myNum[0],
                    degree: myNum[1]
                })
            } else {
                setLong({
                    minute: myNum[0],
                    degree: myNum[1]
                })
            }

        }


    }


    const setTimeToShowExactly = (myData: Date) => {
        if (!myData) return;

        let hour = myData.getUTCHours();
        let minute = myData.getUTCMinutes();
        let day = myData.getUTCDate();
        let month = myData.getUTCMonth() + 1;   // مهم: ماه از ۰ شروع میشه
        let year = myData.getUTCFullYear();

        const pad = (num: number) => num < 10 ? "0" + num : num.toString();

        setTime({
            hour: pad(hour),
            minute: pad(minute),
            day: pad(day),
            month: pad(month),
            year: year.toString()
        });
    };


const changeDayForSelection = (command : "next" | "prev") => {
    if(!wichDayYouWantToShow) return;
    const date = new Date(wichDayYouWantToShow);
    const maxDate = date.setDate(date.getDate() + 5);

    if(command === "next") {
        if(date.getDate() + 1 <= maxDate) {
            date.setDate(date.getDate() + 1)
        }else {
         return
        }

    }else  {
      if(date.getDate() - 1 > date.getDate()) {
            date.setDate(date.getDate() - 1)
        }else {
            return
        }
    }
 }

    useEffect(() => {

        if (data?.lat && data?.lon) {
            changeNumberToDegAndMinutes(data.lat, "lat");
            changeNumberToDegAndMinutes(data.lon, "lon");


        }
        if (data?.timezone && data?.dt) {
            const myData = CalculateCurrentTime(data.timezone, data.dt);

            if (myData) {

                setTimeToShowExactly(myData)
            }
        }

        if (dataForFiveDays) {

            const result: any = dataForFiveDays.list.filter((value) => {

                if (value.dt_txt.slice(0, 4) == time.year && value.dt_txt.slice(5, 7) == time.month && value.dt_txt.slice(8, 10) == time.day && value.dt_txt.slice(11, 13) > time.hour) {
                    return value;
                }
            })
            if (result) {
                setLocalDataForFiveDays(result)
            }
        }
        if (dataForFiveDays) {
            const myResult = dataForFiveDays.list.filter((value) => {
                if (value.dt_txt.includes("12:00:00")) {
                    return value
                }
            })
            if(myResult) {
                setJustFiveDaysForSelection(myResult);
              const myCurrentREsult = myResult[0].dt_txt.slice(0 , 10);
              const final = new Intl.DateTimeFormat("en-En").format(new Date(myCurrentREsult));
             setWichDayYouWantToShow(final);
             console.log(wichDayYouWantToShow)
            }
        }

    }, [data ])
    return (

        <>
            <section className={`${showDrawer ? "block" : "hidden"}  bg-white overflow-y-scroll  h-screen absolute top-0 right-0 w-full  md:w-6/12 lg:w-6/12 xl:w-4/12 z-[1000] overflow-x-hidden shadow-2xl shadow-black  duration-300`} >
                <div className="w-full h-1/12  flex justify-between items-center *:px-5">
                    <h2 className=" text-2xl font-bold text-favourite-dark-blue">{data?.name}</h2>
                    <button className="h-full w-1/12  flex justify-center items-center cursor-pointer" onClick={() => changeDrawerState(false, false)}>
                        <div className="w-fit h-1/2 bg-blue-800 rounded-full p-2 hover:bg-blue-800/50 duration-300 hover:-rotate-z-45">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                        </div>
                    </button>
                </div>
                <div className="w-full h-1/12  px-2 row border-b-2 border-b-gray-600/20">
                    <div className="w-full h-full row ">
                        <div className="w-full h-full row justify-start items-center gap-2" dir="rtl">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>

                            </div>
                            <div className="flex center gap-2 *:text-sm *:cursor-pointer *:hover:scale-110 *:hover:text-red-600 *:duration-150">
                                <span>جهان </span>
                                <span>{data?.country}</span>
                                <span>{data?.name}</span>
                            </div>
                            <div className=" w-full ">
                                <p className="px-2 text-sm text-gray-600" dir="ltr">
                                    {ChangeNumbersToPersian(Number(lat.minute))}{"°"}
                                    {ChangeNumbersToPersian(Number(lat.degree))}{"'"}
                                    {data && data.lat > 0 ? "N" : "S"} /

                                    {ChangeNumbersToPersian(Number(long.minute))}{"°"}
                                    {ChangeNumbersToPersian(Number(long.degree))}{"'"}
                                    {data && data.lon > 0 ? "E" : "W"}  /

                                    Altitude {ChangeNumbersToPersian(Number(calculateAltitude(data?.sea_level, data?.grnd_level)))} m /

                                    {ChangeNumbersToPersian(Number(time.hour))} :
                                    {ChangeNumbersToPersian(Number(time.minute))} /

                                    {data?.dt
                                        ? ChangeNumbersToPersianDate(new Date(data.dt * 1000))
                                        : ChangeNumbersToPersianDate(new Date())}

                                    , {data?.country}/{data?.name} {CalculateUTC(data?.timezone)}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="w-full h-2/12 px-4 ">
                    <div className="w-full h-full  row items-center justify-start gap-2">
                        <div className="relative w-20 h-20 ">
                            <Image
                                src={`https://openweathermap.org/img/wn/${data?.icon}@2x.png`}
                                alt="Weather"
                                width={100}
                                height={100}
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <div className=" ">
                            <h2 className="text-3xl"> {ChangeNumbersToPersian(data?.temp)} {"\u00B0"} C</h2>
                            <p dir="rtl">{ChangeNumbersToPersian(data?.speed)} متر بر ثانیه</p>
                        </div>
                        <div className=" flex justify-center gap-4 w-full items-center">
                            <p dir="ltr"> % {ChangeNumbersToPersian(data?.humidity)} </p>
                            <h2 dir="rtl">رطوبت هوا : </h2>

                        </div>
                    </div>
                </div>
                <div className="w-full h-5/12 bg-gray-100 px-4 " dir="ltr">
                    <h3 className="py-4 text-sm text-favourite-dark-blue font-bold" dir="rtl">وضعیت آب و هوا در {ChangeNumbersToPersian(24)} ساعت آینده</h3>
                    <div className=" w-full flex justify-start items-stretch overflow-x-scroll overflow-y-hidden ">
                        {
                            localDataForFiveDays && localDataForFiveDays.map((value: any, index: number) => {

                                return (
                                    <ShowInformationWeatherComponent
                                        hasShadow={false}
                                        deg={value.deg}
                                        hour={value.dt_txt.slice(11, 13)}
                                        minute={value.dt_txt.slice(14, 16)}
                                        humidity={value.humidity}
                                        icon={value.icon}
                                        speed={value.speed}
                                        temp={value.temp}
                                        key={index}
                                        pop={value.pop}
                                        precipitation={value.rain || value.snow || null}
                                    />
                                )
                            })
                        }
                    </div>




                </div>
                <div className="w-full h-3/12 ">
                    <div className="w-full   flex justify-between items-center py-4 *:px-3 ">

                        <div className="flex justify-center items-center gap-2">
                            <div className="row center gap-2">
                                <div className="bg-favourite-purple rounded-full text-white w-10 h-10 row center cursor-pointer hover:opacity-45" onClick={() => changeDayForSelection("next")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>

                                </div>
                                <div className="bg-favourite-purple rounded-full text-white w-10 h-10 row center cursor-pointer hover:opacity-45" onChange={() => changeDayForSelection("prev")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>

                                </div>
                            </div>
                            <select 
                            name="days"
                             id="days"
                              className="border-2 border-gray-600/30 rounded-full hover:bg-gray-600/30 text-sm cursor-pointer *:text-sm hover:*:bg-white p-1 text-gray-600"
                              onChange={(e) => setWichDayYouWantToShow(e.target.value)}
                              >
                                {
                                    justFiveDaysForSelection && justFiveDaysForSelection.map((value: any , index : number) => {
                                        return (
                                            <option value={value.dt_txt.slice(0 , 10)} key={index}>
                                                {ChangeStringtoPersianDate(value.dt_txt.slice(0 , 10))}
                                            </option>
                                        )
                                    })
                                }



                            </select>

                        </div>
                        <h3 className="text-favourite-dark-blue font-bold text-sm">پیش بینی آب و هوای در روزهای آینده</h3>
                    </div>
                    <div className="w-full  row   border-b-2 text-gray-600/20 px-4" >
                        <div className="w-20 flex flex-col items-center justify-center gap-2 bg-gray-100">
                            <p className="text-favourite-light-blue text-sm font-bold py-2">شنبه</p>
                            <div className="relative w-10 h-10 ">
                                <Image
                                    src="/img/icons/1.svg"
                                    alt="icons/weather"
                                    fill
                                    className="rounded-xl object-cover"
                                />
                            </div>
                            <p className="text-sm text-favourite-light-blue py-2" dir="ltr">{ChangeNumbersToPersian(32)} {"\u00B0"} C</p>
                        </div>


                        /////////////////




                    </div>
                    <div className="w-full row  px-4  ">

                  //////////////////// show information //////////////






                    </div>
                </div>
            </section>
        </>

    )
}