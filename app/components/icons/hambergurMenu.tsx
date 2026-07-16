export default function HamburgrMenu() {
    return (
        <>
            <button className="w-12 h-12 cursor-pointer bg-white rounded-full flex items-center justify-center xl:hidden">

                <div className="w-5/12 h-5/12 row center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                </div>

            </button>
        </>
    )
}