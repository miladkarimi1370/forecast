export const GetDayOfDTTXT = (dtTXT: any) => {
    if (!dtTXT) return "روز نامشخص";

    const date = new Date(dtTXT);

    const lists = [
        "یکشنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
        "شنبه"
    ];
    return lists[date.getDay()];

}