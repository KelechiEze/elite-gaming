
import React from 'react';
import { Twitter, Facebook, Disc, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onNotify: (msg: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onNotify }) => {
  const sections = [
    {
      title: "MISCELLANEOUS",
      links: [
        { name: "Charity Events", tab: "HOME" },
        { name: "FAQs", tab: "CONTACT" },
        { name: "License", tab: "ABOUT" },
        { name: "Tech Tips", tab: "BLOG" },
        { name: "Contact Us", tab: "CONTACT" }
      ]
    },
    {
      title: "UTILITY PAGES",
      links: [
        { name: "Terms of Service", tab: "ABOUT" },
        { name: "Privacy/Terms", tab: "ABOUT" },
        { name: "Gift Cards", tab: "SHOP" },
        { name: "Game Reviews", tab: "BLOG" },
        { name: "Subscriptions", tab: "SHOP" }
      ]
    },
    {
      title: "USEFUL LINKS",
      links: [
        { name: "Home", tab: "HOME" },
        { name: "About Us", tab: "ABOUT" },
        { name: "Advertising", tab: "CONTACT" },
        { name: "Legal Notices", tab: "ABOUT" },
        { name: "Partnership", tab: "CONTACT" }
      ]
    }
  ];

  const handleJoinNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    onNotify('NEWSLETTER FREQUENCY SYNCHRONIZED');
  };

  return (
    <footer className="bg-[#050505] pt-20 md:pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-24">
        
        {sections.map((s, i) => (
          <div key={i} className="space-y-6 md:space-y-8">
            <h4 className="text-white font-black tracking-widest text-xs md:text-sm uppercase">{s.title}</h4>
            <ul className="space-y-3 md:space-y-4">
              {s.links.map((link, j) => (
                <li key={j}>
                  <button 
                    onClick={() => onNavigate(link.tab)}
                    className="text-gray-500 hover:text-[#ccff00] text-xs md:text-sm font-bold transition-colors uppercase text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Brand Column */}
        <div className="space-y-8 lg:text-right flex flex-col lg:items-end">
          <div className="flex items-center space-x-4">
             <div className="flex flex-col items-center">
                <div className="flex space-x-1 items-center mb-1">
                   <div className="w-1 h-1 bg-[#ccff00]" />
                   <div className="w-6 h-[2px] bg-[#ccff00]" />
                   <div className="w-1 h-1 bg-[#ccff00]" />
                </div>
                <div className="w-12 h-7 md:w-14 md:h-8 border-2 border-[#ccff00] rounded-lg flex items-center justify-center relative">
                   <div className="w-8 h-2 md:w-10 md:h-3 bg-[#ccff00] rounded-full flex items-center justify-around px-2">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full" />
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full" />
                   </div>
                   <div className="absolute -bottom-2 w-3 md:w-4 h-2 border-x-2 border-b-2 border-[#ccff00]" />
                </div>
             </div>
             <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">ApexX</h3>
          </div>
          
          <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed lg:text-right max-w-sm uppercase">
            Elite Gaming Hub provided proprietary infrastructure for the 2024 season. Encrypted by APEX Sentinel.
          </p>

          <form onSubmit={handleJoinNewsletter} className="flex flex-wrap gap-2 mt-6">
            <button className="flex items-center space-x-2 bg-[#0a0a0a] border border-white/10 px-3 md:px-4 py-2 hover:bg-white/5 transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-5 h-5 md:w-6 md:h-6 invert" alt="Apple" />
              <div className="text-left">
                <div className="text-[6px] md:text-[8px] text-gray-500 uppercase">Get it on</div>
                <div className="text-[10px] md:text-xs font-bold text-white uppercase">App Store</div>
              </div>
            </button>
            <button className="flex items-center space-x-2 bg-[#0a0a0a] border border-white/10 px-3 md:px-4 py-2 hover:bg-white/5 transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Play_Store_badge_EN.svg" className="w-5 h-5 md:w-6 md:h-6" alt="Play Store" />
              <div className="text-left">
                <div className="text-[6px] md:text-[8px] text-gray-500 uppercase">Get it on</div>
                <div className="text-[10px] md:text-xs font-bold text-white uppercase">Play Store</div>
              </div>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex space-x-4">
          {[Twitter, Facebook, Disc, MessageCircle, Instagram].map((Icon, i) => (
            <a 
              key={i} 
              href="#" 
              onClick={(e) => { e.preventDefault(); onNotify('LINKING TO SOCIAL_DECK...'); }}
              className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-all group"
            >
              <Icon className="w-4 h-4 text-gray-500 group-hover:text-black" />
            </a>
          ))}
        </div>

        <div className="text-gray-600 text-[8px] md:text-[10px] font-black tracking-widest uppercase text-center">
          ApexX Protocol // Established 2024 ©
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <button onClick={() => onNavigate('ABOUT')} className="text-gray-500 hover:text-white text-[8px] md:text-[10px] font-bold tracking-widest uppercase">Terms & Conditions</button>
          <button onClick={() => onNavigate('ABOUT')} className="text-gray-500 hover:text-white text-[8px] md:text-[10px] font-bold tracking-widest uppercase">Privacy policy</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
