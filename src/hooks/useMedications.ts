import { openFDAClient } from '../util/API';
import { useMedicationsContext } from '../context/MedicationsContext';
import { MedicationData, SearchMedicationInfo } from '../types/Medication';
import { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { summarizeJSON } from '../util/Services/Summarize';

export const useMedications = () => {
    const { medicationsList, setMedicationsList } = useMedicationsContext();
    const [searchList, setSearchList] = useState<SearchMedicationInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchByNDC = async (ndcNumber: string) => {
        try {
            const response = await openFDAClient.get('/', {
                params: {
                    search: `openfda.product_ndc.exact:${ndcNumber}`,
                    limit: 1,
                },
            });
            const results = response.data.results;
            const searchList: SearchMedicationInfo[] = [];

            for (const result of results) {
                searchList.push({
                    brand_name: result.openfda.brand_name[0],
                    ndc_number: ndcNumber,
                });
            }

            setSearchList(searchList);
            return;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setSearchList([]);
            } else {
                console.error('Error fetching data from openFDA API:', error);
                throw error;
            }
        }
    };

    const searchByUPC = async (upcNumber: string) => {
        try {
            console.log(upcNumber);

            const response = await openFDAClient.get('/', {
                params: {
                    search: `openfda.upc.exact:${upcNumber}`,
                },
            });

            const result = response.data.results[0];

            const item: SearchMedicationInfo = {
                brand_name: result.openfda.brand_name[0],
                ndc_number: result.openfda.product_ndc[0],
            };

            return item;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                Alert.alert('Product Not Found', 'Please try again.');
            } else {
                console.error('Error fetching data from openFDA API:', error);
                throw error;
            }
        }
    };

    const searchByName = async (name: string) => {
        try {
            const response = await openFDAClient.get('/', {
                params: {
                    search: `openfda.brand_name:${name}`,
                    limit: 5,
                },
            });

            const results = response.data.results;
            const searchList: SearchMedicationInfo[] = [];

            for (const result of results) {
                searchList.push({
                    brand_name: result.openfda.brand_name[0],
                    ndc_number: result.openfda.product_ndc[0],
                });
            }

            setSearchList(searchList);
            return;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setSearchList([]);
            } else {
                console.error('Error fetching data from openFDA API:', error);
                throw error;
            }
        }
    };

    const addMedication = async (ndcNumber: string) => {
        setIsLoading(true);
        try {
            const response = await openFDAClient.get('/', {
                params: {
                    search: `openfda.product_ndc.exact:${ndcNumber}`,
                },
            });

            const results = response.data.results;

            const summaryPrompt = `Summarize this data into a single JSON object, no name, with 7 categories that contains only text in layman-terms, 
            {
                contraindications,
                mechanism_of_action,
                description,
                drug_interactions,
                storage_and_handling,
                information_for_patients,
                common_side_effects
            }
            ${JSON.stringify(results)}`;
            const reply = await summarizeJSON(summaryPrompt);
            console.log(reply);

            const medication: MedicationData = {
                ndc_number: ndcNumber,
                brand_name: results[0].openfda.brand_name[0],
                summary: JSON.parse(reply),
            };

            if (medicationsList) setMedicationsList([...medicationsList, medication]);
            else setMedicationsList([medication]);
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error('Error fetching data from openFDA API:', error);
            setIsLoading(false);
            return false;
        }
    };

    const deleteMedication = (ndcNumber: string) => {
        const updatedList = medicationsList?.filter(
            (medication) => medication.ndc_number !== ndcNumber
        );
        setMedicationsList(updatedList || null);
    };

    const createMedPrompt = (text: string) => {
        return text + medicationsList?.map(({ brand_name }) => brand_name).join(', ');
    };

    return {
        searchByNDC,
        searchByUPC,
        searchByName,
        addMedication,
        searchList,
        setSearchList,
        deleteMedication,
        isLoading,
        createMedPrompt,
    };
};
