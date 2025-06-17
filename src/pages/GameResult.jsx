import { useLocation, useNavigate } from 'react-router-dom';
import { biases } from '../utils/biasData';

export default function GameResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { biasId, summary } = location.state || {};
  const bias = biases.find((b) => b.id === biasId) || {};

  return (
    <div className="max-w-xl mx-auto py-10 px-4 text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">You Busted: {bias.name || 'a Bias'}!</h2>
      <div className="mb-4 text-lg text-gray-700">{summary || 'Great job playing the game!'}</div>
      <div className="bg-blue-100 rounded-lg p-4 text-blue-800 font-semibold mb-6">
        <span className="block mb-1">Bias-Busting Tip:</span>
        {bias.tip || 'Keep thinking critically!'}
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => navigate('/gamehub')}
      >
        Back to Games
      </button>
    </div>
  );
} 