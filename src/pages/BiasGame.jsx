import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateScenario, evaluateAnswer } from '../utils/openai';
import GameImage from '../components/GameImage';
import { imagePrompts } from '../utils/imagePrompts';

const BIASES = [
  { 
    id: 'confirmation_bias', 
    name: 'Confirmation Bias', 
    description: "Only looking for information that supports what you already believe"
  },
  { 
    id: 'availability_bias', 
    name: 'Availability Bias',
    description: "Thinking something is more likely just because it's easier to remember"
  }
];

export default function BiasGame() {
  const [selectedBias, setSelectedBias] = useState(BIASES[0]);
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const fetchNewScenario = async () => {
    setLoading(true);
    setScenario(null);
    setSelectedAnswer(null);
    setFeedback(null);
    
    try {
      const newScenario = await generateScenario(selectedBias.id);
      setScenario(newScenario);
    } catch (error) {
      console.error('Error fetching scenario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBiasChange = (biasId) => {
    const bias = BIASES.find(b => b.id === biasId);
    setSelectedBias(bias);
    fetchNewScenario();
  };

  const handleAnswerSelect = async (answerIndex) => {
    if (selectedAnswer !== null || loading) return;
    
    setSelectedAnswer(answerIndex);
    setLoading(true);

    try {
      const result = await evaluateAnswer(
        selectedBias.id,
        scenario.scenario,
        answerIndex,
        scenario.correctAnswerIndex
      );
      
      setFeedback(result.feedback);
      setScore(prev => prev + result.score);
    } catch (error) {
      console.error('Error evaluating answer:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewScenario();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Bias Buster Challenge</h1>
        <p className="text-gray-600">Score: {score} points</p>
      </div>

      {/* Bias Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose a Bias to Practice:
        </label>
        <select
          value={selectedBias.id}
          onChange={(e) => handleBiasChange(e.target.value)}
          className="w-full p-2 border rounded-lg bg-white shadow-sm"
          disabled={loading}
        >
          {BIASES.map(bias => (
            <option key={bias.id} value={bias.id}>
              {bias.name}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-gray-500">{selectedBias.description}</p>
      </div>

      {/* Game Area */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </motion.div>
          ) : scenario ? (
            <motion.div
              key="scenario"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Scenario Image */}
              <div className="mb-6">
                <GameImage
                  src="/placeholder-scenario.png"
                  alt="Scenario illustration"
                  className="w-full h-48 object-cover rounded-lg"
                  prompt={imagePrompts[selectedBias.id]?.game}
                />
              </div>

              {/* Scenario Text */}
              <p className="text-lg mb-6">{scenario.scenario}</p>

              {/* Choices */}
              <div className="space-y-3">
                {scenario.choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-lg transition-colors ${
                      selectedAnswer === null
                        ? 'hover:bg-blue-50 bg-gray-50'
                        : selectedAnswer === index
                        ? index === scenario.correctAnswerIndex
                          ? 'bg-green-100 border-green-500'
                          : 'bg-red-100 border-red-500'
                        : index === scenario.correctAnswerIndex
                        ? 'bg-green-100 border-green-500'
                        : 'bg-gray-50'
                    } ${
                      selectedAnswer !== null ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-lg bg-blue-50"
                  >
                    <p className="text-blue-700">{feedback}</p>
                    <button
                      onClick={fetchNewScenario}
                      className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Next Scenario
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Something went wrong. Please try again.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 