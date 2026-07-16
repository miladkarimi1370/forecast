

import Map from "./map/page";
import MyHeader from "./header/page";

import BelowRowForMdDown from "./BelowRowForMdDown/page";
import InformationWeather from "./InformationWeather/page";




export default function Home() {


  return (

    <>
      <MyHeader />
      <Map />
      {/* <BelowRowForMdDown /> */}
    <InformationWeather />
    </>

  );
}
