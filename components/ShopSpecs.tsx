
import React from 'react';
import { motion } from 'framer-motion';

const ShopSpecs: React.FC = () => {
  return (
    <section className="bg-[#0a0a0a] py-32 px-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-32">
        <div className="lg:w-1/2 relative">
           {/* UI Elements Decoration */}
           <div className="absolute -top-12 -left-12 text-[10px] font-black text-gray-800 tracking-[1em] rotate-90 origin-left">HARDWARE_LABS_2024</div>
           
           <motion.div 
             initial={{ opacity: 0, scale: 1.1 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="aspect-square relative group"
           >
              <div className="absolute inset-0 border border-[#ccff00]/20 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
              <div className="absolute inset-0 border border-white/10 -translate-x-4 -translate-y-4 group-hover:-translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
              <img 
                src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                alt="Switch Detail"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/10 to-transparent pointer-events-none" />
           </motion.div>
        </div>

        <div className="lg:w-1/2 space-y-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-[#ccff00]" />
               <div className="w-6 h-[2px] bg-[#ccff00]" />
               <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Technical Superiority</span>
            </div>
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-tight">
              WHY OUR GEAR<br />WINS GAMES
            </h2>
            <p className="text-gray-500 leading-relaxed">
              We collaborate with the world's leading materials scientists and e-sports psychologists to create hardware that removes all barriers between your mind and the game.
            </p>
          </div>

          <div className="space-y-8">
            {[
              { title: "KINETIC SWITCHES", desc: "Hall-effect magnetic switches with 0.1mm actuation point customization." },
              { title: "LIQUID COOLING FABRIC", desc: "Proprietary textile on mousepads and seats for thermal regulation during high-stress matches." },
              { title: "BIOMETRIC SENSORS", desc: "Integrated heart-rate and sweat monitoring to track your performance stats in real-time." }
            ].map((spec, i) => (
              <div key={i} className="flex items-start space-x-6 group">
                <span className="text-3xl font-black text-white/10 group-hover:text-[#ccff00] transition-colors">0{i+1}</span>
                <div className="space-y-2">
                   <h4 className="text-xl font-black text-white uppercase tracking-tighter">{spec.title}</h4>
                   <p className="text-gray-600 text-sm max-w-sm">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSpecs;
