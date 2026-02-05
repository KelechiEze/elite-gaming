
import React from 'react';
import { motion } from 'framer-motion';

interface AboutTechEngineProps {
  onNotify: (msg: string) => void;
}

const AboutTechEngine: React.FC<AboutTechEngineProps> = ({ onNotify }) => {
  const specs = [
    { label: "SERVER HERTZ", value: "240Hz Tick Rate" },
    { label: "UPTIME", value: "99.999% Guaranteed" },
    { label: "ENCRYPTION", value: "SHA-512 Quantum-Proof" },
    { label: "REGIONS", value: "Global Cloud Mesh" }
  ];

  return (
    <section className="bg-[#0a0a0a] py-32 px-24 border-y border-white/5 relative overflow-hidden">
      <div className="absolute -right-20 top-0 opacity-5 pointer-events-none">
        <h2 className="text-[300px] font-black text-white leading-none">TECH</h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="relative aspect-square border border-white/10 bg-[#050505] p-12 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-60 mix-blend-screen"
            alt="Hardware"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-12">
             <h3 className="text-4xl font-black text-[#ccff00] tracking-tighter uppercase mb-4">THE APEX ENGINE</h3>
             <div className="h-[2px] w-24 bg-[#ccff00] mx-auto mb-6" />
             <p className="text-gray-400 text-xs font-bold leading-relaxed">
               Proprietary gaming infrastructure designed from the ground up for the ultimate competitive edge. No compromises.
             </p>
          </div>
          <div className="absolute top-4 left-4 border-l border-[#ccff00] pl-2 text-[8px] font-black text-[#ccff00]">SYS_INIT: OK</div>
          <div className="absolute bottom-4 right-4 text-[8px] font-black text-gray-700">VERSION 4.2.0.BUILD_88</div>
        </motion.div>

        <div className="space-y-16">
          <div className="space-y-6">
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">TECHNICAL<br />EXCELLENCE</h2>
            <p className="text-gray-500 max-w-lg">
              Behind every frame and every click is a complex ecosystem of high-availability clusters and ultra-low latency routing. We don't just host games; we host legends.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {specs.map((s, i) => (
              <div key={i} className="space-y-2 border-b border-white/10 pb-4 group">
                <div className="text-[10px] text-gray-600 font-bold tracking-widest uppercase group-hover:text-[#ccff00] transition-colors">{s.label}</div>
                <div className="text-xl font-black text-white uppercase tracking-tighter">{s.value}</div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onNotify('DATASHEET DOWNLOAD INITIATED')}
            className="relative bg-white text-black px-12 py-5 text-sm font-black tracking-widest uppercase transition-all hover:bg-[#ccff00] group"
          >
             VIEW DATASHEET
             <div className="absolute top-1 left-1 w-1 h-1 bg-black" />
             <div className="absolute bottom-1 right-1 w-1 h-1 bg-black" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutTechEngine;
