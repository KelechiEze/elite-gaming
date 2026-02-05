
import React from 'react';

const MatchesListingHero: React.FC = () => {
  return (
    <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale-[0.4]"
          alt="Cinematic Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
          MATCHES LISTING
        </h1>
        <div className="flex items-center justify-center space-x-4">
          <span className="text-[10px] font-black text-white tracking-widest uppercase">HOME</span>
          <div className="w-4 h-[2px] bg-[#ccff00]" />
          <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">MATCHES LISTING</span>
        </div>
      </div>
      
      {/* Scanline overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
};

export default MatchesListingHero;
