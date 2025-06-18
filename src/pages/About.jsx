import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-5xl md:text-6xl mb-4"
            >
              🧠✨
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue bg-clip-text text-transparent mb-4">
              About Bias Buster
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              🎯 Your fun journey to become a master of clear thinking starts here!
            </p>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            🚀 How Bias Buster Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                step: "1",
                emoji: "🎯",
                title: "Choose Your Challenge",
                description: "Pick a cognitive bias you want to learn about and practice with."
              },
              {
                step: "2",
                emoji: "🤖",
                title: "AI Creates Scenarios",
                description: "Our smart AI generates personalized scenarios just for you to practice with!"
              },
              {
                step: "3",
                emoji: "🧠",
                title: "Think & Learn",
                description: "Share your thoughts and get personalized feedback to improve your thinking skills!"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <div className="text-3xl mb-4">{item.emoji}</div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 group-hover:text-brand-purple transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bias Types Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            🎭 Meet the Biases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Confirmation Bias",
                emoji: "🔍",
                color: "from-blue-400 to-blue-600",
                description: "Only looking for information that supports what you already believe, like only reading news that agrees with you."
              },
              {
                name: "Availability Bias",
                emoji: "🧠",
                color: "from-purple-400 to-purple-600",
                description: "Making decisions based on the most recent or memorable information, like thinking sharks are super dangerous after watching a movie about them."
              },
              {
                name: "Anchoring Bias",
                emoji: "⚓",
                color: "from-orange-400 to-orange-600",
                description: "Being too influenced by the first piece of information you hear, like thinking a shirt is cheap because you saw the high original price first."
              },
              {
                name: "Dunning-Kruger Effect",
                emoji: "🤷",
                color: "from-green-400 to-green-600",
                description: "Feeling overconfident when you know just a little about something, like thinking you're a cooking expert after one successful recipe."
              }
            ].map((bias, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="group bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${bias.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {bias.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-purple transition-colors duration-300">
                      {bias.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {bias.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-soft-blue via-soft-purple to-soft-orange rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-6">🎯</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6">
                We believe that learning about cognitive biases should be <strong>fun, engaging, and safe</strong>. 
                Our AI-powered platform creates personalized scenarios that help kids and teens develop 
                critical thinking skills while having a blast! 🚀
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/50 rounded-2xl p-4">
                  <div className="text-2xl mb-2">🛡️</div>
                  <h4 className="font-bold text-gray-800 mb-2">Safe & Educational</h4>
                  <p className="text-gray-600 text-sm">Age-appropriate content designed by educators</p>
                </div>
                <div className="bg-white/50 rounded-2xl p-4">
                  <div className="text-2xl mb-2">🤖</div>
                  <h4 className="font-bold text-gray-800 mb-2">AI-Powered Learning</h4>
                  <p className="text-gray-600 text-sm">Personalized feedback and adaptive scenarios</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Ready to Become a Bias Buster?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of young critical thinkers who are already mastering the art of clear thinking!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/play"
                  className="group px-8 py-3 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-brand-purple/25 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    🚀 Start Your Journey
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="group px-8 py-3 bg-white text-brand-purple font-bold text-lg rounded-3xl border-2 border-brand-purple/20 hover:border-brand-purple hover:bg-soft-purple transition-all duration-300 shadow-lg"
                >
                  <span className="flex items-center gap-2">
                    🏠 Back to Home
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
} 