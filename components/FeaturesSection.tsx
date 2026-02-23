
import React from 'react';
import { MapPin, Box, BoxSelect, Glasses } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <MapPin className="w-12 h-12 text-[#ccff00]" />,
      title: "LOCATION TAGGING",
      desc: "Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit eleifend donec."
    },
    {
      icon: <Box className="w-12 h-12 text-[#ccff00]" />,
      title: "CONSOLE SYSTEM",
      desc: "Justo laoreet sit amet cursus. Adipiscing commodo elit at imperdiet."
    },
    {
      icon: <BoxSelect className="w-12 h-12 text-[#ccff00]" />,
      title: "MULTI DIMENSION",
      desc: "Egestas purus viverra accumsan in. Sed sed risus pretium quam sertra ingara."
    },
    {
      icon: <Glasses className="w-12 h-12 text-[#ccff00]" />,
      title: "VR SUPPORTED",
      desc: "Scelerisque eleifend donec pretium vulputate sapien nec sagittis."
    }
  ];

  return (
    <section className="bg-black py-16 md:py-20 border-t border-b border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        {features.map((f, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col items-center text-center p-8 md:p-16 space-y-6 md:space-y-8 transition-all duration-500 hover:bg-white/[0.02]
              ${idx !== features.length - 1 ? 'lg:border-r border-white/10' : ''}
              ${idx < 2 ? 'border-b lg:border-b-0' : ''}
              group
            `}
          >
            <div className="transition-transform duration-500 group-hover:scale-110">
              {f.icon}
            </div>
            <h3 className="text-xl font-black tracking-widest text-white group-hover:text-[#ccff00] transition-colors">
              {f.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[240px]">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
