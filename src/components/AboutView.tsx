import { ShieldCheck, Skull, Trophy, Star, Award, HeartHandshake } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="w-full relative select-none">
      
      {/* JUMBOTRON HEADER */}
      <section className="relative py-24 bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/spooky_garage_1779289637192.png" 
            alt="Spooky garage detailing station background" 
            className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
          <div className="text-4xl animate-bounce mb-3">👻</div>
          <span className="text-[#39ff14] font-mono text-xs tracking-[0.4em] uppercase font-bold">
            THE DEADLY HISTORY OF SHINE
          </span>
          <h2 className="text-4xl sm:text-6xl font-horror tracking-wider text-white select-none text-dripping uppercase mt-2">
            The Boyz Story
          </h2>
          <p className="max-w-xl text-xs sm:text-sm text-zinc-500 font-mono tracking-widest uppercase mt-2">
            Longview, Texas • EST. 2021
          </p>
        </div>
      </section>

      {/* STORY & MISSION */}
      <section className="py-24 bg-zinc-950 splatter-bkg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-6">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#ff5f1f]">
                💀 COMPROMISE IS A GRAVEYARD
              </span>
              <h3 className="text-3xl sm:text-4xl font-horror text-white tracking-widest uppercase leading-snug">
                Sworn To Resurrect East Texas Steel
              </h3>
              <p className="text-gray-300 font-sans leading-relaxed">
                Texas Boyz Detailing began not in a multi-million dollar corporate office, but in a dusty, dimly lit garage in Longview, TX. Founded by auto enthusiasts with a deep-rooted passion for hot rods, muscle builds, and flawless mirror paint, we wanted to deliver something different. 
              </p>
              <p className="text-gray-400 font-sans leading-relaxed">
                We got tired of corporate detailing chains charging five-star pricing for low-effort, swirl-inducing automatic brush washes. We set out to master the dual-action compounding machines, nano-ceramic formulas, and deep steam sanitation extractors, bundling our service in a heavy-metal, street-style, horror brand identity that mirrors our uncompromising attitude towards grime.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 flex items-start gap-3">
                  <ShieldCheck className="text-[#39ff14] shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">100% Client Loyalty</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-normal font-sans">We don't call a job finished until the customer has walked the panels and smiled.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 flex items-start gap-3">
                  <Skull className="text-[#ff5f1f] shrink-0 mt-1" size={18} />
                  <div>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Brutal Attention</h4>
                    <p className="text-xs text-zinc-500 mt-1 leading-normal font-sans">From air conditioning vent vents to the wheel wells, we trace every speck of dust.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Images / Branding */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#39ff14]/10 to-[#ff5f1f]/10 rounded-2xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 pulse-border-green">
                <img 
                  src="/src/assets/images/perfect_finish_1779289609638.png" 
                  alt="Ceramic coating finish highlight" 
                  className="w-full h-96 object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                  <div className="text-3xl font-horror text-[#39ff14] mb-1 select-none">9H RATED</div>
                  <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest leading-none">Chemical Bond Clearcoat Armor</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US (BENTO CORE VALUES) */}
      <section className="py-24 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#39ff14] font-mono text-xs tracking-[0.3em] uppercase font-bold">
              ⚡ WHY UNLEASH TEXAS BOYZ?
            </span>
            <h3 className="text-3xl sm:text-5xl font-horror tracking-wider text-white uppercase mt-2 mb-4 text-dripping">
              The Crew Advantage
            </h3>
            <p className="text-gray-400 font-sans">
              We engineered our business from the ground up to offer unmatched durability, extreme convenience, and pure results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Value 1 */}
            <div className="p-8 rounded-xl bg-zinc-950 border border-white/5 relative overflow-hidden group hover:border-[#39ff14]/40 transition-colors">
              <div className="absolute top-0 right-0 p-4 font-horror text-8xl text-zinc-900/40 select-none group-hover:text-[#39ff14]/20 transition-colors duration-300">
                01
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 text-[#39ff14] mb-6 group-hover:scale-110 transition-transform">
                <Trophy size={20} />
              </div>
              <h4 className="text-lg font-mono font-bold uppercase tracking-wider text-white mb-3">
                Professional Level Equipment
              </h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                We don't use consumer-grade bucket solutions. We operate heavy-duty steam de-contaminators, hot water carpet extractors, precise rotary force-drive cutters, and laboratory checked ceramic shield solutions.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-8 rounded-xl bg-zinc-950 border border-white/5 relative overflow-hidden group hover:border-[#ff5f1f]/40 transition-colors">
              <div className="absolute top-0 right-0 p-4 font-horror text-8xl text-zinc-900/40 select-none group-hover:text-[#ff5f1f]/20 transition-colors duration-300">
                02
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 text-[#ff5f1f] mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake size={20} />
              </div>
              <h4 className="text-lg font-mono font-bold uppercase tracking-wider text-white mb-3">
                Trained & Insured Detailers
              </h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                Your investment is completely safe with us. Our staff is fully licensed, background checked, and backed by comprehensive garage liability protection. We treat every vehicle like we own it ourselves.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-8 rounded-xl bg-zinc-950 border border-white/5 relative overflow-hidden group hover:border-[#39ff14]/40 transition-colors">
              <div className="absolute top-0 right-0 p-4 font-horror text-8xl text-zinc-900/40 select-none group-hover:text-[#39ff14]/20 transition-colors duration-300">
                03
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 text-[#39ff14] mb-6 group-hover:scale-110 transition-transform">
                <Award size={20} />
              </div>
              <h4 className="text-lg font-mono font-bold uppercase tracking-wider text-white mb-3">
                Uncompromising Pure Water
              </h4>
              <p className="text-sm text-gray-400 font-sans leading-relaxed">
                Tap water contains heavy calcium deposits that etch and scar paint finishes as it dries. Our mobile rigs feed spot-free, double deionised pure water, ensuring perfect streaks-free results on every body panel.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* EAST TEXAS BOUNDS BANNER */}
      <section className="py-24 bg-zinc-950 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-zinc-900/50 border border-white/5 rounded-2xl p-10 sm:p-16">
          <h3 className="text-3xl sm:text-5xl font-horror text-[#ff5f1f] tracking-widest uppercase mb-4 flicker-pumpkin">
            Texas Outpost Longview, TX
          </h3>
          <p className="max-w-2xl text-gray-300 font-sans text-sm sm:text-base leading-relaxed mx-auto">
            Based locally out of Longview, our mobile units cover a massive 50-mile radius range covering Kilgore, Gladewater, Tyler, and Hallsville. Wherever there is heavy dust or oxidized clearcoat screaming for a save, the Texas Boyz Detail rig is armed and ready to deploy.
          </p>
        </div>
      </section>

    </div>
  );
}
