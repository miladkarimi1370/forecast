import { create } from "zustand";

interface Tshow {
    show: boolean;
    changeShow: () => void;
}


export const InputSearchFunctionality = create<Tshow>((set) => ({
    show: false,

    changeShow: () =>
        set((state) => ({
            show: !state.show,
        })),
}));