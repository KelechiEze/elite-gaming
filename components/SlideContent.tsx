import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { SlideData } from '../types';

interface SlideContentProps {
  slide: SlideData;
  onWatchTrailer: () => void;
  onInitialize: () => void;
  onPlayGame?: () => void;
}

const SlideContent: React.FC<SlideContentProps> = ({ slide, onWatchTrailer, onInitialize, onPlayGame }) => {
  return (
    <div className="relative z-30 w-full px-4 md:px-12 lg:px-24 flex flex-col items-center md:items-end text-center md:text-right select-none">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4"
      >
        <div className="hidden md:block w-6 h-[2px] bg-[#ccff00]" />
        <span className="text-[#ccff00] font-black tracking-[0.15em] md:tracking-[0.3em] text-[9px] md:text-xs uppercase italic">
          {slide.subtitle}
        </span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black leading-[1.1] md:leading-[0.9] max-w-5xl tracking-tighter uppercase"
      >
        {slide.title}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 md:mt-6 text-gray-400 text-xs md:text-base lg:text-lg max-w-xl md:ml-auto leading-relaxed md:border-r-2 md:border-[#ccff00]/30 md:pr-8"
      >
        {slide.description}
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 md:mt-8 flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-10"
      >
        {onPlayGame && (
          <button 
            onClick={onPlayGame}
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-white text-black font-black text-[10px] md:text-sm tracking-[0.2em] uppercase overflow-hidden transition-all hover:bg-[#ccff00] hover:scale-105 active:scale-95"
          >
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-[#ccff00]/20"
            />
            <span className="relative z-10 flex items-center text-xs md:text-sm">
              PLAY NEON STRIKE <Play className="w-3 h-3 md:w-4 md:h-4 ml-2 fill-current" />
            </span>
          </button>
        )}

        <div 
          onClick={onWatchTrailer}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="text-center md:text-right">
            <div className="text-[7px] md:text-[9px] text-gray-500 font-bold tracking-widest uppercase">INTEL FEED</div>
            <div className="text-[10px] md:text-xs font-bold text-white group-hover:text-[#ccff00] transition-colors">WATCH TRAILER</div>
          </div>
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ccff00] group-hover:bg-[#ccff00] transition-all duration-300">
            <Play className="w-3 h-3 md:w-5 md:h-5 text-white group-hover:text-black fill-current" />
          </div>
        </div>

        <button 
          onClick={onInitialize}
          className="relative px-6 md:px-10 py-2.5 md:py-4 bg-[#ccff00] text-black font-black text-[10px] md:text-xs tracking-widest uppercase overflow-hidden group shadow-[0_10px_30px_rgba(204,255,0,0.2)]"
        >
          <div className="absolute inset-0 bg-white/40 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          <span className="relative z-10">INITIALIZE</span>
          <div className="absolute top-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-black" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        </button>
      </motion.div>
    </div>
  );
};

export default SlideContent;