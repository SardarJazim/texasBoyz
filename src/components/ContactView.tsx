import React, { useState } from 'react';
import { Phone, MapPin, Mail, Clock, AlertCircle, CheckCircle2, MessageSquare, Send, Loader2, Star } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validations
    if (!formData.name.trim()) {
      setErrorMsg('Please specify your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMsg('Please specify a valid email syntax.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('The message container cannot be empty.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Server error saving contacts. Please try again.');
      }

      setSuccessMsg(result.message);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Severe connection drop. Message not stored.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative select-none bg-zinc-950 py-16 splatter-bkg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#39ff14] font-mono text-xs tracking-[0.3em] uppercase font-bold">
            ⚔️ ESTABLISH COMM-LINK
          </span>
          <h2 className="text-3xl sm:text-5xl font-horror tracking-wider text-white select-none text-dripping-orange uppercase mt-3">
            Radio The Crew
          </h2>
          <p className="text-gray-400 font-sans mt-2">
            Have questions about standard packages, unique scratch corrections, or custom location requests? Reach our Longview dispatch instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: INFO MODULES */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            
            <div className="glass-card border border-white/5 p-6 rounded-xl flex items-start gap-4">
              <Phone size={24} className="text-[#39ff14] shrink-0 mt-1" />
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">HOTLINE CALL</h4>
                <a href="tel:903-374-5563" className="text-xl font-mono font-bold text-[#ff5f1f] hover:text-[#39ff14] transition-colors mt-1 block">
                  903-374-5563
                </a>
                <p className="text-xs text-gray-400 font-sans mt-0.5">Call or text our crew anytime. Mon-Sat: 7am-7pm.</p>
              </div>
            </div>

            <div className="glass-card border border-white/5 p-6 rounded-xl flex items-start gap-4">
              <MapPin size={24} className="text-[#39ff14] shrink-0 mt-1" />
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">SECTOR LOCATION</h4>
                <span className="text-lg font-sans font-bold text-white mt-1 block">
                  Longview, Texas
                </span>
                <p className="text-xs text-gray-400 font-sans mt-0.5">Servicing Longview and up to a 50-mile parameter radius.</p>
              </div>
            </div>

            <div className="glass-card border border-white/5 p-6 rounded-xl flex items-start gap-4">
              <Mail size={24} className="text-[#39ff14] shrink-0 mt-1" />
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">EMAIL LOG</h4>
                <a href="mailto:booking@texasboyzdetailing.com" className="text-sm font-mono text-gray-300 hover:text-white mt-1 block">
                  booking@texasboyzdetailing.com
                </a>
              </div>
            </div>

            {/* SECTOR MAP IFRAME */}
            <div className="w-full h-64 rounded-xl overflow-hidden border border-[#39ff14]/25 relative shadow-inner">
              <iframe
                title="Texas Boyz Longview Area Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107412.38954752536!2d-94.81977935740698!3d32.50201639011295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x863647f168f6ddbf%3A0xe5a1b3bebfb9f1d0!2sLongview%2C%20TX!5e0!3m2!1sen!2sus!4v1716210000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.1)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 pointer-events-none rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]" />
            </div>

          </div>

          {/* RIGHT: CONTACT FORM WITH DB POST */}
          <div className="lg:col-span-7">
            
            {successMsg ? (
              <div className="glass-card border border-[#39ff14]/40 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center gap-4 bg-zinc-950/80 pulse-border-green">
                <div className="w-16 h-16 bg-emerald-950 text-[#39ff14] rounded-full border border-[#39ff14] flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.3)] select-none">
                  <CheckCircle2 size={36} className="animate-bounce" />
                </div>
                <h3 className="text-2xl font-horror text-white uppercase tracking-widest mt-2">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-gray-400 font-sans max-w-sm mt-1">
                  {successMsg}
                </p>
                <button 
                  onClick={() => setSuccessMsg(null)}
                  className="mt-6 px-6 py-2.5 bg-[#39ff14] hover:bg-white text-black font-mono text-xs font-black uppercase tracking-wider rounded transition-colors"
                >
                  Post Another Message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleFormSubmit}
                className="glass-card border border-white/5 rounded-2xl p-6 sm:p-10 text-left flex flex-col gap-6 relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff5f1f]" />

                {errorMsg && (
                  <div className="p-4 bg-[#d90429]/15 border border-[#d90429]/40 text-[#d90429] rounded-xl flex items-start gap-3 animate-pulse">
                    <AlertCircle className="shrink-0 mt-0.5" size={18} />
                    <div>
                      <span className="font-bold font-mono text-xs uppercase block">Post Denied:</span>
                      <p className="text-sm font-sans mt-0.5">{errorMsg}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase tracking-widest">
                    Enter Name *
                  </label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Maverick Carter"
                    className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-gray-300 uppercase tracking-widest">
                      Enter Email *
                    </label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="maverick@gmail.com"
                      className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-gray-300 uppercase tracking-widest">
                      Enter Phone (Optional)
                    </label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 903-555-0100"
                      className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-mono text-sm focus:border-[#39ff14] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase tracking-widest">
                    Your Message *
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your detailing request, custom paint scenario, or standard question..."
                    rows={6}
                    className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="py-4 w-full bg-gradient-to-r from-[#ff5f1f] to-[#d90429] hover:from-[#39ff14] hover:to-emerald-600 text-white hover:text-black font-mono font-bold uppercase tracking-wider text-sm transition-all rounded shadow-[0_0_15px_rgba(255,95,31,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Discharging Packet...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send Transmission
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
