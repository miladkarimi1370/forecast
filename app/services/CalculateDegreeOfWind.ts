export function getWindDirection(deg: number) {
    const directions = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW",
    ];

    return directions[Math.round(deg / 45) % 8];
}