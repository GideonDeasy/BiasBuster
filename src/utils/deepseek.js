// DeepSeek API integration for Bias Buster
// Mock data for when DeepSeek API is not available
export const MOCK_SCENARIOS = {
  confirmation_bias: [
    {
      scenario: "You're playing a new video game and hear that 'blue potions are always good for health.' You find different colored potions scattered around the game world. What do you do to make the best decisions?",
      explanation: "This scenario tests whether you'll only look for information that confirms what you already heard, or if you'll test all possibilities."
    },
    {
      scenario: "Your friend says 'cats are better pets than dogs' and shows you 5 videos of cats being cute. You're thinking about getting a pet. How do you decide what's best for you?",
      explanation: "This scenario challenges you to look for balanced information instead of just accepting what supports one viewpoint."
    }
  ],
  availability_bias: [
    {
      scenario: "After watching a news story about a shark attack at the beach, you're invited to go swimming at your local beach. How do you decide if it's safe to go swimming?",
      explanation: "This scenario tests whether you'll be overly influenced by a recent scary story or if you'll look at actual data and statistics."
    }
  ],
  anchoring_bias: [
    {
      scenario: "You see a toy marked down from $100 to $30. Your friend says it's a great deal because it's 70% off. You have $35 to spend on a gift. What do you do before deciding?",
      explanation: "This scenario tests whether you'll be anchored by the original price or if you'll research the toy's actual value."
    }
  ],
  dunning_kruger: [
    {
      scenario: "You beat level 1 of a new video game easily on your first try. Your younger cousin asks if you can teach them advanced strategies for the whole game. How do you respond?",
      explanation: "This scenario tests whether you'll overestimate your expertise based on limited experience or stay humble about what you actually know."
    }
  ]
};

export const MOCK_FEEDBACK = {
  correct: [
    "Great thinking! You avoided the bias trap!",
    "Super job! You looked at all the evidence!",
    "Amazing work! You're becoming a master bias-buster!",
    "Excellent! You thought critically instead of jumping to conclusions!"
  ],
  incorrect: [
    "Good try! Remember to look for ALL the evidence, not just what supports your first idea.",
    "Nice effort! Next time, try to test your assumptions by looking for different viewpoints.",
    "Keep going! Remember that our first guess isn't always the whole story.",
    "Great attempt! Try to think about what other information might be helpful."
  ]
};

const createDeepSeekPrompt = (bias, type) => {
  const prompts = {
    scenario: `Generate a decision-making scenario for a child aged 8-12 to demonstrate ${bias.replace(
      '_',
      ' '
    )}. The scenario should be fun, relatable, and educational. Create a situation where the child needs to think carefully to avoid falling into the bias trap.

IMPORTANT: Return ONLY valid JSON. Do not include markdown formatting, code blocks, or any other text. Just the raw JSON object.

Required JSON format:
{
  "scenario": "A detailed, engaging situation that presents a bias challenge",
  "explanation": "Brief explanation of how this scenario relates to the bias"
}`,
    evaluation: `Evaluate this choice for demonstrating understanding of ${bias.replace(
      '_',
      ' '
    )}. Provide kid-friendly feedback that teaches without discouraging. 

IMPORTANT: Return ONLY valid JSON. Do not include markdown formatting, code blocks, or any other text. Just the raw JSON object.

Required JSON format:
{
  "score": 3,
  "feedback": "encouraging explanation of why this choice was good or how to improve"
}`
  };
  return prompts[type];
};

export async function generateScenario(bias) {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  
  console.log('🔍 Debug: Checking DeepSeek API key...');
  console.log('🔍 Debug: API key exists:', !!apiKey);
  console.log('🔍 Debug: API key length:', apiKey ? apiKey.length : 0);
  
  if (!apiKey || apiKey === 'your_actual_deepseek_api_key_here') {
    console.log('❌ No valid DeepSeek API key found, using mock data');
    const scenarios = MOCK_SCENARIOS[bias] || MOCK_SCENARIOS.confirmation_bias;
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }

  console.log('✅ DeepSeek API key found, attempting request...');
  
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{
          role: "user",
          content: createDeepSeekPrompt(bias, 'scenario')
        }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    console.log('📡 DeepSeek response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ DeepSeek API error:', response.status, errorText);
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ DeepSeek response received:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from DeepSeek API');
    }
    
    const content = data.choices[0].message.content.trim();
    console.log('📝 Raw content from DeepSeek:', content);
    
    // Clean the content to ensure valid JSON
    let cleanContent = content;
    
    // Remove any markdown code blocks if they exist
    if (cleanContent.includes('```json')) {
      cleanContent = cleanContent.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
    }
    
    // Remove any extra whitespace and newlines
    cleanContent = cleanContent.trim();
    
    // Try to find JSON object in the response
    const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanContent = jsonMatch[0];
    }
    
    console.log('🧹 Cleaned content for parsing:', cleanContent);
    
    let parsedContent;
    try {
      parsedContent = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('❌ Content that failed to parse:', cleanContent);
      throw new Error('Failed to parse JSON response from DeepSeek API');
    }
    
    console.log('✅ Parsed scenario:', parsedContent);
    
    // Validate the response has required fields
    if (!parsedContent.scenario || !parsedContent.explanation) {
      throw new Error('Invalid scenario format from DeepSeek API');
    }
    
    return parsedContent;
  } catch (error) {
    console.error('❌ Error generating scenario with DeepSeek:', error);
    console.log('🔄 Falling back to mock data');
    const scenarios = MOCK_SCENARIOS[bias] || MOCK_SCENARIOS.confirmation_bias;
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }
}

export async function evaluateAnswer(bias, scenario, userResponse) {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  
  console.log('🔍 Debug: Evaluating answer with DeepSeek...');
  console.log('🔍 Debug: API key exists:', !!apiKey);
  
  if (!apiKey || apiKey === 'your_actual_deepseek_api_key_here') {
    console.log('❌ No valid DeepSeek API key found, using mock feedback');
    return {
      score: Math.floor(Math.random() * 3) + 3, // Random score 3-5
      feedback: MOCK_FEEDBACK.correct[Math.floor(Math.random() * MOCK_FEEDBACK.correct.length)]
    };
  }

  console.log('✅ DeepSeek API key found, attempting evaluation...');

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{
          role: "user",
          content: `You're helping a child understand the bias: ${bias.replace('_', ' ')}. Here's a scenario: ${scenario}

They wrote the following response: ${userResponse}

Evaluate their response on how well it avoids or overcomes the bias. Use a score from 1–5, where:
- 1 = Completely biased thinking
- 5 = Fully debiased, thoughtful answer

Also give a 1–2 sentence feedback tip in friendly language.

IMPORTANT: Return ONLY valid JSON. Do not include markdown formatting, code blocks, or any other text. Just the raw JSON object.

Required JSON format:
{
  "score": 3,
  "feedback": "kid-friendly advice..."
}`
        }],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    console.log('📡 DeepSeek evaluation response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ DeepSeek API evaluation error:', response.status, errorText);
      throw new Error(`DeepSeek API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ DeepSeek evaluation response received:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from DeepSeek API');
    }
    
    const content = data.choices[0].message.content.trim();
    console.log('📝 Raw evaluation content from DeepSeek:', content);
    
    // Clean the content to ensure valid JSON
    let cleanContent = content;
    
    // Remove any markdown code blocks if they exist
    if (cleanContent.includes('```json')) {
      cleanContent = cleanContent.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
    }
    
    // Remove any extra whitespace and newlines
    cleanContent = cleanContent.trim();
    
    // Try to find JSON object in the response
    const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanContent = jsonMatch[0];
    }
    
    console.log('🧹 Cleaned evaluation content for parsing:', cleanContent);
    
    let parsedContent;
    try {
      parsedContent = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('❌ Content that failed to parse:', cleanContent);
      throw new Error('Failed to parse JSON response from DeepSeek API');
    }
    
    console.log('✅ Parsed evaluation:', parsedContent);
    
    // Validate the response has required fields
    if (typeof parsedContent.score === 'undefined' || !parsedContent.feedback) {
      throw new Error('Invalid evaluation format from DeepSeek API');
    }
    
    return parsedContent;
  } catch (error) {
    console.error('❌ Error evaluating answer with DeepSeek:', error);
    console.log('🔄 Falling back to mock feedback');
    return {
      score: Math.floor(Math.random() * 3) + 3, // Random score 3-5
      feedback: MOCK_FEEDBACK.correct[Math.floor(Math.random() * MOCK_FEEDBACK.correct.length)]
    };
  }
} 