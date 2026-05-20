import { Flame, Clock, ShieldAlert, Sparkles, Check, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data';

interface ServicesViewProps {
  setTab: (tab: string) => void;
  setSelectedService: (service: string) => void;
}

export default function ServicesView({ setTab, setSelectedService }: ServicesViewProps) {
  
  const handleBookingRedirect = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full relative select-none">
      
      {/* HEADER SECTION */}
      <section className="relative py-20 bg-black border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/perfect_finish_1779289609638.png" 
            alt="Gloss mirror ceramic coat car header" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
          <span className="text-[#39ff14] font-mono text-xs tracking-[0.34em] uppercase font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10">
            🩸 LOCK IN YOUR SPECIFICATION
          </span>
          <h2 className="text-4xl sm:text-6xl font-horror tracking-wider text-white select-none text-dripping uppercase mt-4">
            Services & Pricing
          </h2>
          <p className="max-w-xl text-gray-400 font-sans text-sm sm:text-base leading-relaxed mt-2">
            Meticulously scoped out detailing procedures. Uncompromised chemical bonds, sanitations, and gloss compounding levelers tailored for East Texas machines.
          </p>
        </div>
      </section>

      {/* DETAILED SERVICES GRID */}
      <section className="py-24 bg-zinc-950 splatter-bkg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl glass-card border border-white/5 relative hover:border-[#39ff14]/30 transition-all duration-300 shadow-2xl overflow-hidden pulse-border-green"
              >
                {/* Image layout */}
                <div className="w-full sm:w-1/3 h-52 sm:h-auto overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-90 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/80 sm:to-black/30" />
                  <div className="absolute top-4 left-4 bg-black/80 border border-[#ff5f1f]/30 px-3 py-1 font-mono text-xs text-[#ff5f1f] rounded">
                    {service.duration}
                  </div>
                </div>

                {/* Content layout */}
                <div className="p-6 sm:p-8 w-full sm:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-horror text-white tracking-widest uppercase group-hover:text-[#39ff14] transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-xl font-mono font-black text-[#39ff14]">
                        {service.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="flex flex-col gap-2 mb-8">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-wider flex items-center gap-1">
                        <Flame size={10} className="text-[#ff5f1f] animate-pulse" /> PROCEDURES INCLUDED:
                      </span>
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                          <Check size={12} className="text-[#39ff14] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      Code: {service.slug}
                    </span>
                    <button 
                      onClick={() => handleBookingRedirect(service.title)}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#ff5f1f] to-[#d90429] hover:from-[#39ff14] hover:to-emerald-600 text-white hover:text-black font-mono font-bold uppercase tracking-wider text-xs transition-all hover:scale-105 rounded shadow-[0_0_10px_rgba(255,100,0,0.2)] flex items-center gap-1.5"
                    >
                      Book Now <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* THE GUARANTEE AND DISCLAIMER */}
      <section className="py-24 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center glass-card border border-white/5 rounded-2xl p-8 sm:p-12 relative">
          <ShieldAlert className="text-[#ff5f1f] mx-auto mb-4 animate-bounce" size={32} />
          <h3 className="text-2xl font-horror text-white tracking-widest uppercase mb-4">
            The Boyz Iron-Clad Oath
          </h3>
          <p className="text-sm text-gray-300 font-sans leading-relaxed max-w-2xl mx-auto mb-6">
            We operate under extreme strict automotive precision safeguards. If you notice a single speck, fiber or swirl streak that we promised to eliminate upon walking panels at hand-off, we will deploy our mobile unit and re-service the area immediately, absolutely free of charge. No questions asked.
          </p>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
            🔒 Fully Insured • Under-writing Guaranteed • Local Texas Pride
          </span>
        </div>
      </section>

    </div>
  );
}
