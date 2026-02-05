
import React from 'react';
import { motion } from 'framer-motion';
import { X, PlayCircle } from 'lucide-react';

interface VideoModalProps {
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200] p-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-6xl aspect-video bg-black shadow-2xl overflow-hidden group border border-white/10"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-[#ccff00] hover:text-black transition-all">
           <X className="w-6 h-6" />
        </button>

        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
          <PlayCircle className="w-32 h-32 text-[#ccff00] opacity-50 animate-pulse" />
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">TRAILER TRANSMISSION</h3>
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.5em] uppercase">LINKING TO NEURAL FEED...</p>
          </div>
          <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
             <motion.div 
               initial={{ x: '-100%' }}
               animate={{ x: '100%' }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 bg-[#ccff00]"
             />
          </div>
        </div>

        {/* This would normally be an iframe or video tag */}
        <div className="absolute inset-0 pointer-events-none border-[20px] border-black opacity-30" />
      </motion.div>
    </div>
  );
};

export default VideoModal;
