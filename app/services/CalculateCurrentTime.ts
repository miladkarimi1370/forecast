export const CalculateCurrentTime = (timeZone: number, dt: number) : Date => {
    const UtcMs = dt * 1000;
    const Localms = UtcMs + timeZone * 1000;
    const local = new Date(Localms);

    return local
}