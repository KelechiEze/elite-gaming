
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Loader2 } from 'lucide-react';

interface ContactFormProps {
  onSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit();
    }, 2000);
  };

  return (
    <section className="bg-[#050505] py-32 px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Info Column */}
        <div className="space-y-16">
          <div className="space-y-6">
             <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#ccff00]" />
                <div className="w-6 h-[2px] bg-[#ccff00]" />
                <span className="text-[#ccff00] text-xs font-black tracking-widest uppercase">Support Network</span>
             </div>
             <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">NEED DIRECT<br />ASSISTANCE?</h2>
             <p className="text-gray-500 max-w-sm">
                Our team of technicians and community managers are online 24/7 to ensure your gaming experience remains uninterrupted.
             </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-6 group">
               <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-black transition-all">
                  <MapPin className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Global Base</div>
                  <div className="text-white font-black uppercase tracking-tighter">77 Tech Square, Neo Tokyo</div>
               </div>
            </div>
            <div className="flex items-center space-x-6 group">
               <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-black transition-all">
                  <Phone className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Direct Comms</div>
                  <div className="text-white font-black uppercase tracking-tighter">+88 900 123 4567</div>
               </div>
            </div>
            <div className="flex items-center space-x-6 group">
               <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-[#ccff00] group-hover:text-black transition-all">
                  <Mail className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Data Inquiry</div>
                  <div className="text-white font-black uppercase tracking-tighter">support@apexx.games</div>
               </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-[#0a0a0a] border border-white/5 p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#ccff00]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Agent Name</label>
                  <input required type="text" className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white font-bold outline-none focus:border-[#ccff00] transition-colors" placeholder="YOUR NAME" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Secure Email</label>
                  <input required type="email" className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white font-bold outline-none focus:border-[#ccff00] transition-colors" placeholder="EMAIL@DOMAIN.COM" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Subject Type</label>
               <select className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white font-bold outline-none focus:border-[#ccff00] transition-colors appearance-none">
                  <option>TECHNICAL SUPPORT</option>
                  <option>PARTNERSHIP INQUIRY</option>
                  <option>GENERAL FEEDBACK</option>
               </select>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Encrypted Message</label>
               <textarea required rows={6} className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white font-bold outline-none focus:border-[#ccff00] transition-colors resize-none" placeholder="TRANSMIT YOUR MESSAGE..."></textarea>
            </div>
            
            <button 
              disabled={isSubmitting}
              className="w-full bg-[#ccff00] text-black py-5 font-black tracking-[0.5em] uppercase flex items-center justify-center space-x-3 hover:brightness-110 transition-all group disabled:opacity-50"
            >
               {isSubmitting ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                 <>
                   <span>SEND TRANSMISSION</span>
                   <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                 </>
               )}
            </button>
          </form>

          <div className="mt-8 flex justify-between items-center text-[8px] font-black text-gray-700 tracking-widest uppercase">
             <span>SYS_CONTACT_v2.1</span>
             <span>ENCRYPTION_ACTIVE: YES</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactForm;
