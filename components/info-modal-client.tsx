"use client";

import {InfoModal} from "@/components/info-modal";
import {useInfoModal} from "@/hooks/useInfoModal";

export const InfoModalClient = () => {
    const { isOpen, closeModal } = useInfoModal();

    return (
        <InfoModal onClose={closeModal} visible={isOpen} />
    )
}
