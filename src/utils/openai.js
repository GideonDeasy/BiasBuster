// Mock data for when OpenAI API is not available
export const MOCK_SCENARIOS = {
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
  ],
  availability_bias: [
    {
      scenario: "After watching a news story about a shark at the beach, you're invited to go swimming. How do you decide if it's safe?",
      choices: [
        "Don't go swimming because sharks are everywhere now",
        "Check local beach safety reports and statistics",
        "Only swim where you can see the bottom"
      ],
      correctAnswerIndex: 1,
      explanation: "Using real data helps you make better decisions than recent scary news."
    }
  ]
};

export const MOCK_FEEDBACK = {
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

const createOpenAIPrompt = (bias, type) => {
  const prompts = {
    scenario: `Generate a decision-making scenario for a child aged 8-12 to demonstrate ${bias.replace(
      '_',
      ' '
    )}. The scenario should be fun, relatable, and educational. Include 3 choices where one clearly demonstrates avoiding the bias. Return JSON in this format:
    {
      "scenario": "the situation description",
      "choices": ["choice1", "choice2", "choice3"],
      "correctAnswerIndex": 1,
      "explanation": "why this is the best choice"
    }`,
    evaluation: `Evaluate this choice for demonstrating understanding of ${bias.replace(
      '_',
      ' '
    )}. Provide kid-friendly feedback that teaches without discouraging. Return JSON:
    {
      "score": 1-5,
      "feedback": "encouraging explanation"
    }`
  };
  return prompts[type];
};

export async function generateScenario(bias) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  console.log('🔍 Debug: Checking API key...');
  console.log('🔍 Debug: API key exists:', !!apiKey);
  console.log('🔍 Debug: API key length:', apiKey ? apiKey.length : 0);
  
  if (!apiKey) {
    console.log('❌ No OpenAI API key found, using mock data');
    const scenarios = MOCK_SCENARIOS[bias] || MOCK_SCENARIOS.confirmation_bias;
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }

  console.log('✅ API key found, attempting OpenAI request...');
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [{
          role: "user",
          content: createOpenAIPrompt(bias, 'scenario')
        }],
        temperature: 0.7
      })
    });

    console.log('📡 OpenAI response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ OpenAI response received:', data);
    
    const parsedContent = JSON.parse(data.choices[0].message.content);
    console.log('✅ Parsed scenario:', parsedContent);
    
    return parsedContent;
  } catch (error) {
    console.error('❌ Error generating scenario:', error);
    console.log('🔄 Falling back to mock data');
    return MOCK_SCENARIOS[bias] ? MOCK_SCENARIOS[bias][0] : MOCK_SCENARIOS.confirmation_bias[0];
  }
}

export async function evaluateAnswer(bias, scenario, userAnswerIndex, correctAnswerIndex) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  console.log('🔍 Debug: Evaluating answer with API key...');
  console.log('🔍 Debug: API key exists:', !!apiKey);
  
  if (!apiKey) {
    console.log('❌ No OpenAI API key found, using mock feedback');
    return {
      score: userAnswerIndex === correctAnswerIndex ? 5 : 2,
      feedback: userAnswerIndex === correctAnswerIndex 
        ? MOCK_FEEDBACK.correct[Math.floor(Math.random() * MOCK_FEEDBACK.correct.length)]
        : MOCK_FEEDBACK.incorrect[Math.floor(Math.random() * MOCK_FEEDBACK.incorrect.length)]
    };
  }

  console.log('✅ API key found, attempting OpenAI evaluation...');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [{
          role: "user",
          content: `
            Scenario: ${scenario}
            User's Choice Index: ${userAnswerIndex}
            Correct Choice Index: ${correctAnswerIndex}
            ${createOpenAIPrompt(bias, 'evaluation')}
          `
        }],
        temperature: 0.7
      })
    });

    console.log('📡 OpenAI evaluation response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ OpenAI evaluation response received:', data);
    
    const parsedContent = JSON.parse(data.choices[0].message.content);
    console.log('✅ Parsed evaluation:', parsedContent);
    
    return parsedContent;
  } catch (error) {
    console.error('❌ Error evaluating answer:', error);
    console.log('🔄 Falling back to mock feedback');
    return {
      score: userAnswerIndex === correctAnswerIndex ? 5 : 2,
      feedback: MOCK_FEEDBACK.incorrect[0]
    };
  }
} 