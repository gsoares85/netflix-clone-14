import {create} from "zustand/react";

export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
}

export const useInfoModal = create<ModalStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModal: (movieId) => set({isOpen: true, movieId}),
    closeModal: () => set({isOpen: false, movieId: undefined})
}));
