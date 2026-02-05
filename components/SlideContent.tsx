
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { SlideData } from '../types';

interface SlideContentProps {
  slide: SlideData;
  onWatchTrailer: () => void;
  onInitialize: () => void;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide, onWatchTrailer, onInitialize }) => {
  return (
    <div className="relative z-30 w-full px-6 md:px-12 lg:px-24 flex flex-col items-center md:items-end text-center md:text-right select-none">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-4 mb-4"
      >
        <div className="hidden md:block w-8 h-[2px] bg-[#ccff00]" />
        <span className="text-[#ccff00] font-black tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs uppercase italic">
          {slide.subtitle}
        </span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black leading-[0.9] max-w-5xl tracking-tighter uppercase"
      >
        {slide.title}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 md:mt-8 text-gray-400 text-sm md:text-lg max-w-lg md:ml-auto leading-relaxed md:border-r-2 md:border-[#ccff00]/30 md:pr-8"
      >
        {slide.description}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 md:mt-12 flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12"
      >
        <div 
          onClick={onWatchTrailer}
          className="flex items-center space-x-4 cursor-pointer group"
        >
          <div className="text-center md:text-right">
            <div className="text-[8px] md:text-[10px] text-gray-500 font-bold tracking-widest uppercase">INTEL FEED</div>
            <div className="text-xs md:text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors">WATCH TRAILER</div>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ccff00] group-hover:bg-[#ccff00] transition-all duration-300">
            <Play className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:text-black fill-current" />
          </div>
        </div>

        <button 
          onClick={onInitialize}
          className="relative px-8 md:px-12 py-4 md:py-5 bg-[#ccff00] text-black font-black text-xs md:text-sm tracking-widest uppercase overflow-hidden group shadow-[0_10px_30px_rgba(204,255,0,0.2)]"
        >
          <div className="absolute inset-0 bg-white/40 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          <span className="relative z-10">INITIALIZE</span>
          <div className="absolute top-0 right-0 w-3 h-3 bg-black" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        </button>
      </motion.div>
    </div>
  );
};

export default SlideContent;
