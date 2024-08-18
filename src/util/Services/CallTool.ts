import axios from 'axios';
import { summarizeJSON } from './Summarize';

export const callTool = async (toolName: string, params: Record<string, any>) => {
    switch (toolName) {
        case 'query_drug_tool':
            const result = await getDrugInfo(params as { keyword: string });
            return JSON.stringify(result);
        // Add other tool cases as needed
        default:
            throw new Error('Unknown tool');
    }
};

// Example function for querying drug information
const getDrugInfo = async (params: { keyword: string }) => {
    try {
        const response = await axios.get(
            `https://api.fda.gov/drug/label.json?search=${params.keyword}`
        );
        const results = response.data.results;

        // summarize the data into a single JSON object
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

        return reply;
    } catch (error) {
        console.error('Error fetching drug info:', error);
        throw new Error('Failed to fetch drug information');
    }
};
