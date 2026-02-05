
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface BlogListProps {
  onReadArticle: (id: number) => void;
  onNotify: (msg: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ onReadArticle, onNotify }) => {
  const posts = [
    { id: 1, title: "THE FUTURE OF VR: BEYOND THE HEADSET", date: "JAN 12, 2024", author: "CYBER_01", img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "LATENCY WARS: HOW 240HZ IS CHANGING E-SPORTS", date: "FEB 05, 2024", author: "TECH_MIND", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "BUILDING THE ULTIMATE NEON GAMING STATION", date: "MAR 21, 2024", author: "INTERIOR_X", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" }
  ];

  const handleLoadMore = () => {
    onNotify('ARCHIVE RETRIEVAL IN PROGRESS...');
    setTimeout(() => {
      onNotify('NO OLDER LOGS DETECTED IN CURRENT SECTOR');
    }, 1500);
  };

  return (
    <section className="bg-[#050505] py-32 px-24">
      <div className="max-w-5xl mx-auto space-y-24">
        {posts.map((p, idx) => (
          <motion.article 
            key={p.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="w-full md:w-1/2 aspect-video overflow-hidden border border-white/10 relative">
               <img 
                 src={p.img} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                 alt={p.title}
               />
               <div className="absolute top-4 left-4 bg-[#ccff00] text-black px-4 py-2 text-[10px] font-black tracking-widest uppercase">{p.date}</div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
               <div className="flex items-center space-x-3 text-[10px] font-black text-gray-500 tracking-widest uppercase">
                  <span>WRITTEN BY {p.author}</span>
                  <div className="w-4 h-[1px] bg-gray-500" />
                  <span>5 MIN READ</span>
               </div>
               <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none group-hover:text-[#ccff00] transition-colors uppercase">
                 {p.title}
               </h2>
               <p className="text-gray-500 text-sm leading-relaxed">
                 Aliquam vitae elit eget urna dapibus porta sed vel ipsum. Nam id varius ante, vitae varius massa. Nullam in tellus risus. Nulla id dui accumsan vehicula eu urna.
               </p>
               <button 
                onClick={() => onReadArticle(p.id)}
                className="flex items-center space-x-2 text-[#ccff00] text-[10px] font-black tracking-[0.3em] uppercase group/btn hover:brightness-125 transition-all"
               >
                  <span>READ ARTICLE</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
               </button>
            </div>
          </motion.article>
        ))}

        <div className="pt-20 border-t border-white/5 flex justify-center">
          <button 
            onClick={handleLoadMore}
            className="bg-white/5 text-white px-12 py-5 text-xs font-black tracking-widest uppercase hover:bg-[#ccff00] hover:text-black transition-all"
          >
            LOAD OLDER LOGS
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
