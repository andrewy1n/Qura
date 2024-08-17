import { openFDAClient } from '../util/API';
import { useMedicationsContext } from '../context/MedicationsContext';
import { MedicationData, MedicationSummary, SearchMedicationInfo } from '../types/Medication';
import { useState } from 'react';
import axios from 'axios';
import { sendMessageToChatGPT } from '../util/LLM';
import { Alert } from 'react-native';

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
            const response = await openFDAClient.get('/', {
                params: {
                    search: `openfda.upc.exact:${upcNumber}`,
                },
            });

            return response.data.results[0];
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

            const summaryPrompt = `Summarize this data into a JSON string with 6 categories that contains only text: 
            {
                contraindictions,
                mechanism_of_action,
                description,
                drug_interactions,
                storage_and_handling,
                information_for_patients,
            }
            ${JSON.stringify(results)}
            
            Only give me a JSON`;
            const reply = await sendMessageToChatGPT(summaryPrompt);
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

    return {
        searchByNDC,
        searchByUPC,
        searchByName,
        addMedication,
        searchList,
        setSearchList,
        deleteMedication,
        isLoading,
    };
};
