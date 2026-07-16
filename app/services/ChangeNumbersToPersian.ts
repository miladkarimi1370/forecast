export const ChangeNumbersToPersian = (num: any) => {
    const faNumber = new Intl.NumberFormat("fa-IR").format(num);

    return faNumber
}

export const ChangeNumbersToPersianDate = (num: any) => {
    const faNumber = new Intl.DateTimeFormat("fa-IR").format(num);

    return faNumber
}

export const ChangeStringtoPersianDate = (date : string) => {
    return new Intl.DateTimeFormat("fa-IR").format(new Date(date))
}
