
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';

interface ShopGridProps {
  onAddToCart: (product: any) => void;
  onPreview: (product: any) => void;
}

const ShopGrid: React.FC<ShopGridProps> = ({ onAddToCart, onPreview }) => {
  const products = [
    { id: 1, name: "APEX SENSOR X-1", category: "MICE", price: "$129.99", img: "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?q=80&w=800&auto=format&fit=crop", desc: "Highest precision optical sensor available in the consumer market, tuned for e-sports." },
    { id: 2, name: "NEON-MECH V4", category: "KEYBOARDS", price: "$249.00", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop", desc: "Mechanical switches with zero-debounce technology and per-key RGB lighting." },
    { id: 3, name: "CRYSTAL AUDIO PRO", category: "HEADSETS", price: "$189.50", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop", desc: "Studio-grade spatial audio with noise-canceling beamforming microphone." },
    { id: 4, name: "LATENCY-ZERO PAD", category: "ACCESSORIES", price: "$45.00", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop", desc: "Frictionless glass-infused surface for consistent tracking in high-speed matches." },
    { id: 5, name: "VIRTUAL SIGHT G2", category: "VR GEAR", price: "$599.99", img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop", desc: "4K per-eye resolution with ultra-wide 130-degree field of vision." },
    { id: 6, name: "CORE-MESH CHAIR", category: "FURNITURE", price: "$350.00", img: "https://images.unsplash.com/photo-1614377284368-a6d4f911edc7?q=80&w=800&auto=format&fit=crop", desc: "Ergonomic cooling mesh with adjustable lumbar support for long sessions." }
  ];

  return (
    <section className="bg-black py-32 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#ccff00]" />
              <div className="w-6 h-[2px] bg-[#ccff00]" />
              <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Inventory</span>
            </div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase">LATEST HARDWARE</h2>
          </div>
          <div className="flex space-x-4">
             {['ALL', 'GEAR', 'TECH', 'STYLE'].map(f => (
               <button key={f} className="text-[10px] font-black tracking-widest text-gray-500 hover:text-[#ccff00] transition-colors">{f}</button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, idx) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group border border-white/5 bg-[#050505] p-6 hover:border-[#ccff00]/30 transition-all duration-500"
            >
              <div className="aspect-square relative overflow-hidden mb-8 bg-[#0a0a0a]">
                <img 
                  src={p.img} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  alt={p.name}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                   <button 
                    onClick={() => onAddToCart(p)}
                    className="w-12 h-12 bg-[#ccff00] text-black flex items-center justify-center hover:scale-110 transition-transform active:scale-90"
                   >
                    <ShoppingCart className="w-5 h-5" />
                   </button>
                   <button 
                    onClick={() => onPreview(p)}
                    className="w-12 h-12 bg-white text-black flex items-center justify-center hover:scale-110 transition-transform active:scale-90"
                   >
                    <Eye className="w-5 h-5" />
                   </button>
                </div>
                <div className="absolute top-4 left-4 text-[8px] font-black text-white bg-black/80 px-2 py-1 tracking-widest border border-white/10 uppercase">{p.category}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-white tracking-tighter group-hover:text-[#ccff00] transition-colors uppercase">{p.name}</h3>
                  <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Available in Stock</div>
                </div>
                <span className="text-xl font-black text-[#ccff00] italic tracking-tighter">{p.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopGrid;
