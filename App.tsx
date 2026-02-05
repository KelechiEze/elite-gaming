
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutHero from './components/AboutHero';
import AboutPhilosophy from './components/AboutPhilosophy';
import AboutTechEngine from './components/AboutTechEngine';
import AboutEvolution from './components/AboutEvolution';
import TechnicalSection from './components/TechnicalSection';
import InstagramSection from './components/InstagramSection';
import MatchesListingHero from './components/MatchesListingHero';
import MatchesSection from './components/MatchesSection';
import ShopHero from './components/ShopHero';
import ShopFeatured from './components/ShopFeatured';
import ShopGrid from './components/ShopGrid';
import ShopSpecs from './components/ShopSpecs';
import ShopBundles from './components/ShopBundles';
import BlogHero from './components/BlogHero';
import BlogList from './components/BlogList';
import BlogArticleView from './components/BlogArticleView';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CartDrawer from './components/CartDrawer';
import QuantityModal from './components/modals/QuantityModal';
import PreviewModal from './components/modals/PreviewModal';
import CheckoutModal from './components/modals/CheckoutModal';
import VideoModal from './components/modals/VideoModal';
import MenuOverlay from './components/MenuOverlay';
import SystemNotification from './components/SystemNotification';
import { AnimatePresence, motion } from 'framer-motion';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'SUCCESS' | 'ALERT' | 'ERROR';
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('HOME');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  // Shop State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<any>(null); 
  const [previewProduct, setPreviewProduct] = useState<any>(null); 
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Global Functionality State
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const addNotification = (message: string, type: 'SUCCESS' | 'ALERT' | 'ERROR' = 'ALERT') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    setSelectedArticleId(null);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadArticle = (articleId: number) => {
    setSelectedArticleId(articleId);
    setActiveTab('ARTICLE');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: any, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      const price = typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price;
      return [...prev, { ...product, quantity, price }];
    });
    setPendingProduct(null);
    addNotification(`${product.name} ADDED TO ARMORY`, 'SUCCESS');
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
    addNotification('ITEM DEPLOYMENT CANCELED', 'ALERT');
  };

  return (
    <div className="relative w-full bg-[#050505] selection:bg-[#ccff00] selection:text-black min-h-screen">
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar 
        activeTab={activeTab === 'ARTICLE' ? 'BLOG' : activeTab} 
        onNavigate={handleNavigate} 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
      />
      
      <div className="fixed top-0 left-[60px] w-[1px] h-full bg-white/10 z-10 pointer-events-none" />
      <div className="fixed top-0 right-[60px] w-[1px] h-full bg-white/10 z-10 pointer-events-none" />

      <main className="relative z-20 pt-20">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <section className="h-[calc(100vh-80px)] w-full relative">
                <HeroCarousel onWatchTrailer={() => setIsVideoOpen(true)} />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-[5]" />
              </section>
              <StatsSection />
              <FeaturesSection />
              <TestimonialsSection />
              <TechnicalSection onNavigate={handleNavigate} />
              <InstagramSection onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
            </motion.div>
          )}

          {activeTab === 'ABOUT' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <AboutHero />
              <AboutPhilosophy />
              <AboutTechEngine onNotify={(msg) => addNotification(msg, 'ALERT')} />
              <AboutEvolution />
              <InstagramSection onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
            </motion.div>
          )}

          {activeTab === 'MATCHES' && (
            <motion.div key="matches" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <MatchesListingHero />
              <MatchesSection onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
              <TeamSection />
              <InstagramSection onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
            </motion.div>
          )}

          {activeTab === 'SHOP' && (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ShopHero />
              <ShopFeatured onPreOrder={(p) => setPendingProduct(p)} />
              <ShopGrid onAddToCart={(p) => setPendingProduct(p)} onPreview={(p) => setPreviewProduct(p)} />
              <ShopSpecs />
              <ShopBundles onBundleSelect={(p) => setPendingProduct(p)} />
              <InstagramSection onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
            </motion.div>
          )}

          {activeTab === 'BLOG' && (
            <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <BlogHero />
              <BlogList onReadArticle={handleReadArticle} onNotify={(msg) => addNotification(msg, 'ALERT')} />
              <InstagramSection onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
            </motion.div>
          )}

          {activeTab === 'ARTICLE' && selectedArticleId !== null && (
            <motion.div key="article-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <BlogArticleView articleId={selectedArticleId} onBack={() => handleNavigate('BLOG')} onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
              <InstagramSection onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
            </motion.div>
          )}

          {activeTab === 'CONTACT' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <ContactHero />
              <ContactForm onSubmit={() => addNotification('TRANSMISSION SUCCESSFUL', 'SUCCESS')} />
              <InstagramSection onNotify={(msg) => addNotification(msg, 'SUCCESS')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer onNavigate={handleNavigate} onNotify={(msg) => addNotification(msg, 'SUCCESS')} />

      {/* Notifications */}
      <SystemNotification notifications={notifications} />

      {/* Overlays */}
      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay 
            activeTab={activeTab} 
            onNavigate={handleNavigate} 
            onClose={() => setIsMenuOpen(false)} 
          />
        )}
        {isVideoOpen && (
          <VideoModal onClose={() => setIsVideoOpen(false)} />
        )}
        {isCartOpen && (
          <CartDrawer 
            items={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart} 
            onCheckout={() => {
              if (cart.length === 0) {
                addNotification('ARMORY EMPTY: CANNOT PROCEED', 'ERROR');
                return;
              }
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }} 
          />
        )}
        {pendingProduct && (
          <QuantityModal 
            product={pendingProduct} 
            onConfirm={(q) => addToCart(pendingProduct, q)} 
            onClose={() => setPendingProduct(null)} 
          />
        )}
        {previewProduct && (
          <PreviewModal 
            product={previewProduct} 
            onClose={() => setPreviewProduct(null)} 
            onAddToCart={(p) => {
              setPreviewProduct(null);
              setPendingProduct(p);
            }}
          />
        )}
        {isCheckoutOpen && (
          <CheckoutModal 
            cart={cart}
            onClose={() => setIsCheckoutOpen(false)}
            onSuccess={() => {
              setCart([]);
              setIsCheckoutOpen(false);
              addNotification('ORDER CONFIRMED. NEURAL TRANSMISSION COMPLETE.', 'SUCCESS');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
