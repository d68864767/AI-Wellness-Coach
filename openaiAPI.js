const openai = require('openai');

openai.apiKey = 'YOUR_OPENAI_API_KEY';

const setup = async () => {
    console.log('OpenAI API setup complete.');
};

const generateResponse = async (prompt) => {
    try {
        const response = await openai.Completion.create({
            engine: 'davinci-codex',
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.7
        });

        return response.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating response from OpenAI API:', error);
    }
};

module.exports = {
    setup,
    generateResponse
};
