
import React from 'react';
import { ArrowUpLeft, LayoutGrid } from 'lucide-react';

interface TechnicalSectionProps {
  onNavigate: (tab: string) => void;
}

const TechnicalSection: React.FC<TechnicalSectionProps> = ({ onNavigate }) => {
  return (
    <section className="bg-[#050505] py-16 md:py-32 px-4 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-16 md:mb-24 gap-8 md:gap-0">
        <button 
          onClick={() => onNavigate('ABOUT')}
          className="relative bg-[#ccff00] text-black px-8 py-3 text-[10px] font-black tracking-widest uppercase transition-transform active:scale-95"
        >
           VIEW MORE
           <div className="absolute top-1 left-1 w-1 h-1 bg-black" />
           <div className="absolute bottom-1 right-1 w-1 h-1 bg-black" />
        </button>

        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-[#ccff00]" />
            <div className="w-6 h-[2px] bg-[#ccff00]" />
            <span className="text-[#ccff00] text-[10px] md:text-xs font-black tracking-widest uppercase">Gateway to Gaming</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-none tracking-tighter uppercase">
            GNIMAG GNIDLIUB<br />ESREVINU
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="relative group w-full">
          <div className="absolute -top-4 -left-4 md:-top-12 md:-left-12 z-20">
            <ArrowUpLeft className="w-10 h-10 md:w-16 md:h-16 text-[#ccff00]" strokeWidth={3} />
          </div>
          <div className="relative aspect-video overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt="Girl Gaming"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>

        <div className="space-y-8 md:space-y-12">
          <div className="space-y-6">
            <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase">Technical</h3>
            <h4 className="text-lg md:text-2xl font-black text-white tracking-tighter uppercase max-w-lg leading-tight">
              How can I fix a game that<br />won't start or crashes?
            </h4>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-xl">
              Ut fermentum porttitor dignissim. Aliquam vitae elit eget urna dapibus porta sed vel ipsum. Nam id varius ante, vitae varius massa. Nullam in tellus risus. Nulla id duiaccumsan vehicula eu urna.
            </p>
          </div>

          <button 
            onClick={() => onNavigate('CONTACT')}
            className="relative bg-[#ccff00] text-black px-12 py-5 text-[10px] md:text-sm font-black tracking-widest uppercase transition-transform active:scale-95 group"
          >
             SUPPORT PORTAL
             <div className="absolute top-1 left-1 w-1 h-1 bg-black" />
             <div className="absolute bottom-1 right-1 w-1 h-1 bg-black" />
          </button>
        </div>
      </div>

      <div className="mt-20 md:mt-32 pt-12 md:pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div 
          onClick={() => onNavigate('SHOP')}
          className="w-12 h-12 border border-[#ccff00] flex items-center justify-center group cursor-pointer hover:bg-[#ccff00] transition-all"
        >
          <LayoutGrid className="w-6 h-6 text-[#ccff00] group-hover:text-black" />
        </div>
        <div className="text-[8px] md:text-[10px] text-gray-700 font-bold tracking-[0.5em] uppercase">SYSTEM ENCRYPTION: SECURED</div>
      </div>
    </section>
  );
};

export default TechnicalSection;
