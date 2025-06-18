import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Main Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="mb-12">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue bg-clip-text text-transparent mb-8 leading-tight">
                Welcome to<br />Bias Buster
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-medium max-w-4xl mx-auto leading-relaxed">
                Join us on an exciting journey to become a master of clear thinking. 
                Learn about cognitive biases through fun, interactive adventures.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/play"
                  className="group relative px-12 py-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold text-xl rounded-3xl shadow-2xl shadow-brand-blue/25 hover:shadow-brand-purple/25 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Playing
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="group px-12 py-4 bg-white/80 backdrop-blur-sm text-brand-purple font-bold text-xl rounded-3xl border-2 border-brand-purple/20 hover:border-brand-purple hover:bg-soft-purple transition-all duration-300 shadow-lg"
                >
                  <span className="flex items-center gap-3">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </motion.div>
            </div>

            <p className="text-lg text-gray-500 font-medium">
              Perfect for ages 8-12 and curious minds of all ages
            </p>
          </motion.div>

          {/* Explanation Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-brand-blue to-brand-purple rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-white rounded-xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-brand-blue mb-4 group-hover:text-brand-purple transition-colors duration-300">
                What are Cognitive Biases?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                They're like shortcuts our brain takes when making decisions. 
                Sometimes these shortcuts can lead us to make mistakes. Think of them as 
                brain patterns that everyone experiences.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="group bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-white rounded-xl"></div>
              </div>
              <h3 className="text-2xl font-bold text-brand-purple mb-4 group-hover:text-brand-blue transition-colors duration-300">
                Why Learn About Them?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Understanding biases helps us make better choices and become 
                smarter problem solvers. You'll become a critical thinking expert.
              </p>
            </motion.div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center"
          >
            <div className="flex flex-wrap justify-center gap-8 text-gray-500 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-brand-blue rounded-full"></div>
                <span>4+ Different Bias Types</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
                <span>AI-Powered Scenarios</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                <span>Personalized Feedback</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 