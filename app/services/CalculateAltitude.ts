export const calculateAltitude = (seaLevel: number | undefined, Grandlevel: number | undefined) => {
    if (seaLevel && Grandlevel) {
        const diff = seaLevel - Grandlevel;
        return Math.round(diff * 8.3);
    }

}