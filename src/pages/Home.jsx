import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6">
          Welcome to Bias Buster!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Join us on an exciting journey to become a master of clear thinking! 
          Learn about cognitive biases through fun, interactive games.
        </p>

        <div className="space-y-4">
          <Link
            to="/play"
            className="block w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 text-center"
          >
            Start Playing
          </Link>

          <Link
            to="/about"
            className="block w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition duration-200 text-center"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              What are Cognitive Biases?
            </h3>
            <p className="text-gray-600">
              They're like shortcuts our brain takes when making decisions. 
              Sometimes these shortcuts can lead us to make mistakes!
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Why Learn About Them?
            </h3>
            <p className="text-gray-600">
              Understanding biases helps us make better choices and become 
              smarter problem solvers!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 