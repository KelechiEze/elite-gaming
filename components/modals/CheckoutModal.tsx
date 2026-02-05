
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, CreditCard, Shield, Truck, CheckCircle } from 'lucide-react';
import { CartItem } from '../../App';

interface CheckoutModalProps {
  cart: CartItem[];
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ cart, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const steps = [
    { id: 1, name: "IDENTIFICATION", icon: Shield },
    { id: 2, name: "LOGISTICS", icon: Truck },
    { id: 3, name: "TRANSMISSION", icon: CreditCard }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-[#050505] border border-white/10 w-full max-w-4xl min-h-[600px] flex flex-col md:flex-row overflow-hidden shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 hover:bg-white/10 transition-colors">
           <X className="w-6 h-6 text-white" />
        </button>

        {/* Sidebar Summary */}
        <div className="w-full md:w-80 bg-[#0a0a0a] border-r border-white/10 p-12 flex flex-col justify-between">
           <div className="space-y-8">
              <div className="space-y-1">
                 <h2 className="text-xl font-black text-white tracking-tighter uppercase">ORDER SUMMARY</h2>
                 <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">{cart.length} ITEMS DETECTED</p>
              </div>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                 {cart.map(item => (
                   <div key={item.id} className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-bold">{item.quantity}X {item.name}</span>
                      <span className="text-white font-black">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="pt-8 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">Subtotal</span>
                 <span className="text-sm font-black text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">Tax</span>
                 <span className="text-sm font-black text-white">$0.00</span>
              </div>
              <div className="flex justify-between items-end">
                 <span className="text-[10px] text-[#ccff00] font-black tracking-widest uppercase">Total</span>
                 <span className="text-3xl font-black text-[#ccff00] tracking-tighter italic">${total.toFixed(2)}</span>
              </div>
           </div>
        </div>

        {/* Main Form Area */}
        <div className="flex-1 p-12 md:p-16 flex flex-col">
           {/* Steps Indicator */}
           <div className="flex items-center justify-between mb-16 px-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2" />
              {steps.map(s => {
                const Icon = s.icon;
                const isActive = step >= s.id;
                return (
                  <div key={s.id} className="relative z-10 flex flex-col items-center space-y-2">
                     <div className={`w-10 h-10 border ${isActive ? 'bg-[#ccff00] border-[#ccff00] text-black' : 'bg-black border-white/10 text-white/30'} flex items-center justify-center transition-all duration-500`}>
                        <Icon className="w-5 h-5" />
                     </div>
                     <span className={`text-[8px] font-black tracking-widest uppercase ${isActive ? 'text-[#ccff00]' : 'text-gray-700'}`}>{s.name}</span>
                  </div>
                )
              })}
           </div>

           <div className="flex-1">
             <AnimatePresence mode="wait">
               {step === 1 && (
                 <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase">AGENT REGISTRATION</h3>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">CALL SIGN</label>
                          <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-xs outline-none focus:border-[#ccff00]" placeholder="PLAYER ONE" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">COMMS ID</label>
                          <input type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-xs outline-none focus:border-[#ccff00]" placeholder="AGENT@GALAXY.NET" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">SECURITY PIN (DUMMY)</label>
                       <input type="password" value="********" readOnly className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white/20 text-xs outline-none" />
                    </div>
                 </motion.div>
               )}

               {step === 2 && (
                 <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase">DROP ZONE COORDINATES</h3>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">LOCATION ADDRESS</label>
                       <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-xs outline-none focus:border-[#ccff00]" placeholder="123 NEON BOULEVARD, SECTOR 7" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">HUB / CITY</label>
                          <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-xs outline-none focus:border-[#ccff00]" placeholder="NEW TOKYO" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">PORTAL CODE</label>
                          <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-xs outline-none focus:border-[#ccff00]" placeholder="XJ-900" />
                       </div>
                    </div>
                 </motion.div>
               )}

               {step === 3 && (
                 <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase">CREDIT TRANSMISSION</h3>
                    <div className="bg-[#ccff00]/5 border border-[#ccff00]/20 p-6 flex items-center space-x-4 mb-6">
                       <CreditCard className="w-10 h-10 text-[#ccff00]" />
                       <p className="text-[10px] text-[#ccff00] font-black uppercase tracking-widest leading-relaxed">
                          Secure Quantum-Linked Encryption Protocol Active. Your data is fragmented and untraceable.
                       </p>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">CARD SIGNATURE</label>
                       <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-xs outline-none focus:border-[#ccff00]" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">EXPIRY</label>
                          <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-xs outline-none focus:border-[#ccff00]" placeholder="MM / YY" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest">CVC CODE</label>
                          <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-xs outline-none focus:border-[#ccff00]" placeholder="***" />
                       </div>
                    </div>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>

           <div className="pt-12 mt-12 border-t border-white/5 flex items-center justify-between">
              <button 
                onClick={() => step > 1 && setStep(step - 1)}
                disabled={step === 1}
                className="flex items-center space-x-2 text-xs font-black text-gray-500 hover:text-white transition-colors disabled:opacity-0"
              >
                 <ArrowLeft className="w-4 h-4" />
                 <span>PREVIOUS SECTOR</span>
              </button>
              
              <button 
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                  else onSuccess();
                }}
                className="bg-[#ccff00] text-black px-12 py-5 font-black tracking-widest uppercase flex items-center space-x-3 hover:brightness-110 active:scale-95 transition-all group"
              >
                 <span>{step === 3 ? "FINALIZE ORDER" : "NEXT PHASE"}</span>
                 {step === 3 ? <CheckCircle className="w-5 h-5" /> : <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />}
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
