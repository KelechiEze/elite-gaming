import React from 'react';
import { motion } from 'framer-motion';
import { X, Twitter, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface MenuOverlayProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ activeTab, onNavigate, onClose }) => {
  const menuItems = ['HOME', 'ABOUT', 'MATCHES', 'SHOP', 'BLOG', 'GAME', 'CONTACT'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col p-6 md:p-10 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Header section of the overlay */}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <div className="flex items-center space-x-1">
           <div className="w-6 h-6 md:w-7 md:h-7 bg-[#ccff00] rounded-sm flex items-center justify-center">
             <span className="text-black font-black text-[8px] md:text-[10px]">EG</span>
           </div>
           <span className="text-white font-black tracking-tighter uppercase text-sm md:text-base">ELITE<span className="text-[#ccff00]">GAMER</span></span>
        </div>
        <button onClick={onClose} className="p-2 md:p-3 bg-white/5 hover:bg-[#ccff00] hover:text-black transition-all">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 overflow-y-auto custom-scrollbar">
        {/* Navigation links - Reduced text size for better fit */}
        <nav className="flex flex-col items-center md:items-start space-y-1 md:space-y-2">
          {menuItems.map((item, idx) => (
            <motion.div
              key={item}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                onNavigate(item);
                onClose();
              }}
              className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter cursor-pointer transition-all hover:scale-105 hover:italic
                ${activeTab === item ? 'text-[#ccff00]' : 'text-white/20 hover:text-white'}
              `}
            >
              {item}
            </motion.div>
          ))}
        </nav>

        <div className="hidden lg:block w-px h-64 bg-white/10" />

        {/* Footer info in overlay - Reduced spacing and text sizes */}
        <div className="space-y-6 md:space-y-8 text-center md:text-left pb-6">
           <div className="space-y-3">
              <h4 className="text-[8px] md:text-[9px] font-black tracking-[0.3em] md:tracking-[0.4em] text-[#ccff00] uppercase">Official Channels</h4>
              <div className="flex space-x-5 justify-center md:justify-start">
                 {[Twitter, Facebook, Instagram, MessageCircle].map((Icon, i) => (
                   <a key={i} href="#" className="text-white/40 hover:text-[#ccff00] transition-colors">
                     <Icon className="w-5 h-5 md:w-6 md:h-6" />
                   </a>
                 ))}
              </div>
           </div>

           <div className="space-y-2">
              <h4 className="text-[8px] md:text-[9px] font-black tracking-[0.3em] md:tracking-[0.4em] text-[#ccff00] uppercase">Headquarters</h4>
              <p className="text-white/60 font-bold uppercase tracking-wider text-[8px] md:text-[10px] leading-relaxed">
                77 Tech Square, Sector 07<br />Neo Tokyo, Earth 2104
              </p>
           </div>

           <div className="pt-2 md:pt-6">
              <button className="bg-[#ccff00] text-black px-6 md:px-8 py-2.5 md:py-3 font-black text-[10px] md:text-xs tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all">
                JOIN THE ELITE
              </button>
           </div>
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-[5px] md:text-[7px] font-black text-white/10 tracking-[0.8em] md:tracking-[1em]">SYSTEM_OVERLAY_v4.2.0</div>
    </motion.div>
  );
};

export default MenuOverlay;