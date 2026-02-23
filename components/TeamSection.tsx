
import React from 'react';
import { motion } from 'framer-motion';

const TeamSection: React.FC = () => {
  const team = [
    { name: "Zhou Zhen", role: "Sound Designer", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" },
    { name: "Qing Heng", role: "Concept Artist", img: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=800&auto=format&fit=crop" },
    { name: "Zheng Jiahao", role: "Animator", img: "https://images.unsplash.com/photo-1614850523296-e8c041de4398?q=80&w=800&auto=format&fit=crop" },
    { name: "Chun Qing", role: "Software Engineer", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <section className="bg-[#050505] py-20 md:py-32 px-4 md:px-12 lg:px-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center space-x-4 mb-4">
             <div className="w-1 h-1 bg-[#ccff00]" />
             <div className="w-6 h-[2px] bg-[#ccff00]" />
             <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Meet Our Team</span>
             <div className="w-6 h-[2px] bg-[#ccff00]" />
             <div className="w-1 h-1 bg-[#ccff00]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            DRAUQS RENGISED EMAG
          </h2>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative border border-white/10 p-4 transition-all duration-300 group-hover:border-[#ccff00]/50 group-hover:bg-white/[0.02]">
                <div className="aspect-[4/5] overflow-hidden mb-8 relative">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>
                <div className="text-center space-y-1 pb-4">
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-[#ccff00] transition-colors">{member.name}</h3>
                  <p className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
