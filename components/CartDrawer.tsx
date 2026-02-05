
import React from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../App';

interface CartDrawerProps {
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ items, onClose, onRemove, onCheckout }) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" onClick={onClose} />
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[70] flex flex-col"
      >
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
           <h2 className="text-2xl font-black text-white tracking-tighter uppercase">YOUR ARMORY</h2>
           <button onClick={onClose} className="p-2 hover:bg-white/10 transition-colors">
              <X className="w-6 h-6 text-white" />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-30 text-center">
               <div className="w-20 h-20 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
                  <X className="w-8 h-8" />
               </div>
               <p className="text-xs font-black tracking-widest uppercase">Inventory Empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex space-x-4 border-b border-white/5 pb-6 group">
                 <div className="w-24 h-24 bg-[#0a0a0a] border border-white/10 overflow-hidden">
                    <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={item.name} />
                 </div>
                 <div className="flex-1 flex flex-col justify-between">
                    <div>
                       <h3 className="text-sm font-black text-white uppercase tracking-widest">{item.name}</h3>
                       <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">QTY: {item.quantity}</div>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[#ccff00] font-black italic">${(item.price * item.quantity).toFixed(2)}</span>
                       <button onClick={() => onRemove(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 bg-[#0a0a0a] border-t border-white/10 space-y-6">
            <div className="flex justify-between items-end">
               <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Subtotal</span>
               <span className="text-3xl font-black text-white tracking-tighter italic">${subtotal.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-[#ccff00] text-black py-5 font-black tracking-widest uppercase flex items-center justify-center space-x-3 hover:brightness-110 transition-all group"
            >
               <span>PROCEED TO CHECKOUT</span>
               <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CartDrawer;
