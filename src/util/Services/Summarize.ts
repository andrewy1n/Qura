import axios from 'axios';

const API_KEY_CHAT = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const summarizeJSON = async (JSON: string) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                model: 'gpt-4o-mini',
                response_format: {
                    type: 'json_object',
                },
                messages: [{ role: 'user', content: JSON }],
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY_CHAT}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error communicating with OpenAI API:', error);
        return null;
    }
};
