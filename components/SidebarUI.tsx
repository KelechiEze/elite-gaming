
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SidebarUIProps {
  currentIndex: number;
  total: number;
}

const SidebarUI: React.FC<SidebarUIProps> = ({ currentIndex, total }) => {
  return (
    <>
      {/* Left Vertical Indicators */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center space-y-6">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className={`text-xs font-bold transition-all duration-300 ${i === currentIndex ? 'text-[#ccff00] scale-125' : 'text-gray-500'}`}>
              0{i + 1}
            </span>
            {i < total - 1 && <div className="w-[1px] h-8 bg-white/20 my-2" />}
          </div>
        ))}
      </div>

      {/* Right Vertical Text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
        <div className="rotate-90 origin-center whitespace-nowrap">
           <span className="text-xs font-black tracking-[0.3em] text-white flex items-center space-x-2">
             <span className="text-[#ccff00]">/</span> SCROLL DOWN
           </span>
        </div>
        <div className="mt-32 animate-bounce">
          <ChevronDown className="w-6 h-6 text-[#ccff00]" />
        </div>
      </div>
    </>
  );
};

export default SidebarUI;
