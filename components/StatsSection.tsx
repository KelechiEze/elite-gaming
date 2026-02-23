
import React from 'react';
import { motion } from 'framer-motion';

const StatsSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-32 px-4 md:px-12 lg:px-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Text and Grid */}
        <div className="flex-1 space-y-12 w-full">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-[2px] bg-[#ccff00]" />
              <span className="text-[#ccff00] text-[10px] md:text-xs font-black tracking-widest">JOIN THE ADVENTURE</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tighter uppercase">
              WELCOME TO ULTIMATE<br />GAMING DESTINATION
            </h2>
            <p className="text-gray-500 max-w-lg leading-relaxed text-xs md:text-sm">
              Risus pretium quam vulputate dignissim suspendisse in est ante in. 
              Nullam non nisi est sit amet facilisis magna hac habitasse.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border border-white/10">
            <div className="p-8 md:p-10 border-b sm:border-r border-white/10 flex flex-col items-center justify-center text-center group transition-colors hover:bg-white/5">
              <span className="text-4xl md:text-5xl font-black text-white mb-2">+850</span>
              <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Worldwide Clients</span>
            </div>
            <div className="p-8 md:p-10 border-b border-white/10 flex flex-col items-center justify-center text-center group transition-colors hover:bg-white/5">
              <span className="text-4xl md:text-5xl font-black text-white mb-2">K30</span>
              <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Licensed Games</span>
            </div>
            <div className="p-8 md:p-10 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-col items-center justify-center text-center group transition-colors hover:bg-white/5">
              <span className="text-4xl md:text-5xl font-black text-white mb-2">10/9</span>
              <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Star Ratings-5</span>
            </div>
            <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center group transition-colors hover:bg-white/5">
              <span className="text-4xl md:text-5xl font-black text-white mb-2">M5</span>
              <span className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest">Active Users</span>
            </div>
          </div>
        </div>

        {/* Right Side: Image and 2024 BG */}
        <div className="flex-1 relative w-full">
          <div className="relative z-10 w-full">
            {/* Background Big Text - Scaled for mobile */}
            <div className="absolute -top-12 md:-top-24 right-0 md:-right-8 select-none pointer-events-none opacity-20">
              <span className="text-[8px] md:text-[10px] font-black text-white tracking-[0.5em] block mb-2 text-right">LEADING GAMING HUB</span>
              <span className="text-8xl sm:text-[120px] md:text-[200px] font-black text-white leading-none tracking-tighter block opacity-40">2024</span>
            </div>
            
            {/* Character Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video sm:aspect-[4/3] w-full bg-black overflow-hidden border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                alt="Gaming Character"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 border-l-2 border-[#ccff00] pl-3 py-1">
                <span className="text-[8px] md:text-[10px] font-black text-[#ccff00] tracking-widest uppercase">CORE ENGINE v4.2</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;
