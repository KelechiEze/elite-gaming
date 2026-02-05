
import React from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart, ShieldCheck, Zap, Globe } from 'lucide-react';

interface PreviewModalProps {
  product: any;
  onClose: () => void;
  onAddToCart: (p: any) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative bg-[#050505] border border-white/10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-[#ccff00] hover:text-black transition-all">
           <X className="w-6 h-6" />
        </button>

        {/* Image Section */}
        <div className="relative aspect-square md:aspect-auto overflow-hidden bg-black">
           <img src={product.img} className="w-full h-full object-cover grayscale-[0.2]" alt={product.name} />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
           <div className="absolute bottom-8 left-8 text-white">
              <div className="text-[10px] font-black tracking-widest uppercase text-[#ccff00] mb-2">{product.category}</div>
              <h2 className="text-4xl font-black tracking-tighter uppercase">{product.name}</h2>
           </div>
        </div>

        {/* Content Section */}
        <div className="p-12 md:p-16 flex flex-col justify-between space-y-12">
           <div className="space-y-8">
              <div className="flex items-center space-x-2">
                 <div className="w-6 h-[2px] bg-[#ccff00]" />
                 <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Specifications</span>
              </div>
              
              <p className="text-gray-400 text-lg leading-relaxed italic">
                "{product.desc || 'Optimized for high-performance gaming cycles with zero-latency interface.'}"
              </p>

              <div className="grid grid-cols-1 gap-6">
                 <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#ccff00]">
                       <Zap className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Response</div>
                       <div className="text-white font-black uppercase tracking-tighter">ULTRA_LOW LATENCY</div>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#ccff00]">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Warranty</div>
                       <div className="text-white font-black uppercase tracking-tighter">LIFETIME_ARMORY PROTECTION</div>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4 group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#ccff00]">
                       <Globe className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Connectivity</div>
                       <div className="text-white font-black uppercase tracking-tighter">GLOBAL MESH SYNC</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-white/10 flex items-center justify-between gap-8">
              <div className="flex flex-col">
                 <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Unit Price</span>
                 <span className="text-4xl font-black text-white italic tracking-tighter">{product.price}</span>
              </div>
              <button 
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-[#ccff00] text-black py-5 font-black tracking-widest uppercase flex items-center justify-center space-x-4 hover:brightness-110 transition-all active:scale-95"
              >
                 <ShoppingCart className="w-6 h-6" />
                 <span>ADD TO GEAR</span>
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PreviewModal;
