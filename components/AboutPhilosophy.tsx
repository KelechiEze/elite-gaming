
import React from 'react';
import { Shield, Zap, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPhilosophy: React.FC = () => {
  const pillars = [
    { 
      icon: <Zap className="w-12 h-12" />, 
      title: "PEAK PERFORMANCE", 
      desc: "Optimized for sub-ms latency. Our servers are built on proprietary hardware architecture for the fastest response times in modern e-sports.",
      tag: "CORE/01"
    },
    { 
      icon: <Shield className="w-12 h-12" />, 
      title: "SECURE ECOSYSTEM", 
      desc: "Advanced encryption and biometric authentication layers ensure your profile, assets, and competitive record remain untampered.",
      tag: "CORE/02"
    },
    { 
      icon: <Users className="w-12 h-12" />, 
      title: "PRO COMMUNITY", 
      desc: "A sanctuary for elite talent. Connect with verified pros through our exclusive scouting network and private tournament ladders.",
      tag: "CORE/03"
    },
    { 
      icon: <Globe className="w-12 h-12" />, 
      title: "GLOBAL NETWORK", 
      desc: "Distributed node architecture across 40+ countries, ensuring a seamless experience whether you are in Tokyo or London.",
      tag: "CORE/04"
    }
  ];

  return (
    <section className="bg-[#050505] py-32 px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
        <div className="lg:w-1/3">
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#ccff00]" />
              <div className="w-6 h-[2px] bg-[#ccff00]" />
              <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">The Pillars</span>
            </div>
            <h2 className="text-6xl font-black text-white leading-none tracking-tighter uppercase">
              YHPOSOLIHP<br />DRANB RUO
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm italic">
              "Gaming isn't just a pastime; it's a technical discipline. We provide the infrastructure for excellence."
            </p>
          </div>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-1">
          {pillars.map((p, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ backgroundColor: "rgba(204,255,0,0.05)" }}
              className="group relative border border-white/10 p-12 flex flex-col items-start space-y-8 transition-all duration-500"
            >
              <div className="text-[#ccff00] group-hover:scale-110 transition-transform duration-500">
                {p.icon}
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black text-gray-700 tracking-widest">{p.tag}</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-[#ccff00] transition-colors">{p.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-10 text-white font-black text-4xl group-hover:opacity-100 group-hover:text-[#ccff00] transition-all">
                0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPhilosophy;
