
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpLeft, ArrowUpRight, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale-[0.5]"
          alt="War Background"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-12 lg:px-24 flex flex-col items-center text-center">
        {/* Top Label */}
        <div className="flex items-center space-x-2 mb-12">
          <div className="w-2 h-2 bg-[#ccff00]" />
          <div className="w-6 h-[2px] bg-[#ccff00]" />
          <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Our Testimonials</span>
        </div>

        {/* Quote Content Row */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Main Quote Text */}
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-3xl md:text-5xl font-black italic uppercase leading-tight tracking-tighter text-white max-w-4xl"
          >
            ORCI A SCELERISQUE PURUS SEMPER EGET DUIS AT. SIT AMET JUSTO DONEC ENIM DIAM VULPUTATE UT PHARETRA SIT.
          </motion.h2>

          {/* Massive Quote Icon */}
          <div className="flex-shrink-0">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#ccff00]">
               <path d="M40 30H10V60H30C30 70 20 80 10 80V90C30 90 40 70 40 60V30ZM90 30H60V60H80C80 70 70 80 60 80V90C80 90 90 70 90 60V30Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* User Info & Nav Buttons */}
        <div className="w-full mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          {/* Nav Buttons */}
          <div className="flex space-x-4">
            <button className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all">
              <ArrowUpLeft className="w-6 h-6" />
            </button>
            <button className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all">
              <ArrowUpRight className="w-6 h-6" />
            </button>
          </div>

          {/* User Details */}
          <div className="flex items-center space-x-6 text-right">
            <div>
              <h4 className="text-2xl font-black text-white uppercase tracking-tighter">Jin Shichiro</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dancer</p>
            </div>
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#ccff00]">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Jin Shichiro"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
