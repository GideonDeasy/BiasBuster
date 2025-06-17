export default function GameCard({ name, description, onPlay }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-2 border border-blue-100">
      <h3 className="text-lg font-bold text-blue-700">{name}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={onPlay}
      >
        Play
      </button>
    </div>
  );
} 