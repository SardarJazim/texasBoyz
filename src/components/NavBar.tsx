import { useState } from 'react';
import { Menu, X, Phone, Skull, ShieldCheck } from 'lucide-react';

interface NavBarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function NavBar({ currentTab, setTab }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Boyz' },
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Book Appointment' },
    { id: 'contact', label: 'Contact Crew' },
    { id: 'admin', label: 'Crew Backstage', icon: ShieldCheck, isSecret: true }
  ];

  const handleNavClick = (tabId: string) => {
    setTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/85 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Design */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-zinc-900 rounded-lg pulse-border-green border border-[#39ff14]/30">
              <span className="text-[#39ff14] text-xl font-bold font-horror animate-pulse flex items-center justify-center">
                <Skull size={22} className="group-hover:text-[#ff5f1f] text-[#39ff14] transition-colors" />
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-horror tracking-wide text-white group-hover:text-[#39ff14] transition-colors leading-none flex items-center gap-1">
                TEXAS BOYZ
              </h1>
              <span className="text-[9px] font-mono tracking-widest text-[#ff5f1f] font-bold uppercase leading-none mt-0.5">
                Detailing • Longview, TX
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.filter(item => !item.isSecret).map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md tracking-wider uppercase font-sans transition-all duration-300 relative ${
                    isActive 
                      ? 'text-[#39ff14] bg-white/5 border-b-2 border-[#39ff14]' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#39ff14] shadow-[0_0_8px_#39ff14]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call CTA and Hidden/Secret Admin Access */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Simple subtle Crew Backstage shortcut */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-md hover:bg-white/5 transition-colors group ${
                currentTab === 'admin' ? 'text-[#39ff14]' : 'text-zinc-600 hover:text-zinc-400'
              }`}
              title="Crew Backstage Admin Panel"
            >
              <ShieldCheck size={18} className="group-hover:animate-bounce" />
            </button>

            <a 
              href="tel:903-374-5563"
              className="flex items-center gap-2 bg-[#ff5f1f]/10 hover:bg-[#ff5f1f]/20 text-[#ff5f1f] border border-[#ff5f1f]/40 px-4 py-2 rounded-md font-mono text-sm uppercase tracking-wider font-bold transition-all hover:scale-105 shadow-[0_0_10px_rgba(255,95,31,0.2)]"
            >
              <Phone size={14} className="animate-pulse" />
              903-374-5563
            </a>
          </div>

          {/* Mobile Hamburguer Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-1.5 rounded hover:bg-white/5 transition-colors ${
                currentTab === 'admin' ? 'text-[#39ff14]' : 'text-zinc-700'
              }`}
            >
              <ShieldCheck size={18} />
            </button>

            <a 
              href="tel:903-374-5563"
              className="p-2 text-[#ff5f1f] bg-zinc-900 border border-[#ff5f1f]/30 rounded-md"
              title="Call Us"
            >
              <Phone size={16} />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={26} className="text-[#39ff14]" /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-black/95 py-4 px-6 absolute left-0 right-0 shadow-3xl flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-3 px-4 rounded-lg text-left text-sm font-semibold tracking-widest uppercase font-sans flex items-center justify-between transition-all ${
                  isActive 
                    ? 'text-[#39ff14] bg-[#39ff14]/10 border-l-4 border-[#39ff14]' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon && <item.icon size={16} className="text-[#ff5f1f]" />}
                  {item.label}
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-ping" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
