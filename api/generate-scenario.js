import { randomUUID } from 'crypto';

const MOCK_SCENARIOS = {
  confirmation_bias: [
    {
      scenario: "You're playing a new video game and hear that 'blue potions are always good for health.' You find different colored potions - what do you do?",
      choices: [
        "Only collect blue potions because you heard they're good",
        "Try each potion carefully and record what happens",
        "Avoid all potions just to be safe"
      ],
      correctAnswerIndex: 1,
      explanation: "Testing all potions helps you find the truth instead of assuming blue ones are always best."
    },
    {
      scenario: "Your friend says 'cats are better pets than dogs' and shows you 5 videos of cats being cute. What's your next step?",
      choices: [
        "Agree that cats must be better since you saw cute videos",
        "Look for videos of both cats AND dogs being cute",
        "Ignore all pet videos completely"
      ],
      correctAnswerIndex: 1,
      explanation: "Looking at both cat AND dog videos helps you make a fair comparison."
    }
  ]
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { bias } = req.body;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const endpoint = 'https://api.deepseek.com/v1/chat/completions';
  const model = 'deepseek-chat';

  if (!apiKey) {
    // Fallback to mock data
    const scenarios = MOCK_SCENARIOS[bias] || MOCK_SCENARIOS.confirmation_bias;
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    return res.status(200).json({ ...scenario, id: randomUUID(), source: 'mock' });
  }

  try {
    const prompt = `Generate a decision-making scenario for a child 8–12 to demonstrate ${bias.replace('_', ' ')}. Include 2–3 options and the correct one. Return JSON: { scenario, choices[], correctAnswerIndex }`;
    const deepseekRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });
    if (!deepseekRes.ok) {
      throw new Error(`DeepSeek error: ${deepseekRes.status}`);
    }
    const data = await deepseekRes.json();
    const scenario = JSON.parse(data.choices[0].message.content);
    return res.status(200).json({ ...scenario, id: randomUUID(), source: 'deepseek' });
  } catch (error) {
    // Fallback to mock data on error
    const scenarios = MOCK_SCENARIOS[bias] || MOCK_SCENARIOS.confirmation_bias;
    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    return res.status(200).json({ ...scenario, id: randomUUID(), source: 'mock', error: error.message });
  }
} 