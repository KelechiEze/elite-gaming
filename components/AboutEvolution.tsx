
import React from 'react';
import { motion } from 'framer-motion';

const AboutEvolution: React.FC = () => {
  const milestones = [
    { year: "2020", title: "THE SPARK", desc: "Elite Gaming Hub founded in a small tech lab in Tokyo with a vision for zero-latency play." },
    { year: "2021", title: "EXPANSION", desc: "Acquired first 10 data centers across Asia and North America. User base hits 1M." },
    { year: "2022", title: "THE APEX ENGINE", desc: "Launch of our proprietary matching algorithm and hardware-accelerated anti-cheat." },
    { year: "2023", title: "GLOBAL DOMINANCE", desc: "Voted #1 competitive platform globally. Partnerships with top 10 pro e-sports teams." },
    { year: "2024", title: "NEXT GEN", desc: "Introduction of the 2024 Portal UI and decentralized cloud gaming infrastructure." }
  ];

  return (
    <section className="bg-[#050505] py-32 px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-24">
           <h2 className="text-7xl font-black text-white tracking-tighter uppercase leading-none">LEGACY</h2>
           <div className="text-right">
              <span className="text-[10px] font-black text-[#ccff00] tracking-widest uppercase block">The Roadmap</span>
              <span className="text-xs font-bold text-gray-500 uppercase">2020 - PRESENT</span>
           </div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[47px] lg:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

          <div className="space-y-32">
            {milestones.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`relative flex items-center ${i % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Connector Dot */}
                <div className="absolute left-[47px] lg:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#050505] border-2 border-[#ccff00] rounded-full z-10">
                   <div className="w-1 h-1 bg-[#ccff00] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
                </div>

                <div className={`w-full lg:w-1/2 ${i % 2 === 0 ? 'lg:pl-24' : 'lg:pr-24'} pl-24 lg:pl-0`}>
                   <div className={`space-y-4 ${i % 2 === 0 ? 'text-left' : 'lg:text-right text-left'}`}>
                      <div className="text-5xl font-black text-white/20 group-hover:text-[#ccff00] transition-colors">{m.year}</div>
                      <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                        {m.desc}
                      </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutEvolution;
