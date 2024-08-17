import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MedicationData } from '../types/Medication';

interface MedicationsContextType {
    medicationsList: MedicationData[] | null;
    setMedicationsList: (medicationsList: MedicationData[] | null) => void;
}

const MedicationsContext = createContext<MedicationsContextType | undefined>(undefined);

export const MedicationsProvider = ({ children }: { children: ReactNode }) => {
    const [medicationsList, setMedicationsList] = useState<MedicationData[] | null>(null);

    return (
        <MedicationsContext.Provider
            value={{
                medicationsList,
                setMedicationsList,
            }}
        >
            {children}
        </MedicationsContext.Provider>
    );
};

export const useMedicationsContext = () => {
    const context = useContext(MedicationsContext);
    if (!context) {
        throw new Error('useContext must be used within an MedicationsProvider');
    }
    return context;
};
