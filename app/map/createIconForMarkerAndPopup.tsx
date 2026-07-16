import dynamic from "next/dynamic";
import { useEffect, useState } from "react"
import type { Icon } from "leaflet";
import { useWeatherStore } from "../store/store";


interface coords {
    lat: number,
    long: number
}

const Marker = dynamic(() => import("react-leaflet").then((mode) => mode.Marker), {
    ssr: false,

});



const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false
})



export default function CreateIconForMarkerAndPopup({ lat, long }: coords) {
    const [icon, setIcon] = useState<Icon | null>(null);
    const { data } = useWeatherStore()

    useEffect(() => {

        import("leaflet").then((L) => {
            const defaultIcon = L.icon({
                iconUrl: "/img/cursor.png",
                // shadowUrl: "/img/checked.png"
            })
            setIcon(defaultIcon)

        })

    }, [])




    if (!icon) return null


    return (
        <>
            <Marker draggable position={[lat, long]} icon={icon}>
                <Popup >


                    <span className="text-blue-600 font-bold" dir="rtl"> / <span className="text-blue-600 font-bold" dir="rtl">کشور :</span>  {data?.country} </span>
                    <span className="text-blue-600 font-bold" dir="ltr">  {data?.name} </span>
                    <span className="text-red-600 font-bold" dir="rtl">موقعیت مکانی شما : </span>
                </Popup>
            </Marker>
        </>
    )
}