import { useNavigate } from 'react-router-dom';
import { biases } from '../utils/biasData';
import GameCard from '../components/GameCard';

export default function GameHub() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Choose a Game</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {biases.map((bias) => (
          <GameCard
            key={bias.id}
            name={bias.name}
            description={bias.description}
            onPlay={() => navigate(`/games/${bias.id}`)}
          />
        ))}
      </div>
    </div>
  );
} 