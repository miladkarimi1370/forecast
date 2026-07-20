"use client"
import { InputSearchFunctionality } from "@/app/store/InputSearchFunctionality"

export default function SearchIcon() {
  const {changeShow } = InputSearchFunctionality();

 
    return (
        <>
  <button className="cursor-pointer w-12 h-12 bg-white rounded-full flex items-center justify-center xl:hidden"
  onClick={changeShow}
  >
  
  <div className="w-5/12 h-5/12 row center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="blue"
      className="w-full h-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  </div>

</button>


        </>
    )
}