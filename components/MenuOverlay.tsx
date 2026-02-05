
import React from 'react';
import { motion } from 'framer-motion';
import { X, Twitter, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface MenuOverlayProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onClose: () => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ activeTab, onNavigate, onClose }) => {
  const menuItems = ['HOME', 'ABOUT', 'MATCHES', 'SHOP', 'BLOG', 'CONTACT'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col p-8 md:p-12 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Header section of the overlay */}
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <div className="flex items-center space-x-1">
           <div className="w-8 h-8 bg-[#ccff00] rounded-sm flex items-center justify-center">
             <span className="text-black font-black text-xs">EG</span>
           </div>
           <span className="text-white font-black tracking-tighter uppercase">ELITE<span className="text-[#ccff00]">GAMER</span></span>
        </div>
        <button onClick={onClose} className="p-3 md:p-4 bg-white/5 hover:bg-[#ccff00] hover:text-black transition-all">
          <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 overflow-y-auto custom-scrollbar">
        {/* Navigation links - Responsive text size for mobile phones */}
        <nav className="flex flex-col items-center md:items-start space-y-2 md:space-y-4">
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
              className={`text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter cursor-pointer transition-all hover:scale-105 hover:italic
                ${activeTab === item ? 'text-[#ccff00]' : 'text-white/20 hover:text-white'}
              `}
            >
              {item}
            </motion.div>
          ))}
        </nav>

        <div className="hidden lg:block w-px h-96 bg-white/10" />

        {/* Footer info in overlay - Scaled for mobile */}
        <div className="space-y-8 md:space-y-12 text-center md:text-left pb-8">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black tracking-[0.5em] text-[#ccff00] uppercase">Official Channels</h4>
              <div className="flex space-x-6 justify-center md:justify-start">
                 {[Twitter, Facebook, Instagram, MessageCircle].map((Icon, i) => (
                   <a key={i} href="#" className="text-white/40 hover:text-[#ccff00] transition-colors">
                     <Icon className="w-6 h-6 md:w-8 md:h-8" />
                   </a>
                 ))}
              </div>
           </div>

           <div className="space-y-2">
              <h4 className="text-[10px] font-black tracking-[0.5em] text-[#ccff00] uppercase">Headquarters</h4>
              <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] md:text-xs leading-relaxed">
                77 Tech Square, Sector 07<br />Neo Tokyo, Earth 2104
              </p>
           </div>

           <div className="pt-4 md:pt-12">
              <button className="bg-[#ccff00] text-black px-8 md:px-12 py-4 md:py-5 font-black text-xs md:text-sm tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all">
                JOIN THE ELITE
              </button>
           </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 text-[6px] md:text-[8px] font-black text-white/10 tracking-[1em]">SYSTEM_OVERLAY_v4.2.0</div>
    </motion.div>
  );
};

export default MenuOverlay;
