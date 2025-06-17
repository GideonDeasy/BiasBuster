import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GameImage from '../components/GameImage';
import InstructionModal from '../components/InstructionModal';
import { imagePrompts } from '../utils/imagePrompts';

const STAGES = {
  INTRO: 'intro',
  GAME: 'game',
  SUCCESS: 'success'
};

export default function DunningKrugerGame() {
  const [stage, setStage] = useState(STAGES.INTRO);
  const [showModal, setShowModal] = useState(false);
  const [choice, setChoice] = useState(null);
  const navigate = useNavigate();

  const handleChoice = (selected) => {
    setChoice(selected);
    setShowModal(true);
  };

  const handleNextStage = () => {
    if (stage === STAGES.INTRO) {
      setStage(STAGES.GAME);
    } else if (stage === STAGES.GAME) {
      setStage(STAGES.SUCCESS);
    }
  };

  const handleFinish = () => {
    navigate('/gameresult', {
      state: {
        biasId: 'dunningKruger',
        summary: choice === 'humble' 
          ? "You recognized that learning takes time and practice!"
          : "Remember, even experts started as beginners. It's okay to take time to learn!",
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">The Learning Journey</h2>
        
        {/* Stage-specific content */}
        {stage === STAGES.INTRO && (
          <div className="space-y-6">
            <GameImage
              src="/placeholder-intro.png" // You'll replace with actual Midjourney generated image
              alt="Child confidently teaching wrong math"
              className="w-full h-64 mb-4"
              prompt={imagePrompts.dunningKruger.intro}
            />
            <p className="text-lg text-gray-700">
              Meet Alex! They think they've mastered math after learning addition.
              Now they're trying to teach others... but might be missing some important details!
            </p>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              onClick={handleNextStage}
            >
              Continue
            </button>
          </div>
        )}

        {stage === STAGES.GAME && (
          <div className="space-y-6">
            <GameImage
              src="/placeholder-game.png"
              alt="Learning journey mountain"
              className="w-full h-64 mb-4"
              prompt={imagePrompts.dunningKruger.game}
            />
            <p className="text-lg text-gray-700 mb-4">
              Alex is teaching that 2 + 2 = 4, so multiplication must be just adding twice:
              2 × 3 = 2 + 2 + 2 = 6. What would you do?
            </p>
            <div className="flex flex-col gap-4 items-center">
              <button
                className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition w-full max-w-xs"
                onClick={() => handleChoice('confident')}
              >
                Say "That's exactly right!"
              </button>
              <button
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition w-full max-w-xs"
                onClick={() => handleChoice('humble')}
              >
                Suggest exploring multiplication more
              </button>
            </div>
          </div>
        )}

        {stage === STAGES.SUCCESS && (
          <div className="space-y-6">
            <GameImage
              src="/placeholder-success.png"
              alt="Child realizing complexity"
              className="w-full h-64 mb-4"
              prompt={imagePrompts.dunningKruger.success}
            />
            <p className="text-lg text-gray-700">
              Great job! Understanding that learning takes time is a superpower.
              Even experts were beginners once!
            </p>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
              onClick={handleFinish}
            >
              Complete Game
            </button>
          </div>
        )}
      </motion.div>

      <InstructionModal open={showModal} onClose={handleFinish}>
        <div className="text-lg font-bold mb-4">What just happened?</div>
        {choice === 'humble' ? (
          <div>
            <p className="mb-4">
              Fantastic! You recognized that learning is a journey. 
              Sometimes people think they know everything after learning just a little bit.
              That's called the <span className="font-semibold text-blue-700">Dunning-Kruger Effect</span>!
            </p>
            <p className="text-blue-700 font-semibold">
              Tip: Remember that learning takes time, and it's okay to not know everything right away!
            </p>
          </div>
        ) : (
          <div>
            <p className="mb-4">
              Sometimes we feel very confident when we only know a little bit.
              That's called the <span className="font-semibold text-blue-700">Dunning-Kruger Effect</span>!
              As we learn more, we realize there's always more to discover.
            </p>
            <p className="text-blue-700 font-semibold">
              Tip: Stay curious and open to learning more!
            </p>
          </div>
        )}
      </InstructionModal>
    </div>
  );
} 