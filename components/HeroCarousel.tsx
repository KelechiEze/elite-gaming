
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { SlideData } from '../types';
import SlideContent from './SlideContent';
import SidebarUI from './SidebarUI';

const SLIDES: SlideData[] = [
  {
    id: '01',
    title: 'FUEL YOUR PASSION FOR GAMING TODAY',
    subtitle: 'NEON ASSASSIN // PROTOCOL X',
    description: 'Enter the grid with hyper-responsive hardware and zero-latency infrastructure. Experience gaming at the speed of thought.',
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop', 
    accent: '#ccff00'
  },
  {
    id: '02',
    title: 'DIVE INTO THE WORLD OF TECH GAMING',
    subtitle: 'MECHA PILOT // CORE-SIGHT',
    description: 'Our proprietary neural-link interfaces provide unprecedented precision. Dominate the digital battlefield with Elite hardware.',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop', 
    accent: '#ccff00'
  },
  {
    id: '03',
    title: 'UNLOCK ENDLESS FUN FILLED ONLINE GAMES',
    subtitle: 'VOID GUARDIAN // ETHEREAL',
    description: 'Where magic meets machine. Explore vast multiverses through our high-bandwidth global cloud mesh.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2169&auto=format&fit=crop', 
    accent: '#ccff00'
  }
];

const AUTO_PLAY_INTERVAL = 8000;

interface HeroCarouselProps {
  onWatchTrailer: () => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onWatchTrailer }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dragX = useMotionValue(0);
  
  const rotate = useTransform(dragX, [-500, 500], [-15, 15]);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + SLIDES.length) % SLIDES.length);
  }, []);

  const handleInitialize = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [paginate]);

  const currentSlide = SLIDES[index];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Preview */}
      <div className="absolute inset-0 z-0">
        <img 
          src={SLIDES[(index + 1) % SLIDES.length].imageUrl} 
          className="w-full h-full object-cover grayscale brightness-[0.2]" 
          alt="next preview" 
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <div className="relative w-full h-full max-w-[1920px] mx-auto overflow-hidden flex items-center">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            style={{ x: dragX, rotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.9}
            onDragEnd={(e, info) => {
              if (info.offset.x < -150) paginate(1);
              else if (info.offset.x > 150) paginate(-1);
            }}
            initial={{ opacity: 0, scale: 0.8, x: direction > 0 ? 300 : -300 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.2, x: direction > 0 ? -500 : 500 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <div className="absolute inset-0 pointer-events-none select-none">
              <motion.img 
                src={currentSlide.imageUrl} 
                className="w-full h-full object-cover" 
                alt={currentSlide.title} 
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
              <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="relative z-30 w-full">
              <SlideContent 
                slide={currentSlide} 
                onWatchTrailer={onWatchTrailer}
                onInitialize={handleInitialize}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <SidebarUI currentIndex={index} total={SLIDES.length} />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-50">
        <motion.div 
          key={index}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
          className="h-full bg-[#ccff00] shadow-[0_0_15px_#ccff00]"
        />
      </div>

      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-24 z-50 flex items-center space-x-4 pointer-events-none opacity-40">
        <div className="w-8 h-8 md:w-10 md:h-10 border border-white/20 rounded-full flex items-center justify-center animate-pulse">
           <div className="w-1 h-1 bg-[#ccff00] rounded-full" />
        </div>
        <span className="text-[8px] md:text-[10px] font-black text-white tracking-[0.3em] uppercase">GRAB & PULL TO EXPLORE</span>
      </div>
    </div>
  );
};

export default HeroCarousel;
