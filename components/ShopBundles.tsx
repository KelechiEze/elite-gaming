
import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';

interface ShopBundlesProps {
  onBundleSelect: (p: any) => void;
}

const ShopBundles: React.FC<ShopBundlesProps> = ({ onBundleSelect }) => {
  const bundles = [
    {
      id: 101,
      name: "PRO STARTER PACK",
      items: ["Apex Mouse", "Neon Pad", "Elite T-Shirt"],
      price: "$199.00",
      save: "SAVE 20%",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 102,
      name: "ULTIMATE STREAMER",
      items: ["Mech Keyboard", "Audio Pro", "Virtual Sight"],
      price: "$849.00",
      save: "SAVE 15%",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-black py-32 px-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
           <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-1 h-1 bg-[#ccff00]" />
              <div className="w-6 h-[2px] bg-[#ccff00]" />
              <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Bundle & Conquer</span>
              <div className="w-6 h-[2px] bg-[#ccff00]" />
              <div className="w-1 h-1 bg-[#ccff00]" />
           </div>
           <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">EQUIPMENT BUNDLES</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {bundles.map((b, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="group relative h-[400px] border border-white/10 overflow-hidden bg-[#050505]"
            >
              <img 
                src={b.img} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000"
                alt={b.name}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-between items-start">
                 <div className="space-y-4">
                    <div className="inline-block bg-[#ccff00] text-black px-4 py-1 text-[10px] font-black tracking-widest uppercase">
                       {b.save}
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{b.name}</h3>
                    <ul className="space-y-1">
                       {b.items.map((item, j) => (
                         <li key={j} className="text-gray-400 text-sm font-bold flex items-center space-x-2">
                           <div className="w-1 h-1 bg-[#ccff00]" />
                           <span>{item}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 
                 <div className="flex items-center space-x-8">
                    <div className="text-5xl font-black text-white italic">{b.price}</div>
                    <button 
                      onClick={() => onBundleSelect(b)}
                      className="w-14 h-14 bg-white text-black flex items-center justify-center hover:bg-[#ccff00] transition-colors group/btn"
                    >
                       <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                 </div>
              </div>
              
              <div className="absolute top-4 right-4 text-white/10 group-hover:text-[#ccff00]/40 transition-colors">
                 <Package className="w-12 h-12" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopBundles;
