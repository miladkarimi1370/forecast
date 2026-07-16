export const CalculateUTC = (num : number = 0) => {
        const hours = num / 3600;
        const sing = hours >= 0 ? "+" : "-";
    const offset = Math.abs(hours)
        return `UTC ${sing} ${offset} `
}