import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ServicesView from './components/ServicesView';
import BookingView from './components/BookingView';
import ContactView from './components/ContactView';
import AdminDashboard from './components/AdminDashboard';
import { Skull } from 'lucide-react';

export default function App() {
  const [currentTab, setTab] = useState<'home' | 'about' | 'services' | 'booking' | 'contact' | 'admin'>('home');
  const [selectedService, setSelectedService] = useState<string>('');
  const [initialLoading, setInitialLoading] = useState(true);

  // Custom cool loading transition simulating a car engine startup
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1800); // 1.8 seconds loading screen
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] select-none text-center">
        {/* Glow pulsing ring */}
        <div className="relative flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border border-[#39ff14]/30 flex items-center justify-center relative animate-pulse shadow-[0_0_30px_rgba(57,255,20,0.2)]">
            <Skull size={45} className="text-[#39ff14] animate-bounce" />
            <div className="absolute inset-0 border-t-2 border-[#ff5f1f] rounded-full animate-spin duration-1000" />
          </div>
          <h2 className="text-3xl font-horror tracking-widest text-[#ff5f1f] text-dripping uppercase mt-8 animate-pulse">
            Texas Boyz Detailing
          </h2>
          <span className="text-[10px] sm:text-xs text-zinc-500 font-mono tracking-[0.4em] uppercase mt-2">
            Revving Engine Logs...
          </span>
        </div>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView setTab={setTab as any} setSelectedService={setSelectedService} />;
      case 'about':
        return <AboutView />;
      case 'services':
        return <ServicesView setTab={setTab as any} setSelectedService={setSelectedService} />;
      case 'booking':
        return (
          <BookingView 
            selectedService={selectedService} 
            setSelectedService={setSelectedService} 
            setTab={setTab as any} 
          />
        );
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomeView setTab={setTab as any} setSelectedService={setSelectedService} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col justify-between selection:bg-[#39ff14]/30 selection:text-[#39ff14] relative">
      <CustomCursor />
      
      {/* Decorative bats header fog edge */}
      <div className="w-full">
        <NavBar currentTab={currentTab} setTab={setTab as any} />
        
        {/* Main active layout */}
        <main className="flex-grow">
          {renderActiveView()}
        </main>
      </div>

      <Footer setTab={setTab as any} />
    </div>
  );
}
