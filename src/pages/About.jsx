import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          About Bias Buster
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Bias Buster is an educational game designed to help children ages 8-12 
              understand and overcome cognitive biases. Through fun, interactive 
              challenges, we teach critical thinking skills that will last a lifetime.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              What Are Cognitive Biases?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cognitive biases are like shortcuts our brains take when making decisions. 
              While these shortcuts can be helpful, they sometimes lead us to make 
              mistakes or jump to wrong conclusions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By learning about these biases early, children can develop better 
              decision-making skills and become more thoughtful problem solvers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              How It Works
            </h2>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li>Choose a cognitive bias to learn about</li>
                <li>Read through fun, age-appropriate scenarios</li>
                <li>Make choices and see how biases might affect your thinking</li>
                <li>Get friendly feedback and learn how to make better decisions</li>
                <li>Practice with new scenarios to master each bias</li>
              </ol>
            </div>
          </section>

          <div className="mt-12 text-center">
            <Link
              to="/play"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              Start Playing Now
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 