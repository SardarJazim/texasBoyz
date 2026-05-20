import { useEffect, useState } from 'react';
import { Sparkles, Calendar, ArrowRight, Star, Quote, Shield, CheckCircle, Smartphone } from 'lucide-react';
import { SERVICES, STATS, BEFORE_AFTER_GALLERY, TESTIMONIALS } from '../data';
import BeforeAfterSlider from './BeforeAfterSlider';

interface HomeViewProps {
  setTab: (tab: string) => void;
  setSelectedService: (service: string) => void;
}

export default function HomeView({ setTab, setSelectedService }: HomeViewProps) {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  // Count animations inside statistics
  useEffect(() => {
    const duration = 2000; // ms
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounts(
        STATS.map((stat) => {
          const progress = currentStep / steps;
          const currentCount = Math.floor(stat.count * progress);
          return currentCount > stat.count ? stat.count : currentCount;
        })
      );

      if (currentStep >= steps) {
        clearInterval(timer);
        // Make sure it locks onto actual targets
        setCounts(STATS.map((stat) => stat.count));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Automatic review carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleBookNow = (serviceName: string) => {
    setSelectedService(serviceName);
    setTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full relative select-none">
      
      {/* 1. HERO SECTION WITH SPOOKY BACKGROUND & FLOATING BATS */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Underlay Image with absolute absolute path and CSS overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/hero_car_1779289581322.png" 
            alt="Texas Boyz Detailing Custom Hot Rod Hero" 
            className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_90%)" />
        </div>

        {/* Floating Bats CSS layer */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Animated Bats floating around */}
          <div className="absolute top-1/4 left-10 text-zinc-500 animate-bat opacity-40 text-4xl select-none">🦇</div>
          <div className="absolute top-1/3 right-1/4 text-zinc-500 animate-bat opacity-30 text-5xl select-none" style={{ animationDelay: '1.5s' }}>🦇</div>
          <div className="absolute bottom-1/4 left-1/3 text-zinc-500 animate-bat opacity-20 text-3xl select-none" style={{ animationDelay: '3s' }}>🦇</div>
          <div className="absolute top-12 right-12 text-zinc-500 animate-bat opacity-50 text-2xl select-none" style={{ animationDelay: '0.5s' }}>🦇</div>
        </div>

        {/* Dynamic Fog Drifting Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute inset-0 fog-layer-1" />
          <div className="absolute inset-0 fog-layer-2" />
        </div>

        {/* Hero Content Panel */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20 flex flex-col items-center">
          
          {/* Evil Skull glowing emblem */}
          <div className="relative w-28 h-28 mb-6 flex items-center justify-center bg-black/80 rounded-full border border-[#39ff14]/3 w-28 h-28 hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(57,255,20,0.2)]">
            <span className="text-6xl text-[#39ff14] animate-pulse">💀</span>
            <div className="absolute -top-1 -right-1 text-2xl animate-bounce">🎃</div>
          </div>

          <h2 className="text-gray-400 font-mono text-xs sm:text-sm tracking-[0.4em] uppercase font-bold text-[#ff5f1f] bg-black/60 px-4 py-1.5 rounded-full border border-[#ff5f1f]/20 mb-4 animate-fade-in">
            LONGVIEW'S ULTIMATE RESURRECTION RADAR
          </h2>

          <h3 className="text-4xl sm:text-6xl md:text-7xl font-horror tracking-wider text-white select-none text-dripping uppercase mb-6 leading-none">
            Premium Auto Detailing <br />
            <span className="text-[#39ff14]">in Longview, TX</span>
          </h3>

          <p className="max-w-2xl text-base sm:text-lg text-gray-300 font-sans tracking-wide leading-relaxed mb-10">
            Dripping with aggression, fueled by precision. We pull your vehicle out of the dirt grave with intense ceramic coatings, flawless clear coat correction, and meticulous deep cabin sterilizations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
            <button 
              onClick={() => { setTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-gradient-to-r from-[#ff5f1f] to-[#d90429] text-white font-mono font-bold uppercase tracking-wider text-sm transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,95,31,0.5)] flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              Book Appointment
            </button>
            <button 
              onClick={() => { setTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-zinc-950 text-white border border-zinc-800 font-mono font-bold uppercase tracking-wider text-sm transition-all hover:border-[#39ff14] hover:bg-zinc-90 w-full sm:w-auto text-center flex items-center justify-center gap-2 group"
            >
              View Services
              <ArrowRight size={16} className="text-[#39ff14] group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Lower dripping background paint SVG placeholder */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-black py-12 border-y border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center p-4 glass-card rounded-xl border border-white/5 shadow-lg relative group">
                <span className="text-3xl sm:text-4xl md:text-5xl font-horror text-[#39ff14] tracking-wider mb-2 select-none">
                  {counts[idx]}
                  {stat.suffix}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-mono tracking-wider uppercase font-medium">
                  {stat.label}
                </span>
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#ff5f1f] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_8px_#ff5f1f]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE CORE SHOWCASE */}
      <section className="py-24 bg-zinc-950 splatter-bkg relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#39ff14] font-mono text-xs tracking-[0.34em] uppercase font-bold">
              ⚔️ HEAVY-DUTY AUTO RESSURECTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-horror tracking-wider text-white select-none uppercase mt-3 mb-4 text-dripping-orange">
              Core Car Detailing Armour
            </h2>
            <p className="text-gray-400 font-sans">
              Choose your weapon. From liquid glass ceramic wraps protecting against acid long-term, to inside cabin restorations that erase months of hard usage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 5).map((service) => (
              <div 
                key={service.id} 
                className="group flex flex-col justify-between overflow-hidden rounded-xl glass-card border border-white/5 relative hover:-translate-y-2 transition-transform duration-300 pulse-border-green"
              >
                {/* Image panel */}
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-90 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
                  <div className="absolute top-4 right-4 bg-black/80 border border-[#39ff14]/40 px-3 py-1 text-sm font-mono font-bold text-[#39ff14] rounded">
                    {service.price}
                  </div>
                </div>

                {/* Content Panel */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-horror text-white tracking-widest uppercase group-hover:text-[#39ff14] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-sans mb-4">
                      {service.description.slice(0, 115)}...
                    </p>
                    <div className="flex flex-col gap-1.5 mb-6">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Resurrection Specs:</span>
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                          <span className="text-[#ff5f1f]">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs font-mono text-zinc-500">
                      ⏱️ {service.duration}
                    </span>
                    <button 
                      onClick={() => handleBookNow(service.title)}
                      className="px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider rounded border border-[#39ff14]/30 text-[#39ff14] group-hover:bg-[#39ff14] group-hover:text-black transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Sticky Mobile Detailer Banner Card */}
            <div className="rounded-xl glass-card border border-[#ff5f1f]/30 p-8 flex flex-col justify-between relative overflow-hidden pulse-border-orange">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#ff5f1f]/5 blur-3xl" />
              <div>
                <div className="text-2xl mb-4">🚐</div>
                <h3 className="text-2xl font-horror text-white tracking-widest uppercase mb-3 text-[#ff5f1f]">
                  We Come To You!
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-sans mb-6">
                  Can't escape the office or free up your weekend? No sweat. The Texas Boyz mobile detailing unit is completely self-powered, carrying pure spot-free water and heavy rigs directly to your driveway in Longview, Gladewater, Kilgore & surrounding sectors.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle size={14} className="text-[#39ff14] shrink-0" />
                    <span>Pure Deionised Water Storage</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle size={14} className="text-[#39ff14] shrink-0" />
                    <span>Quiet Pro-Generator Power</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle size={14} className="text-[#39ff14] shrink-0" />
                    <span>Onboard Multi-stage Extraction Rigs</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleBookNow('Mobile Detailing')}
                className="mt-8 py-3 w-full bg-[#ff5f1f]/15 hover:bg-[#ff5f1f] text-white border border-[#ff5f1f]/40 hover:text-black font-mono font-bold uppercase tracking-wider text-xs transition-colors rounded"
              >
                Harlan Mobile Service
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. BEFORE / AFTER COMPARISON SECTION */}
      <section className="bg-black py-24 border-t border-white/5 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#39ff14] font-mono text-xs tracking-[0.34em] uppercase font-bold">
              🔍 EXPECT PROVEN RESURRECTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-horror tracking-wider text-white select-none uppercase mt-2 mb-4 text-dripping">
              Swirl & Grime Eradication
            </h2>
            <p className="text-gray-400 font-sans">
              Drag the glowing center sliders to see exactly how our correction units remove paint oxidation halos and mud graveyard buildup. Real unfiltered results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {BEFORE_AFTER_GALLERY.map((item) => (
              <BeforeAfterSlider 
                key={item.id}
                beforeImage={item.before}
                afterImage={item.after}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5. ROAD TESTIMONIALS SLIDER */}
      <section className="bg-zinc-950 py-24 relative z-20 splatter-bkg border-t border-white/5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          <div className="absolute top-0 left-10 text-9xl text-[#39ff14]/5 select-none font-horror">“</div>
          
          <span className="text-[#ff5f1f] font-mono text-xs tracking-[0.3em] uppercase font-bold">
            📢 CREW REVIEWS
          </span>
          <h2 className="text-3xl sm:text-5xl font-horror tracking-wider text-white select-none uppercase mt-3 mb-12 text-dripping-orange">
            What East Texas is Saying
          </h2>

          <div className="glass-card border border-white/5 rounded-2xl p-8 sm:p-12 relative shadow-2xl pulse-border-green">
            <div className="flex justify-center gap-1.5 mb-6">
              {[...Array(TESTIMONIALS[activeReviewIndex].stars)].map((_, i) => (
                <Star key={i} size={20} className="text-[#39ff14] fill-[#39ff14] animate-pulse" />
              ))}
            </div>

            <p className="text-lg sm:text-xl text-gray-200 font-sans italic leading-relaxed mb-8 max-w-3xl mx-auto">
              "{TESTIMONIALS[activeReviewIndex].comment}"
            </p>

            <div className="flex flex-col items-center">
              <span className="font-horror tracking-widest text-[#39ff14] text-xl">
                {TESTIMONIALS[activeReviewIndex].name}
              </span>
              <span className="text-xs font-mono text-zinc-500 uppercase font-medium mt-1">
                {TESTIMONIALS[activeReviewIndex].location} • {TESTIMONIALS[activeReviewIndex].vehicle}
              </span>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveReviewIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeReviewIndex === idx ? 'bg-[#39ff14] w-8' : 'bg-zinc-800'
                }`}
                title={`Go to item ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION RESERVATION */}
      <section className="py-24 bg-black border-t border-zinc-900 relative z-20 overflow-hidden">
        <div className="absolute -left-36 -top-36 w-96 h-96 bg-[#39ff14]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-36 -bottom-36 w-96 h-96 bg-[#ff5f1f]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 glass-card border border-white/5 rounded-2xl p-10 sm:p-16">
          <span className="text-3xl mb-4 block">🔥</span>
          <h2 className="text-3xl sm:text-5xl font-horror tracking-widest text-white uppercase text-dripping mb-6">
            DO NOT LET YOUR CAR DECAY
          </h2>
          <p className="max-w-xl text-gray-300 font-sans text-sm sm:text-base leading-relaxed mx-auto mb-10">
            Slots fill up incredibly fast across East Texas weekly. Lock in your paint protection compounding, interior decontamination, or mobile rig appointment instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => { setTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-8 py-4 bg-gradient-to-r from-[#39ff14] to-emerald-600 hover:from-emerald-500 hover:to-[#39ff14] text-black font-mono font-black uppercase tracking-wider text-sm transition-all hover:scale-105 rounded shadow-[0_0_20px_rgba(57,255,20,0.4)]"
            >
              Lock In Slot Now
            </button>
            <a 
              href="tel:903-374-5563"
              className="px-8 py-4 border border-[#ff5f1f]/40 hover:border-[#ff5f1f] text-[#ff5f1f] hover:text-white font-mono font-bold uppercase tracking-wider text-sm transition-all rounded"
            >
              Consult 903-374-5563
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
