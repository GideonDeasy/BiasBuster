import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar({ showDevTools = false }) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/play', label: 'Play' },
    { path: '/about', label: 'About' },
  ];

  if (showDevTools) {
    navItems.push({ path: '/dev/prompts', label: 'Dev Tools' });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl flex items-center justify-center"
            >
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent group-hover:from-brand-purple group-hover:to-brand-blue transition-all duration-300">
                Bias Buster
              </h1>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-lg'
                      : 'text-gray-600 hover:text-brand-purple hover:bg-soft-purple'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 