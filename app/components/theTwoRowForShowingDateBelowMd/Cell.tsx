"use client";
import { useEffect, useState } from "react"

interface dateAndTime {
    date: string,
    time: string
}

export default function Cell({ date, time }: dateAndTime) {
    const [formattedDate, setFormattedDate] = useState("");
    const [formattedTime, setFormattedTime] = useState("");
    useEffect(() => {
        const dateObj = new Date(`${date}T${time}`);

        const faDate = Intl.DateTimeFormat("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            calendar: "persian"
        }).format(dateObj);


        const faTime = Intl.DateTimeFormat("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,

        }).format(dateObj);


        setFormattedDate(faDate);
        setFormattedTime(faTime);
    }, [date, time])


if (!formattedDate || !formattedTime) {
        return (
            <div className="w-full h-40 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-xl">
                <div className="text-gray-400">در حال بارگذاری...</div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full h-40 absolute top-28 left-14 bg-blue-300 z-[1000]">
                <div>{formattedDate}</div>
                <div>{formattedTime}</div>
            </div>
        </>
    )
}