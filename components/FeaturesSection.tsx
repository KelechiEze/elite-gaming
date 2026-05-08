import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Box, BoxSelect, Glasses } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      icon: <MapPin className="w-12 h-12 text-[#ccff00]" />,
      title: "LOCATION TAGGING",
      desc: "Real-time player positioning and territory control with precision GPS tracking for competitive advantage."
    },
    {
      id: 2,
      icon: <Box className="w-12 h-12 text-[#ccff00]" />,
      title: "CONSOLE SYSTEM",
      desc: "Cross-platform compatibility across PlayStation, Xbox, and Nintendo with unified leaderboards."
    },
    {
      id: 3,
      icon: <BoxSelect className="w-12 h-12 text-[#ccff00]" />,
      title: "MULTI DIMENSION",
      desc: "Explore parallel universes and alternate realities with seamless dimensional hopping technology."
    },
    {
      id: 4,
      icon: <Glasses className="w-12 h-12 text-[#ccff00]" />,
      title: "VR SUPPORTED",
      desc: "Full immersive virtual reality integration with haptic feedback and 360° motion tracking."
    }
  ]);

  const [swappingIndices, setSwappingIndices] = useState<[number, number] | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Get two random different indices to swap
      let index1 = Math.floor(Math.random() * features.length);
      let index2 = Math.floor(Math.random() * features.length);
      
      while (index1 === index2) {
        index2 = Math.floor(Math.random() * features.length);
      }
      
      setSwappingIndices([index1, index2]);
      
      // Slower swap animation - increased delays
      setTimeout(() => {
        setFeatures((prevFeatures) => {
          const newFeatures = [...prevFeatures];
          [newFeatures[index1], newFeatures[index2]] = [newFeatures[index2], newFeatures[index1]];
          return newFeatures;
        });
        
        setTimeout(() => {
          setSwappingIndices(null);
        }, 200); // Increased from 100ms to 200ms
      }, 300); // Increased from 150ms to 300ms
    }, 5000); // Changed from 2000ms to 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="bg-black py-16 md:py-20 border-t border-b border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        <AnimatePresence mode="popLayout">
          {features.map((feature, idx) => (
            <motion.div 
              key={feature.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: swappingIndices?.includes(idx) ? 0.95 : 1,
                rotateX: swappingIndices?.includes(idx) ? 15 : 0,
              }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ 
                duration: 0.6, // Slower entrance
                type: "spring",
                stiffness: 300, // Reduced for smoother movement
                damping: 35,
                layout: { 
                  duration: 0.9, // Slower layout transition
                  type: "spring", 
                  stiffness: 180, // Reduced for slower swapping
                  damping: 30,
                  mass: 1.2 // Increased mass for slower, heavier movement
                }
              }}
              className={`relative flex flex-col items-center text-center p-8 md:p-16 space-y-6 md:space-y-8 transition-all duration-500 hover:bg-white/[0.02]
                ${idx !== features.length - 1 ? 'lg:border-r border-white/10' : ''}
                ${idx < 2 ? 'border-b lg:border-b-0' : ''}
                group
              `}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Glow effect on swap */}
              {swappingIndices?.includes(idx) && (
                <motion.div 
                  className="absolute inset-0 bg-[#ccff00]/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }} // Slower glow
                />
              )}
              
              <motion.div 
                className="transition-transform duration-500 group-hover:scale-110"
                whileHover={{ 
                  rotate: [0, -10, 10, -5, 5, 0],
                  transition: { duration: 0.6 }
                }}
                animate={swappingIndices?.includes(idx) ? {
                  scale: [1, 1.15, 1],
                  rotate: [0, 180, 360],
                } : {}}
                transition={{ duration: 0.5 }} // Slower icon animation
              >
                {feature.icon}
              </motion.div>
              
              <motion.h3 
                className="text-xl font-black tracking-widest text-white group-hover:text-[#ccff00] transition-colors duration-300"
                layout="position"
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-400 text-sm leading-relaxed max-w-[260px]" // Changed text color for better readability
                layout="position"
              >
                {feature.desc}
              </motion.p>
              
              {/* Animated border effect on hover */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Corner accents */}
              <motion.div 
                className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ccff00]/0 group-hover:border-[#ccff00]/50 transition-all duration-300"
                whileHover={{ scale: 1.5 }}
              />
              <motion.div 
                className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#ccff00]/0 group-hover:border-[#ccff00]/50 transition-all duration-300"
                whileHover={{ scale: 1.5 }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#ccff00]/0 group-hover:border-[#ccff00]/50 transition-all duration-300"
                whileHover={{ scale: 1.5 }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ccff00]/0 group-hover:border-[#ccff00]/50 transition-all duration-300"
                whileHover={{ scale: 1.5 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturesSection;