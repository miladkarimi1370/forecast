"use client";

import { useShowDrawer } from "@/app/store/drawerStore";
import { useWeatherStore } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";



export default function CurrentPositionIcon() {

    const { getUserLocation, coords, setCoords } = useWeatherStore();
    const {changeDrawerState } = useShowDrawer();
    const map = useMapEvents({
        click(e) {
        
       setCoords(e.latlng.lat , e.latlng.lng);
       changeDrawerState(true , true)
           
        },
        
        locationfound(e) {
            map.flyTo(e.latlng, 16, { duration: 1.2 });
        }
    });

    useEffect(() => {
        if (coords.lat && coords.lon) {
            map.flyTo([coords.lat, coords.lon], 16, { duration: 1.5 })
        }

    
    }, [coords, map])

    return (
        <>
            <div className="bg-transparent w-40 h-40 absolute bottom-[18%] right-4  row center  z-[1000]">

                <button
                    className="font-serif text-md bg-favourite-purple text-white text-center  px-4 py-2 absolute 
                 after:content-[''] after:absolute after:w-2 after:h-2 after:rounded-full after:bg-favourite-purple after:-top-1 after:-right-1 after:animate-pulse
                  rounded-sm cursor-pointer hover:opacity-70 duration-300"
                    onClick={() => {
                        getUserLocation()

                    }}
                >
                    موقعیت مکانی من
                </button>

            </div>
        </>
    )
}


