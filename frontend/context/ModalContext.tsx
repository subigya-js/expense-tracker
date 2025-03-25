"use client"

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

// Create Context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provide Component
export function ModalProvider ({children}: {children: ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal}}>
            {children}
        </ModalContext.Provider>
    )
}

// Custom hook for easy access
export function useModal() {
    const context = useContext(ModalContext);

    if(!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    
    return context;
}
