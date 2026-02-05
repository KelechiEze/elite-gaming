
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        // Varied increments for a "loading data" feel
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Noise & CRT Effects */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent bg-[length:100%_4px] animate-scanline pointer-events-none" />

      {/* Main Glitch Text Container */}
      <div className="relative group">
        {/* Shadow/Glow layers for Glitch effect */}
        <div className="absolute top-0 left-0 w-full text-center text-7xl md:text-9xl font-black tracking-tighter text-[#ccff00] opacity-30 blur-sm animate-glitch-1 select-none">
          ..LOADING
        </div>
        <div className="absolute top-0 left-0 w-full text-center text-7xl md:text-9xl font-black tracking-tighter text-cyan-400 opacity-30 blur-sm animate-glitch-2 select-none">
          ..LOADING
        </div>

        {/* Primary Text */}
        <h1 className="relative text-7xl md:text-9xl font-black tracking-tighter text-white select-none">
          <span className="inline-block animate-glitch-main">..LOADING</span>
        </h1>
      </div>

      {/* Progress Bar Container */}
      <div className="mt-12 w-64 h-1 bg-white/5 relative overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: `${progress - 100}%` }}
          className="absolute inset-0 bg-[#ccff00]"
        />
        {/* Flickering glow under the bar */}
        <div 
          className="absolute inset-0 bg-[#ccff00] blur-md opacity-30 animate-pulse" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Numerical Progress */}
      <div className="mt-4 font-black text-[#ccff00] text-sm tracking-[0.5em] opacity-80">
        {progress}% <span className="animate-pulse">_</span>
      </div>

      {/* Decorative Corner Borders */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-[#ccff00]/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-[#ccff00]/30" />
      
      {/* Subtle bottom-left tech text */}
      <div className="absolute bottom-10 left-10 flex flex-col space-y-1">
        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">System Status: Online</div>
        <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Core Frequency: 5.2GHz</div>
        <div className="text-[10px] text-[#ccff00] font-bold uppercase tracking-widest animate-pulse">Establishing Connection...</div>
      </div>
    </motion.div>
  );
};

export default Loader;
