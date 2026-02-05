
import React from 'react';
import { motion } from 'framer-motion';

const BlogHero: React.FC = () => {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale brightness-[0.4]"
          alt="Gaming Blog"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-4 mb-6"
        >
          <div className="w-12 h-[1px] bg-[#ccff00]" />
          <span className="text-[#ccff00] text-xs font-black tracking-[0.5em] uppercase">Tech & Tactics</span>
          <div className="w-12 h-[1px] bg-[#ccff00]" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none"
        >
          NEWS FEED
        </motion.h1>
      </div>
    </section>
  );
};

export default BlogHero;
