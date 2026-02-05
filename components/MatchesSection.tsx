
import React, { useState } from 'react';
import { Youtube, Twitch, Disc, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MatchesSectionProps {
  onNotify: (msg: string) => void;
}

const MatchesSection: React.FC<MatchesSectionProps> = ({ onNotify }) => {
  const [filter, setFilter] = useState('ALL');

  const matches = [
    {
      title: "HADES & DRAGONS",
      time: "AM 12:30",
      date: "June , 2024 05",
      team1: "https://api.dicebear.com/7.x/identicon/svg?seed=dragons",
      team2: "https://api.dicebear.com/7.x/identicon/svg?seed=hades",
      team1Name: "DRAGONS",
      team2Name: "HADES",
      status: "UPCOMING"
    },
    {
      title: "THEORGS VS ALIEN GAMING",
      time: "AM 12:30",
      date: "June , 2024 05",
      team1: "https://api.dicebear.com/7.x/identicon/svg?seed=alien",
      team2: "https://api.dicebear.com/7.x/identicon/svg?seed=theorgs",
      team1Name: "ALIEN",
      team2Name: "THEORGS",
      status: "UPCOMING"
    },
    {
      title: "PIRATE GIRL VS GANGSTER SQUAD",
      time: "AM 03:30",
      date: "April , 2024 05",
      team1: "https://api.dicebear.com/7.x/identicon/svg?seed=gangster",
      team2: "https://api.dicebear.com/7.x/identicon/svg?seed=pirates",
      team1Name: "GANGSTER",
      team2Name: "PIRATES",
      status: "COMPLETED"
    }
  ];

  const filteredMatches = matches.filter(m => filter === 'ALL' || m.status === filter);

  const handleSocialClick = (platform: string) => {
    onNotify(`CONNECTING TO ${platform} CHANNEL...`);
  };

  return (
    <section className="bg-black py-32 px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-12">
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setFilter('UPCOMING')}
              className={`border border-white/10 px-8 py-3 text-[10px] font-black tracking-widest uppercase transition-colors relative group
                ${filter === 'UPCOMING' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'text-white hover:text-[#ccff00]'}
              `}
             >
                UPCOMING MATCHES
                <div className="absolute top-0 left-0 w-1 h-1 bg-white/30" />
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/30" />
             </button>
             <button 
              onClick={() => setFilter('COMPLETED')}
              className={`border border-white/10 px-8 py-3 text-[10px] font-black tracking-widest uppercase transition-colors relative group
                ${filter === 'COMPLETED' ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'text-white hover:text-[#ccff00]'}
              `}
             >
                COMPLETED MATCHES
                <div className="absolute top-0 left-0 w-1 h-1 bg-white/30" />
                <div className="absolute bottom-0 right-0 w-1 h-1 bg-white/30" />
             </button>
             <button 
              onClick={() => setFilter('ALL')}
              className={`px-10 py-3 text-[10px] font-black tracking-widest uppercase relative group transition-colors
                ${filter === 'ALL' ? 'bg-[#ccff00] text-black' : 'bg-white/5 text-white hover:text-[#ccff00]'}
              `}
             >
                ALL
                <div className="absolute top-1 left-1 w-1 h-1 bg-black opacity-20" />
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-black opacity-20" />
             </button>
          </div>

          <div className="text-right flex flex-col items-end">
            <div className="flex items-center justify-end space-x-2 mb-4">
               <div className="w-2 h-2 bg-[#ccff00]" />
               <div className="w-6 h-[2px] bg-[#ccff00]" />
               <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Our Matches</span>
            </div>
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">
              LAUTRIV EROLPXE<br />SEMAG ENILNO
            </h2>
          </div>
        </div>

        <div className="border border-white/10 divide-y divide-white/10 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {filteredMatches.map((m, i) => (
              <motion.div 
                key={m.title}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 p-12 hover:bg-white/[0.02] transition-colors group"
              >
                <div className="space-y-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-3xl font-black text-white tracking-tighter uppercase">{m.title}</h3>
                    <span className={`text-[8px] font-black px-2 py-1 border ${m.status === 'COMPLETED' ? 'border-gray-700 text-gray-500' : 'border-[#ccff00] text-[#ccff00]'}`}>{m.status}</span>
                  </div>
                  <div className="flex items-center space-x-12">
                     <div className="flex items-center space-x-2 text-gray-500">
                        <span className="text-[11px] font-black uppercase text-white">{m.time}</span>
                        <Clock className="w-4 h-4 text-[#ccff00]" />
                     </div>
                     <div className="flex items-center space-x-2 text-gray-500">
                        <span className="text-[11px] font-black uppercase text-white">{m.date}</span>
                        <Calendar className="w-4 h-4 text-[#ccff00]" />
                     </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                     <div onClick={() => handleSocialClick('YOUTUBE')} className="flex items-center space-x-4 group/icon cursor-pointer">
                        <span className="text-[10px] font-black tracking-widest text-gray-500 group-hover/icon:text-white transition-colors">YOUTUBE</span>
                        <div className="w-8 h-8 border border-white/10 flex items-center justify-center group-hover/icon:bg-red-600 group-hover/icon:border-red-600 transition-all">
                          <Youtube className="w-4 h-4" />
                        </div>
                     </div>
                     <div onClick={() => handleSocialClick('TWITCH')} className="flex items-center space-x-4 group/icon cursor-pointer">
                        <span className="text-[10px] font-black tracking-widest text-gray-500 group-hover/icon:text-white transition-colors">TWITCH</span>
                        <div className="w-8 h-8 border border-white/10 flex items-center justify-center group-hover/icon:bg-purple-600 group-hover/icon:border-purple-600 transition-all">
                          <Twitch className="w-4 h-4" />
                        </div>
                     </div>
                     <div onClick={() => handleSocialClick('DISCORD')} className="flex items-center space-x-4 group/icon cursor-pointer">
                        <span className="text-[10px] font-black tracking-widest text-gray-500 group-hover/icon:text-white transition-colors">DISCORD</span>
                        <div className="w-8 h-8 border border-white/10 flex items-center justify-center group-hover/icon:bg-indigo-600 group-hover/icon:border-indigo-600 transition-all">
                          <Disc className="w-4 h-4" />
                        </div>
                     </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-12 mt-12 lg:mt-0">
                   <div className="flex flex-col items-center space-y-4">
                      <div className="w-32 h-32 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                         <img src={m.team1} className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <span className="text-xs font-black tracking-widest text-white">{m.team1Name}</span>
                   </div>

                   <div className="relative flex items-center">
                      <div className="w-[1px] h-12 bg-white/10 rotate-12" />
                      <span className="mx-6 text-2xl font-black italic text-white tracking-tighter opacity-80">VS</span>
                      <div className="w-[1px] h-12 bg-white/10 rotate-12" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#ccff00] blur-[2px] rounded-full animate-pulse" />
                   </div>

                   <div className="flex flex-col items-center space-y-4">
                      <div className="w-32 h-32 relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                         <img src={m.team2} className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <span className="text-xs font-black tracking-widest text-white">{m.team2Name}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MatchesSection;
