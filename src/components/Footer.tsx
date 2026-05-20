import { Phone, MapPin, Mail, Clock, Facebook, Instagram, ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 border-t border-white/5 relative overflow-hidden splatter-bkg">
      {/* Visual background drips overlay */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#39ff14] via-[#ff5f1f] to-[#39ff14] opacity-50 shadow-[0_0_10px_#39ff14]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info & Scary pumpkin logo */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-horror text-[#39ff14] tracking-wider animate-pulse flicker-pumpkin">
                🎃
              </span>
              <h3 className="text-xl font-horror text-white tracking-widest uppercase">
                TEXAS BOYZ
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
              We cut compound, lay active-bonds of nano ceramic shield, and steam-clean interior wreckage. East Texas premium auto detailing delivered with street-rigged, horror-style grit.
            </p>
            <div className="flex items-center gap-3 mt-2 text-[#39ff14]">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors hover:text-[#ff5f1f]" referrerPolicy="no-referrer">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors hover:text-[#ff5f1f]" referrerPolicy="no-referrer">
                <Instagram size={18} />
              </a>
              <a href="mailto:sardarjazim1234@gmail.com" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors hover:text-[#ff5f1f]">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ff5f1f] border-b border-white/5 pb-2 font-mono">
              The Vault
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-medium">
              <li>
                <button onClick={() => { setTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#39ff14] transition-colors uppercase tracking-wider font-mono text-xs">
                  Resurrection Home
                </button>
              </li>
              <li>
                <button onClick={() => { setTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#39ff14] transition-colors uppercase tracking-wider font-mono text-xs">
                  The Boys Story
                </button>
              </li>
              <li>
                <button onClick={() => { setTab('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#39ff14] transition-colors uppercase tracking-wider font-mono text-xs">
                  Detached Services
                </button>
              </li>
              <li>
                <button onClick={() => { setTab('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#39ff14] transition-colors uppercase tracking-wider font-mono text-xs">
                  Reserve a Bay
                </button>
              </li>
              <li>
                <button onClick={() => { setTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#39ff14] transition-colors uppercase tracking-wider font-mono text-xs">
                  Radio the Crew
                </button>
              </li>
              <li>
                <button onClick={() => { setTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-zinc-500 hover:text-[#39ff14] transition-colors uppercase tracking-wider font-mono text-[10px] flex items-center gap-1">
                  <ShieldAlert size={10} /> Database Backstage
                </button>
              </li>
            </ul>
          </div>

          {/* Business Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ff5f1f] border-b border-white/5 pb-2 font-mono">
              Bay Access
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#39ff14] shrink-0 mt-0.5" />
                <span>Longview, Texas • Mobile rig servicing surrounding East TX areas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#39ff14] shrink-0" />
                <a href="tel:903-374-5563" className="hover:text-white transition-colors font-mono font-bold tracking-wider text-[#ff5f1f]">
                  903-374-5563
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#39ff14] shrink-0" />
                <a href="mailto:booking@texasboyzdetailing.com" className="hover:text-white transition-colors">
                  booking@texasboyzdetailing.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="text-[#39ff14] shrink-0 mt-0.5" />
                <div className="flex flex-col text-xs text-gray-400">
                  <span className="font-bold text-white uppercase font-mono">Mon - Sat:</span>
                  <span>7:00 AM - 7:00 PM</span>
                  <span className="font-bold text-white uppercase font-mono mt-1">Sun:</span>
                  <span>By Appointment Only</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact maps section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#ff5f1f] border-b border-white/5 pb-2 font-mono">
              Sector Location
            </h4>
            <div className="w-full h-32 rounded-lg overflow-hidden border border-[#39ff14]/20 relative">
              <iframe
                title="Texas Boyz Detailing Longview TX Sector Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107412.38954752536!2d-94.81977935740698!3d32.50201639011295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x863647f168f6ddbf%3A0xe5a1b3bebfb9f1d0!2sLongview%2C%20TX!5e0!3m2!1sen!2sus!4v1716210000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 pointer-events-none border border-[#39ff14]/10 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]" />
            </div>
            <span className="text-[10px] text-gray-500 font-mono tracking-wider italic text-right block uppercase">
              GPS Lock: Longview, TX
            </span>
          </div>

        </div>

        {/* Legal & Credits with strict unrequested removal of port/telemetry text */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 font-mono">
          <p>© {currentYear} Texas Boyz Detailing. All rights reserved.</p>
          <div className="flex items-center gap-1.5 mt-4 sm:mt-0">
            <span>Built for East Texas car owners with</span>
            <Heart size={10} className="text-[#39ff14] animate-ping fill-[#39ff14]" />
            <span>& fury.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
