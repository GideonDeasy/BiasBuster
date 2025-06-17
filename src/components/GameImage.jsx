import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GameImage({ 
  src, 
  alt, 
  className = "", 
  animate = true,
  prompt = null, // Midjourney prompt for reference
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
          <p className="text-red-500">Failed to load image</p>
        </div>
      )}

      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg ${error ? 'hidden' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        initial={animate ? "hidden" : false}
        animate={animate ? "visible" : false}
        variants={imageVariants}
      />
      
      {/* Hidden dev tool for prompt reference */}
      {prompt && process.env.NODE_ENV === 'development' && (
        <div className="hidden">
          <p>Prompt: {prompt}</p>
        </div>
      )}
    </div>
  );
} 