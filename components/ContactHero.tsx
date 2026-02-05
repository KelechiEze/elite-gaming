
import React from 'react';
import { motion } from 'framer-motion';

const ContactHero: React.FC = () => {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale brightness-[0.3]"
          alt="Contact Center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-4 mb-6"
        >
          <div className="w-12 h-[1px] bg-[#ccff00]" />
          <span className="text-[#ccff00] text-xs font-black tracking-[0.5em] uppercase">Establish Link</span>
          <div className="w-12 h-[1px] bg-[#ccff00]" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none"
        >
          CONTACT US
        </motion.h1>
      </div>
    </section>
  );
};

export default ContactHero;
