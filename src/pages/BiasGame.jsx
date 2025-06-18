import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateScenario, evaluateAnswer } from '../utils/deepseek';
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
  },
  { 
    id: 'anchoring_bias', 
    name: 'Anchoring Bias',
    description: "Being too influenced by the first piece of information you hear"
  },
  { 
    id: 'dunning_kruger', 
    name: 'Dunning-Kruger Effect',
    description: "Overestimating your abilities when you know very little about something"
  }
];

export default function BiasGame() {
  const [selectedBias, setSelectedBias] = useState(BIASES[0]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [scenarioBuffer, setScenarioBuffer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [backgroundLoading, setBackgroundLoading] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPreloading, setIsPreloading] = useState(false);

  // Function to load a single scenario
  const loadSingleScenario = async (biasId) => {
    try {
      const scenario = await generateScenario(biasId);
      return scenario;
    } catch (error) {
      console.error('Error loading scenario:', error);
      return null;
    }
  };

  // Function to fill the scenario buffer
  const fillScenarioBuffer = async (biasId, targetCount = 3) => {
    // Use a callback to get the most current buffer state
    setScenarioBuffer(currentBuffer => {
      const currentBufferSize = currentBuffer.length;
      const scenariosNeeded = targetCount - currentBufferSize;
      
      console.log(`🔍 Buffer check: Current=${currentBufferSize}, Target=${targetCount}, Need=${scenariosNeeded}`);
      
      if (scenariosNeeded <= 0) {
        console.log(`✅ Buffer is full (${currentBufferSize}/${targetCount}), no loading needed`);
        return currentBuffer;
      }

      // Start loading scenarios
      setBackgroundLoading(true);
      
      console.log(`🔄 Loading ${scenariosNeeded} scenarios for buffer...`);
      
      // Load scenarios in parallel for faster loading
      const promises = Array(scenariosNeeded).fill().map(() => loadSingleScenario(biasId));
      Promise.all(promises).then(newScenarios => {
        // Filter out any failed loads
        const validScenarios = newScenarios.filter(scenario => scenario !== null);
        
        setScenarioBuffer(prev => {
          const updated = [...prev, ...validScenarios];
          console.log(`✅ Scenario buffer updated: ${updated.length} scenarios ready`);
          setBackgroundLoading(false);
          return updated;
        });
      }).catch(error => {
        console.error('Error loading scenarios:', error);
        setBackgroundLoading(false);
      });

      return currentBuffer;
    });
  };

  // Function to get next scenario from buffer
  const getNextScenario = () => {
    if (scenarioBuffer.length === 0) {
      console.warn('⚠️ Scenario buffer is empty!');
      return null;
    }

    const nextScenario = scenarioBuffer[0];
    
    setScenarioBuffer(prev => {
      const updated = prev.slice(1);
      console.log(`📤 Scenario taken from buffer. Remaining: ${updated.length}`);
      
      // Trigger buffer refill if we're getting low (only 1 scenario left)
      if (updated.length <= 1) {
        setTimeout(() => {
          console.log(`🔄 Buffer running low (${updated.length} left), triggering refill`);
          fillScenarioBuffer(selectedBias.id, 3);
        }, 100);
      }
      
      return updated;
    });

    return nextScenario;
  };

  // Initialize game with pre-loaded scenarios
  const initializeGame = async () => {
    setLoading(true);
    setCurrentScenario(null);
    setUserResponse('');
    setFeedback(null);
    setScenarioBuffer([]);
    setGameStarted(true);
    
    console.log('🎮 Initializing game with pre-loaded scenarios...');
    
    // Load initial scenarios
    await fillScenarioBuffer(selectedBias.id, 3);
    
    // Set the first scenario
    const firstScenario = getNextScenario();
    if (firstScenario) {
      setCurrentScenario(firstScenario);
    }
    
    setLoading(false);
  };

  const handleBiasChange = (biasId) => {
    const bias = BIASES.find(b => b.id === biasId);
    setSelectedBias(bias);
    
    // Clear current game state when changing bias
    setCurrentScenario(null);
    setScenarioBuffer([]);
    setUserResponse('');
    setFeedback(null);
    
    // Don't auto-initialize when bias changes, let user click "Start Playing"
  };

  const handleNextScenario = () => {
    setUserResponse('');
    setFeedback(null);
    
    const nextScenario = getNextScenario();
    if (nextScenario) {
      setCurrentScenario(nextScenario);
    } else {
      // Fallback: load immediately if buffer is empty
      fetchNewScenarioImmediate();
    }
  };

  // Fallback function for immediate loading
  const fetchNewScenarioImmediate = async () => {
    setLoading(true);
    try {
      const newScenario = await generateScenario(selectedBias.id);
      setCurrentScenario(newScenario);
    } catch (error) {
      console.error('Error fetching scenario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitResponse = async () => {
    if (!userResponse.trim() || loading) return;
    
    setLoading(true);

    try {
      const result = await evaluateAnswer(
        selectedBias.id,
        currentScenario.scenario,
        userResponse.trim()
      );
      
      setFeedback(result.feedback);
      setScore(prev => prev + result.score);
      
      // Trigger background loading to keep buffer full
      setTimeout(() => {
        if (scenarioBuffer.length < 3) {
          fillScenarioBuffer(selectedBias.id, 3);
        }
      }, 500);
      
    } catch (error) {
      console.error('Error evaluating answer:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize on component mount
  useEffect(() => {
    // Don't auto-initialize, wait for user to start
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {!gameStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col justify-center"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  🎮
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent mb-4">
                  Bias Buster Challenge
                </h1>
                <p className="text-lg text-gray-600 mb-2">Score: {score} points</p>
                <p className="text-base text-gray-500 mb-8">Choose a bias to practice and start your adventure! 🚀</p>
              </div>

              <div className="mb-8">
                <label className="block text-lg font-semibold text-gray-700 mb-4 text-center">
                  Choose a Bias to Practice:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {BIASES.map((bias) => (
                    <motion.button
                      key={bias.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBiasChange(bias.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedBias.id === bias.id
                          ? 'bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 border-brand-blue shadow-lg'
                          : 'bg-white/70 border-gray-200 hover:border-brand-blue/50 hover:bg-white/90'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{bias.emoji}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">{bias.name}</h3>
                          <p className="text-sm text-gray-600 leading-snug">{bias.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={initializeGame}
                  disabled={!selectedBias || isPreloading}
                  className="px-8 py-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold text-lg rounded-3xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-brand-purple/25 transition-all duration-300"
                >
                  {isPreloading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Loading scenarios...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      🚀 Start Playing
                      <span>→</span>
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent mb-2">
                  {selectedBias.name} Challenge
                </h1>
                <p className="text-lg text-gray-600">Score: {score} points</p>
                
                {/* Buffer Status */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">Buffer:</span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < scenarioBuffer.length ? 'bg-green-400' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Scenario Card */}
              <AnimatePresence mode="wait">
                {(currentScenario || loading) && (
                  <motion.div
                    key={currentScenario?.scenario || 'loading'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/50"
                  >
                    {loading ? (
                      <div className="text-center py-12">
                        <div className="w-12 h-12 border-3 border-brand-blue/30 border-t-brand-blue rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500">Generating new scenario...</p>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-3xl">{selectedBias.emoji}</span>
                          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Scenario</h2>
                        </div>
                        
                        <div className="mb-6">
                          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                            {currentScenario?.scenario}
                          </p>
                          
                          <div className="bg-brand-blue/5 rounded-2xl p-4 border-l-4 border-brand-blue">
                            <p className="font-semibold text-gray-800 mb-2">Question:</p>
                            <p className="text-gray-700 leading-relaxed">{currentScenario?.question}</p>
                          </div>
                        </div>

                        {!feedback && (
                          <div className="space-y-4">
                            <textarea
                              value={userResponse}
                              onChange={(e) => setUserResponse(e.target.value)}
                              placeholder="Share your thoughts and reasoning here... 🤔"
                              className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 outline-none resize-none text-gray-700 placeholder-gray-400"
                            />
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleSubmitResponse}
                              disabled={!userResponse.trim() || loading}
                              className="w-full py-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all duration-300"
                            >
                              {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                  Analyzing your response...
                                </span>
                              ) : (
                                <span className="flex items-center justify-center gap-2">
                                  ✨ Submit Response
                                </span>
                              )}
                            </motion.button>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feedback Card */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-6 md:p-8 shadow-xl border border-green-200"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">🤖</span>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">AI Feedback</h3>
                      <div className="ml-auto bg-gradient-to-r from-brand-blue to-brand-purple text-white px-4 py-1 rounded-full text-sm font-bold">
                        +{feedback.score} points
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Your Response Analysis:</h4>
                        <p className="text-gray-700 leading-relaxed">{feedback.explanation}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Better Approach:</h4>
                        <p className="text-gray-700 leading-relaxed">{feedback.improvement}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleNextScenario}
                        className="flex-1 py-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          🎯 Next Challenge
                          <span>→</span>
                        </span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setGameStarted(false);
                          setCurrentScenario(null);
                          setFeedback(null);
                          setUserResponse('');
                          setScenarioBuffer([]);
                        }}
                        className="px-6 py-3 bg-white text-brand-purple font-bold rounded-2xl border-2 border-brand-purple/20 hover:border-brand-purple hover:bg-soft-purple transition-all duration-300"
                      >
                        🏠 Menu
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 