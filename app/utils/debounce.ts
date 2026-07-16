export function debounce<T extends (...arg: any[]) => void>(func: T, delay: number) {
    let timeoutId: NodeJS.Timeout | number;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}