import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InstructionModal from '../components/InstructionModal';

const story = [
  {
    text: "You're a space explorer! Your computer says: 'Red planets have life.' You land on a red planet and see some plants...",
  },
  {
    text: "Next, you find a blue planet with strange footprints, but no plants. What do you do?",
  },
];

export default function ConfirmationBiasGame() {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [choice, setChoice] = useState(null);
  const navigate = useNavigate();

  const handleChoice = (selected) => {
    setChoice(selected);
    setShowModal(true);
  };

  const handleFinish = () => {
    navigate('/gameresult', {
      state: {
        biasId: 'confirmation',
        summary:
          choice === 'confirm'
            ? "You looked for clues that matched what you already believed!"
            : "You searched for clues that could prove your computer wrong. That's super thinking!",
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 text-center">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-xl font-semibold mb-4">{story[step].text}</div>
        {step === 0 && (
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => setStep(1)}
          >
            Next
          </button>
        )}
        {step === 1 && (
          <div className="flex flex-col gap-4 items-center">
            <button
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition w-full max-w-xs"
              onClick={() => handleChoice('confirm')}
            >
              Only look for red planets with plants
            </button>
            <button
              className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition w-full max-w-xs"
              onClick={() => handleChoice('disconfirm')}
            >
              Check all planets for any signs of life
            </button>
          </div>
        )}
      </motion.div>
      <InstructionModal open={showModal} onClose={handleFinish}>
        <div className="text-lg font-bold mb-2">What just happened?</div>
        {choice === 'confirm' ? (
          <div>
            <p className="mb-2">You followed your first clue and ignored other evidence. That's called <span className="font-semibold text-blue-700">Confirmation Bias</span>!</p>
            <p className="text-blue-700 font-semibold">Tip: Ask for disconfirming evidence!</p>
          </div>
        ) : (
          <div>
            <p className="mb-2">You looked for clues that could prove your computer wrong. That's how to bust <span className="font-semibold text-blue-700">Confirmation Bias</span>!</p>
            <p className="text-blue-700 font-semibold">Tip: Ask for disconfirming evidence!</p>
          </div>
        )}
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleFinish}
        >
          Finish
        </button>
      </InstructionModal>
    </div>
  );
} 