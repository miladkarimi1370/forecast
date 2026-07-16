import HamburgrMenu from "../components/icons/hambergurMenu";
import Logo from "../components/icons/Logo";
import SearchIcon from "../components/icons/SearchIcon";
import InputSearchForHeader from "../components/inputSearch/InputSearchForHeader";

export default function MyHeader() {
    return (
        <>
            <header className=" w-full h-24 row fixed *:px-5 z-50 ">
                <div className="w-6/12  xl:w-5/12 h-full  row justify-start items-center ">
                    <Logo />
                    <InputSearchForHeader />
                </div>
                <div className="w-6/12 h-full  row justify-end items-center *:mx-2">
                    <SearchIcon />
                    <HamburgrMenu />
                </div>
            </header>
        </>
    )
}