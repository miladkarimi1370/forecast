"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useWeatherStore } from "../store/store";
import CreateIconForMarkerAndPopup from "./createIconForMarkerAndPopup";
import CurrentPositionIcon from "../components/currentPositionIcon/CurrentPositionIcon";



const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
    ssr: false
})

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen ">
            <p>loading . . .</p>
        </div>
    )
})


const ZoomControl = dynamic(() => import("react-leaflet").then((mod) => mod.ZoomControl), {
    ssr: false
})

export default function Map() {
    const [isClient, setIsClient] = useState<boolean>(false);

    const { coords, fetchWeather , fetchWeatherForFiveDays   } = useWeatherStore();

 

    useEffect(() => {
        async function primaryFetch() {
           await fetchWeather(coords.lat , coords.lon);
           await fetchWeatherForFiveDays(coords.lat , coords.lon)
        }
        primaryFetch()
        setIsClient(true);

     

    }, [coords])

    if (!isClient) {
        return (
            <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
                <p className="text-xl text-my-favourite-black">Loading Map...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-screen relative z-10 ">
            <MapContainer
                center={[coords.lat, coords.lon] }
                zoom={15}

                scrollWheelZoom={true}
                className="h-full w-full absolute inset-0"
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
         
                <CreateIconForMarkerAndPopup lat={coords.lat} long={coords.lon} />
                <CurrentPositionIcon />
                <ZoomControl position="bottomright" />

            </MapContainer>
        </div>
    );
}