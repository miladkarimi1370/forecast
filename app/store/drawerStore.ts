import { create } from "zustand";

interface showDrawer {
    showDrawer: boolean,
    active: boolean,
    changeDrawerState: (state: boolean, active: boolean) => void
}


export const useShowDrawer = create<showDrawer>((set) => ({
    showDrawer: false,
    active: false,
    changeDrawerState: (state, active) => set({ showDrawer: state, active: active })
}))

