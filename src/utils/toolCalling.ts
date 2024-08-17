import axios from 'axios';

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
    const response = await axios.get(`https://api.fda.gov/drug/label.json?search=${params.keyword}`);
    const results = response.data.results[0];

    //console.log('Drug info:', results);

    return {
      purpose: results.purpose,
      when_using: results.when_using,
      pregnancy_or_breeding: results.pregnancy_or_breast_feeding,
      storage_and_handling: results.storage_and_handling,
      indications_and_usage: results.indications_and_usage,
      active_ingredient: results.active_ingredient,
      ask_doctor: results.ask_doctor,
      dosage_and_administration: results.dosage_and_administration,
      stop_use: results.stop_use,
      do_not_use: results.do_not_use,
    };
  } catch (error) {
    console.error('Error fetching drug info:', error);
    throw new Error('Failed to fetch drug information');
  }
};