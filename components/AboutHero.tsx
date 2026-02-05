
import React from 'react';
import { motion } from 'framer-motion';

const AboutHero: React.FC = () => {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale brightness-50"
          alt="About Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-4 mb-6"
        >
          <div className="w-12 h-[1px] bg-[#ccff00]" />
          <span className="text-[#ccff00] text-xs font-black tracking-[0.5em] uppercase">The Genesis</span>
          <div className="w-12 h-[1px] bg-[#ccff00]" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none"
        >
          OUR STORY
        </motion.h1>
        
        <div className="mt-8 flex items-center justify-center space-x-6">
           <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">ESTABLISHED 2020</span>
           <div className="w-2 h-2 bg-[#ccff00] rotate-45" />
           <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">ELITE GAMING HUB</span>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
