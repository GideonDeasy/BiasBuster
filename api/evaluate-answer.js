const MOCK_FEEDBACK = {
  correct: [
    "Great thinking! You avoided the bias trap!",
    "Super job! You looked at all the evidence!",
    "Amazing work! You're becoming a master bias-buster!"
  ],
  incorrect: [
    "Good try! Remember to look for ALL the evidence, not just what supports your first idea.",
    "Nice effort! Next time, try to test your assumptions by looking for different viewpoints.",
    "Keep going! Remember that our first guess isn't always the whole story."
  ]
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { bias, scenario, choices, userAnswerIndex, correctAnswerIndex } = req.body;
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const endpoint = 'https://api.deepseek.com/v1/chat/completions';
  const model = 'deepseek-chat';

  if (!apiKey) {
    // Fallback to mock feedback
    const isCorrect = userAnswerIndex === correctAnswerIndex;
    return res.status(200).json({
      score: isCorrect ? 5 : 2,
      feedback: isCorrect
        ? MOCK_FEEDBACK.correct[Math.floor(Math.random() * MOCK_FEEDBACK.correct.length)]
        : MOCK_FEEDBACK.incorrect[Math.floor(Math.random() * MOCK_FEEDBACK.incorrect.length)],
      source: 'mock'
    });
  }

  try {
    const prompt = `Evaluate this choice for ${bias.replace('_', ' ')}.\nScenario: ${scenario}\nChoices: ${JSON.stringify(choices)}\nUser's Choice Index: ${userAnswerIndex}\nCorrect Choice Index: ${correctAnswerIndex}\nReturn JSON: { score: 1-5, feedback: short explanation }`;
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
    const feedback = JSON.parse(data.choices[0].message.content);
    return res.status(200).json({ ...feedback, source: 'deepseek' });
  } catch (error) {
    // Fallback to mock feedback on error
    const isCorrect = userAnswerIndex === correctAnswerIndex;
    return res.status(200).json({
      score: isCorrect ? 5 : 2,
      feedback: MOCK_FEEDBACK.incorrect[0],
      source: 'mock',
      error: error.message
    });
  }
} 