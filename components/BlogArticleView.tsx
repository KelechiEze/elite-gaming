
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Share2, Facebook, Twitter, MessageSquare } from 'lucide-react';

interface BlogArticleViewProps {
  articleId: number;
  onBack: () => void;
}

const BlogArticleView: React.FC<BlogArticleViewProps> = ({ articleId, onBack }) => {
  // Mock data fetching based on ID
  const posts = {
    1: { 
      title: "THE FUTURE OF VR: BEYOND THE HEADSET", 
      date: "JAN 12, 2024", 
      author: "CYBER_01", 
      category: "TECHNOLOGY",
      img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&auto=format&fit=crop",
      content: `
        The landscape of Virtual Reality is undergoing a radical transformation. What was once a niche hardware gimmick for gaming enthusiasts is now becoming a foundational layer of our digital existence. As we look towards the next decade, the focus is shifting away from bulky headsets and towards "seamless integration."

        We are seeing the emergence of high-fidelity retinal projection and neural interface technology that bypasses traditional displays altogether. The goal? A reality where the digital and physical are indistinguishable.

        "The true potential of VR isn't in the hardware we wear, but in the experiences we share," says Dr. Aris Thorne, lead researcher at Neo Tokyo Labs. 

        Current-gen VR headsets are reaching the limits of physical miniaturization. The next step is a complete paradigm shift in optical engineering. Pancake lenses were just the start; the industry is now moving toward solid-state holographic emitters.
      `
    },
    2: { 
      title: "LATENCY WARS: HOW 240HZ IS CHANGING E-SPORTS", 
      date: "FEB 05, 2024", 
      author: "TECH_MIND", 
      category: "COMPETITIVE",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      content: `
        In the world of competitive gaming, milliseconds are the difference between victory and defeat. The transition from 60Hz to 144Hz was revolutionary, but the jump to 240Hz and beyond is redefining the human-computer interface.

        Higher refresh rates reduce input lag and visual artifacts like ghosting, providing a smoother, more responsive experience. But it's not just about the numbers; it's about sensory synchronization.

        Top e-sports athletes report a "flow state" that is significantly easier to achieve when the game's visual output perfectly matches their neurological response time. At 240Hz, the motion blur that once plagued fast-paced shooters is virtually eliminated.

        However, hardware is only half the battle. Software optimization, tick rates, and network infrastructure must all evolve in tandem to truly capitalize on these hardware breakthroughs.
      `
    },
    3: { 
      title: "BUILDING THE ULTIMATE NEON GAMING STATION", 
      date: "MAR 21, 2024", 
      author: "INTERIOR_X", 
      category: "LIFESTYLE",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      content: `
        Aesthetics meet performance in the modern gaming cave. The "Neon Minimalist" movement is taking over setups worldwide, blending the high-energy vibe of cyberpunk cities with the clean lines of modern industrial design.

        The key to a perfect setup isn't just about how much RGB you can cram into a corner; it's about intentional lighting and ergonomic flow. Hidden cable management, high-contrast surface textures, and ambient light zones that react to in-game events are the new gold standard.

        Start with a dark foundation. Black textured surfaces absorb glare and make your accent colors pop. Use a primary accent color—like neon lime or electric violet—consistently across your hardware.

        Remember, your station is a reflection of your identity as a gamer. Every component should serve a purpose, both functionally and visually.
      `
    }
  };

  const post = posts[articleId as keyof typeof posts] || posts[1];

  return (
    <div className="bg-[#050505] min-h-screen pb-32">
      {/* Hero Header */}
      <header className="relative w-full h-[70vh] flex flex-col justify-end overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img src={post.img} className="w-full h-full object-cover grayscale-[0.3]" alt={post.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 px-24 pb-20 max-w-7xl mx-auto w-full">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center space-x-3 text-[#ccff00] text-xs font-black tracking-widest uppercase mb-12 hover:brightness-150 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
            <span>BACK TO ARCHIVE</span>
          </motion.button>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-6"
            >
              <span className="bg-[#ccff00] text-black px-4 py-1 text-[10px] font-black tracking-widest uppercase">{post.category}</span>
              <div className="flex items-center space-x-2 text-gray-400 text-[10px] font-black tracking-widest uppercase">
                <Clock className="w-3 h-3" />
                <span>{post.date}</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none max-w-4xl"
            >
              {post.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-4 pt-4"
            >
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#ccff00]" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">TRANSMITTED BY</div>
                <div className="text-white font-black text-sm">{post.author}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="px-6 md:px-24 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
          {/* Left: Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-2/3 bg-[#0a0a0a] border border-white/5 p-8 md:p-16 space-y-10"
          >
            <div className="prose prose-invert max-w-none">
              {post.content.trim().split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-400 text-lg leading-relaxed mb-8 font-medium">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quote Block Decoration */}
            <div className="border-l-4 border-[#ccff00] pl-8 py-4 my-12 bg-white/[0.02]">
              <p className="text-2xl font-black italic text-white uppercase tracking-tighter leading-tight">
                "The evolution of gaming technology is accelerating at an exponential rate. We aren't just playing games; we are living them."
              </p>
            </div>

            <div className="pt-12 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black text-gray-600 tracking-widest uppercase">SHARE DATA:</span>
                <div className="flex space-x-2">
                  <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                    <Facebook className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                    <Twitter className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <button className="flex items-center space-x-2 text-[#ccff00] text-[10px] font-black tracking-widest uppercase hover:brightness-150">
                <MessageSquare className="w-4 h-4" />
                <span>COMMS (12)</span>
              </button>
            </div>
          </motion.div>

          {/* Right: Sidebar Metadata */}
          <aside className="lg:w-1/3 space-y-12">
            <div className="bg-[#0a0a0a] border border-white/5 p-10 space-y-8">
               <h3 className="text-xl font-black text-white uppercase tracking-tighter">DATA LOG INFO</h3>
               <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">ENCRYPTION</span>
                    <span className="text-xs font-black text-[#ccff00]">AES-256</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">PRIORITY</span>
                    <span className="text-xs font-black text-white">LEVEL_7</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">ACCESS</span>
                    <span className="text-xs font-black text-white">PUBLIC</span>
                  </div>
               </div>
            </div>

            <div className="bg-[#ccff00] p-10 space-y-6">
              <h3 className="text-xl font-black text-black uppercase tracking-tighter">SUBSCRIBE TO FEED</h3>
              <p className="text-black/70 text-xs font-bold leading-relaxed">
                Get the latest tech transmissions directly to your neural link. No spam, just hardware.
              </p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="AGENT_EMAIL@NET.COM" 
                  className="w-full bg-black/10 border border-black/20 px-4 py-3 text-xs font-bold text-black placeholder:text-black/30 outline-none focus:border-black"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-black font-black text-[10px]">JOIN</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default BlogArticleView;
