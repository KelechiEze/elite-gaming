
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface ShopFeaturedProps {
  onPreOrder: (p: any) => void;
}

const ShopFeatured: React.FC<ShopFeaturedProps> = ({ onPreOrder }) => {
  const product = {
    id: 99,
    name: "VOID MASTER ULTRA V2",
    price: "$299.00",
    img: "https://images.unsplash.com/photo-1527814050087-379371549a28?q=80&w=1000&auto=format&fit=crop",
    category: "PREMIUM"
  };

  return (
    <section className="bg-black py-32 px-24 border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none select-none">
        <span className="text-[300px] font-black text-white leading-none">PREMIUM</span>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-10"
        >
          <div className="space-y-4">
             <div className="flex items-center space-x-2">
                <div className="w-8 h-[2px] bg-[#ccff00]" />
                <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Signature Edition</span>
             </div>
             <h2 className="text-8xl font-black text-white tracking-tighter uppercase leading-none">
               VOID MASTER<br /><span className="text-gray-800">ULTRA V2</span>
             </h2>
          </div>
          
          <p className="text-gray-500 text-lg leading-relaxed max-w-lg italic">
            "The lightest, fastest, and most precise mechanical switches ever engineered for the human hand."
          </p>

          <div className="flex items-center space-x-12">
             <div className="space-y-1">
                <div className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Latency</div>
                <div className="text-2xl font-black text-white">0.12ms</div>
             </div>
             <div className="w-[1px] h-12 bg-white/10" />
             <div className="space-y-1">
                <div className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Poll Rate</div>
                <div className="text-2xl font-black text-white">8000Hz</div>
             </div>
             <div className="w-[1px] h-12 bg-white/10" />
             <div className="space-y-1">
                <div className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Weight</div>
                <div className="text-2xl font-black text-white">42g</div>
             </div>
          </div>

          <button 
            onClick={() => onPreOrder(product)}
            className="bg-[#ccff00] text-black px-16 py-6 font-black tracking-widest uppercase flex items-center space-x-4 hover:bg-white transition-all group"
          >
             <span>PRE-ORDER NOW</span>
             <Zap className="w-5 h-5 fill-current" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          className="flex-1 relative"
        >
          <div className="absolute inset-0 bg-[#ccff00] blur-[150px] opacity-10 rounded-full" />
          <img 
            src={product.img} 
            className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] relative z-20 grayscale hover:grayscale-0 transition-all duration-700"
            alt="Hero Mouse"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ShopFeatured;
