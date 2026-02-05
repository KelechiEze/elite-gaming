
import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

interface InstagramSectionProps {
  onNotify: (msg: string) => void;
}

const InstagramSection: React.FC<InstagramSectionProps> = ({ onNotify }) => {
  const images = [
    'https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop'
  ];

  const handleOpenInsta = () => {
    onNotify('OPENING NEURAL_GRAM FEED...');
    setTimeout(() => {
      window.open('https://instagram.com', '_blank');
    }, 1000);
  };

  return (
    <section className="bg-black py-20 md:py-32 relative overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-16 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-0">
        <button 
          onClick={handleOpenInsta}
          className="relative bg-[#ccff00] text-black px-10 py-4 text-[10px] md:text-xs font-black tracking-widest flex items-center space-x-3 group"
        >
          <span>APEXX /</span>
          <Instagram className="w-4 h-4 md:w-5 md:h-5" />
          <div className="absolute top-1 left-1 w-1 h-1 bg-black" />
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-black" />
        </button>

        <div className="text-center md:text-right">
          <div className="flex items-center justify-center md:justify-end space-x-2 mb-4">
             <div className="w-2 h-2 bg-[#ccff00]" />
             <div className="w-6 h-[2px] bg-[#ccff00]" />
             <span className="text-[#ccff00] text-[10px] md:text-xs font-black tracking-widest uppercase">VIEW OUR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
            MARGATSNI NO YROTS
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full gap-0 overflow-hidden">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className="aspect-square relative group overflow-hidden cursor-pointer"
            onClick={handleOpenInsta}
          >
            <img 
              src={img} 
              alt="Story" 
              className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-[#ccff00]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;
