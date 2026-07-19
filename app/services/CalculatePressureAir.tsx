export const CalculatePressureAirCondition = (press: number) => {
    let result: string;
    if (press < 1000) {
       return  result = "فشار هوای کم (احتمال بارندگی یا طوفان )"
    } else if (press >= 1000 && press < 1012) {
        return result = "فشار هوای معمولی"
    } else if (press >= 1012 && press < 1014) {
      return   result = "فشار هوای استاندارد"
    } else if (press >= 1014 && press <= 1025) {
       return  result = "فشار هوای زیاد ( هوای صاف و پایدار )"
    } else if (press > 1025) {
      return   result = "فشار هوای بسیار زیاد ( هوای کاملا پایدار )"
    }
    
}