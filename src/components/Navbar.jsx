import { Link } from 'react-router-dom';

export default function Navbar({ showDevTools = false }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-700">
                🧠 Bias Buster
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/play"
              className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Play
            </Link>
            
            <Link
              to="/about"
              className="text-gray-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>

            {showDevTools && (
              <Link
                to="/dev/prompts"
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dev Tools
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 