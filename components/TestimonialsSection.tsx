import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpLeft, ArrowUpRight, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jin Shichiro",
      role: "Pro Gamer",
      quote: "The response time is unmatched. I've never experienced such fluid gameplay in competitive matches.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Game Developer",
      quote: "The neural-link interface revolutionized how we test our games. Absolute game-changer for development.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Marcus Rodriguez",
      role: "Esports Coach",
      quote: "My team's reaction times improved by 40% after switching to this platform. Simply revolutionary.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Aisha Patel",
      role: "Streamer",
      quote: "Zero latency, crystal clear graphics, and the most responsive controls I've ever used. My viewers love it.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Thiago Santos",
      role: "Tournament Winner",
      quote: "Won three consecutive championships after switching. The competitive edge is real.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Emma Watson",
      role: "VR Specialist",
      quote: "The VR integration is flawless. It feels like you're actually inside the game world.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "David Kim",
      role: "Tech Reviewer",
      quote: "Best gaming hardware I've tested in 2024. The build quality and performance are top-tier.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Lisa Thompson",
      role: "Game Designer",
      quote: "The multi-dimension feature opens up endless possibilities for game design. Truly innovative.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    },
    {
      id: 9,
      name: "Alex Mercer",
      role: "Professional Player",
      quote: "Location tagging changed how we approach team strategies. Real-time tracking is a game-changer.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 10,
      name: "Nina Kovac",
      role: "Content Creator",
      quote: "My audience engagement doubled when I started streaming with this setup. Best investment ever.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 11,
      name: "Omar Hassan",
      role: "Game Tester",
      quote: "Zero crashes, perfect optimization, and incredible support team. Can't recommend enough.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 12,
      name: "Yuki Tanaka",
      role: "Esports Athlete",
      quote: "The console system delivers consistent 240fps without any drops. Tournament-ready hardware.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const slidesCount = 3; // 12 cards / 4 cards per slide = 3 slides

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getCurrentTestimonials = () => {
    const start = currentSlide * 4;
    return testimonials.slice(start, start + 4);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
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
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-12 lg:px-24">
        {/* Top Label */}
        <div className="flex items-center justify-center space-x-2 mb-12">
          <div className="w-2 h-2 bg-[#ccff00]" />
          <div className="w-6 h-[2px] bg-[#ccff00]" />
          <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Our Testimonials</span>
        </div>

        {/* Testimonials Grid - 4 Cards Per Slide */}
        <div className="relative min-h-[500px] md:min-h-[600px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {getCurrentTestimonials().map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-[#ccff00]/50 transition-all duration-300 group hover:scale-105"
                >
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-[#ccff00] mb-4 opacity-50" />
                  
                  {/* Quote Text */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* User Info */}
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#ccff00]/30 group-hover:border-[#ccff00] transition-all">
                      <img 
                        src={testimonial.image} 
                        className="w-full h-full object-cover"
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold tracking-tight text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] text-[#ccff00] font-bold uppercase tracking-wider">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Animated border bottom */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Counter */}
        <div className="w-full mt-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          {/* Nav Buttons */}
          <div className="flex space-x-4">
            <motion.button 
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all"
            >
              <ArrowUpLeft className="w-6 h-6" />
            </motion.button>
            <motion.button 
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 border border-white/20 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all"
            >
              <ArrowUpRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center space-x-3">
            {Array.from({ length: slidesCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className="group"
              >
                <div className={`h-[2px] transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'w-12 bg-[#ccff00]' 
                    : 'w-6 bg-white/30 group-hover:w-8 group-hover:bg-white/50'
                }`} />
              </button>
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-right">
            <p className="text-xs text-gray-500 font-bold tracking-widest">
              SLIDE <span className="text-[#ccff00] text-lg font-black mx-1">0{currentSlide + 1}</span> / 0{slidesCount}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;