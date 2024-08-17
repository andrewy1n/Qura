export interface MedicationData {
    summary: MedicationSummary;
    brand_name: string;
    ndc_number: string;
}

export interface MedicationSummary {
    contraindictions: string;
    mechanism_of_action: string;
    description: string;
    drug_interactions: string;
    storage_and_handling: string;
    information_for_patients: string;
}

export interface SearchMedicationInfo {
    brand_name: string;
    ndc_number: string;
}
