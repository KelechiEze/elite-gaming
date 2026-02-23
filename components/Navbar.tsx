
import React from 'react';
import { Menu, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onNavigate, cartCount, onOpenCart, onOpenMenu }) => {
  const navItems = ['HOME', 'ABOUT', 'MATCHES', 'SHOP', 'BLOG', 'GAME', 'CONTACT'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 h-20 bg-black/60 backdrop-blur-md border-b border-white/10">
      {/* Left Menu Icon - Always Visible as the main gateway */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onOpenMenu}
          className="p-2 hover:bg-white/10 transition-colors group flex items-center space-x-3"
          aria-label="Open Menu"
        >
          <Menu className="w-8 h-8 text-white group-hover:text-[#ccff00]" />
          <span className="hidden sm:block text-[10px] font-black tracking-widest text-white group-hover:text-[#ccff00]">MENU</span>
        </button>
      </div>

      {/* Center Links - Hidden on Mobile/Tablet (up to 1024px) */}
      <div className="hidden lg:flex items-center h-full">
        <ul className="flex items-center h-full">
          {navItems.map((item) => (
            <li 
              key={item} 
              onClick={() => onNavigate(item)}
              className={`h-full flex items-center px-6 cursor-pointer text-sm font-bold tracking-widest transition-all duration-300 border-b-2
                ${activeTab === item 
                  ? 'bg-white/10 text-[#ccff00] border-[#ccff00]' 
                  : 'text-gray-400 hover:text-white border-transparent hover:border-white/20'}
              `}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Right Side - Cart and Logo */}
      <div className="flex items-center h-full">
        <div className="flex items-center space-x-4 md:space-x-8 lg:ml-8 lg:pl-8 lg:border-l border-white/20 h-full">
          <button 
            onClick={onOpenCart}
            className="relative group p-2"
          >
            <ShoppingCart className="w-6 h-6 text-white group-hover:text-[#ccff00] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ccff00] text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-pulse shadow-[0_0_10px_#ccff00]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-1 cursor-pointer" onClick={() => onNavigate('HOME')}>
             <div className="w-7 h-7 md:w-8 md:h-8 bg-[#ccff00] rounded-sm flex items-center justify-center">
               <span className="text-black font-black text-xs">EG</span>
             </div>
             <span className="hidden md:block text-white font-bold tracking-tighter uppercase">ELITE<span className="text-[#ccff00]">GAMER</span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
