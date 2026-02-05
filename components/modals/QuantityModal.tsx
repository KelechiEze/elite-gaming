
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingCart } from 'lucide-react';

interface QuantityModalProps {
  product: any;
  onConfirm: (quantity: number) => void;
  onClose: () => void;
}

const QuantityModal: React.FC<QuantityModalProps> = ({ product, onConfirm, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-[#0a0a0a] border border-[#ccff00]/30 w-full max-w-sm p-10 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#ccff00]/10" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
           <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-8">
           <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase">DEPLOY UNIT</h3>
              <p className="text-[10px] text-[#ccff00] font-bold tracking-widest uppercase">{product.name}</p>
           </div>

           <div className="flex items-center justify-center space-x-8">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-[#ccff00] text-white transition-all"
              >
                 <Minus className="w-5 h-5" />
              </button>
              <span className="text-5xl font-black text-white tracking-tighter w-12">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-[#ccff00] text-white transition-all"
              >
                 <Plus className="w-5 h-5" />
              </button>
           </div>

           <div className="pt-4 border-t border-white/5">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Est. Credits</span>
                 <span className="text-2xl font-black text-white italic">${(parseFloat(product.price.replace('$', '')) * quantity).toFixed(2)}</span>
              </div>
              <button 
                onClick={() => onConfirm(quantity)}
                className="w-full bg-[#ccff00] text-black py-4 font-black tracking-widest uppercase flex items-center justify-center space-x-3 hover:brightness-110 transition-all active:scale-95"
              >
                 <ShoppingCart className="w-5 h-5" />
                 <span>CONFIRM ADDITION</span>
              </button>
           </div>
        </div>

        <div className="mt-8 text-[8px] font-black text-gray-800 tracking-widest uppercase text-center">
           ENCRYPTED TRANSACTION_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </motion.div>
    </div>
  );
};

export default QuantityModal;
