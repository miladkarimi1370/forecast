"use client";


import { InputSearchFunctionality } from "@/app/store/InputSearchFunctionality";
import { useWeatherStore } from "@/app/store/store";
import { debounce } from "@/app/utils/debounce";
import { useCallback, useEffect, useRef, useState } from "react"



export default function InputSearchForHeader( ) {
    const [showSubscribe, setShowSubscribe] = useState<boolean>(true);
    const { isCityOrCoordinateFunc, error } = useWeatherStore();
    const [searchValue, setSearchValue] = useState<string>("");
    const {show} = InputSearchFunctionality();
    const myRef = useRef<null | HTMLInputElement>(null);
    const debouncedFetch = useCallback(
        debounce((city: string) => {
            if (city.length >= 2) {
                isCityOrCoordinateFunc(city);

            }
        }, 1000),   // 1000 میلی‌ثانیه تأخیر
        [isCityOrCoordinateFunc]
    );

    useEffect(() => {
        myRef.current?.focus();
        if (searchValue?.length >= 2) {
            setShowSubscribe(false);
            debouncedFetch(searchValue);
    

        } else if (searchValue?.length > 0) {
            setShowSubscribe(true)
        } else {
            setShowSubscribe(true)
        }
console.log(show)

    }, [searchValue, debouncedFetch])

    return (
        <>
            <div  className={`${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}  bg-white  p-4 xl:flex xl:opacity-100 xl:pointer-events-auto absolute duration-200 w-110 xl:relative top-[100px] xl:top-0 mx-auto xl:w-full  h-16 rounded-full justify-center items-center shadow-2xl shadow-gray-700`}>
                <div className="w-11/12  flex justify-center items-center relative gap-4 " >
                    <div className="w-1/12 xl:w-4/12   row justify-start items-center ">
                        <h2 className="hidden xl:block">
                            <span className=" text-my-favourite-purple uppercase text-2xl font-bold">w</span>
                            <span className="text-black text-xl font-bold">weather app</span>
                        </h2>
                    </div>
                    <div className="relative h-full w-full">
                        <div className="absolute  h-full    ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#cecece"
                                className="w-full h-full scale-75"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="جستجو کنید برای موقعیت مورد نظر . . ."
                            dir="rtl"
                            className="font-inter outline-2 w-full  flex  outline-stone-500/20 z-20 text-sm rounded-full text-stone-800 p-2"
                            minLength={2}
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                            ref={myRef}
                        />

                    </div>

                    <div className="   absolute w-8/12 h-full justify-center top-full translate-y-1/3 
                      text-my-favourite-black text-sm rounded-b-xl z-10 bg-white shadow-2xl shadow-gray-700 row center ">
                        {
                            error
                                ? error
                                : showSubscribe
                                    ? "حداقل دو کاراکتر برای جستجو مورد نیاز است"
                                    : `جستجو برای شهر یا کشور '${searchValue}'`
                        }
                    </div>

            
                </div>

            </div>
        </>
    )
}