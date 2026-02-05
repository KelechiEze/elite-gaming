
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle, AlertTriangle } from 'lucide-react';
import { Notification } from '../App';

interface SystemNotificationProps {
  notifications: Notification[];
}

const SystemNotification: React.FC<SystemNotificationProps> = ({ notifications }) => {
  return (
    <div className="fixed top-24 right-12 z-[1000] flex flex-col space-y-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map(n => (
          <motion.div
            key={n.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className={`flex items-center space-x-4 p-4 min-w-[300px] border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden
              ${n.type === 'SUCCESS' ? 'bg-[#ccff00]/10 border-[#ccff00]/30' : 'bg-black/80'}
            `}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
            
            <div className={`p-2 border ${n.type === 'SUCCESS' ? 'border-[#ccff00] text-[#ccff00]' : 'border-white/20 text-white'}`}>
               {n.type === 'SUCCESS' ? <CheckCircle className="w-4 h-4" /> : n.type === 'ERROR' ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <Terminal className="w-4 h-4" />}
            </div>

            <div className="flex-1">
               <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">System Feed // {n.type}</div>
               <div className="text-xs font-black text-white uppercase tracking-tighter">{n.message}</div>
            </div>

            {/* Progress line */}
            <motion.div 
              initial={{ width: '100%' }}
              animate={{ width: 0 }}
              transition={{ duration: 4, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-[2px] ${n.type === 'SUCCESS' ? 'bg-[#ccff00]' : 'bg-white/40'}`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SystemNotification;
