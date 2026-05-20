import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, Car, MessageCircle, AlertCircle, CheckCircle2, Copy, ShieldCheck, Loader2 } from 'lucide-react';
import { SERVICES } from '../data';

interface BookingViewProps {
  selectedService: string;
  setSelectedService: (service: string) => void;
  setTab: (tab: string) => void;
}

export default function BookingView({ selectedService, setSelectedService, setTab }: BookingViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle_type: 'Sedan',
    make_model: '',
    service: selectedService || SERVICES[0].title,
    date: '',
    time: '09:00 AM',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Sync state if prop changes
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const vehicleTypes = ['Sedan', 'SUV', 'Coupe', 'Truck / Crew-Cab', 'Classic / Hot Rod', 'Motorcycle', 'Other'];
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg(null); // Clear error on change
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Frontend validation safeguards
    if (!formData.name.trim()) {
      setErrorMsg('Customer name is required in our records.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('A valid physical phone number is required (at least 10 numbers).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMsg('A valid email address is required for confirmation logs.');
      return;
    }
    if (!formData.make_model.trim()) {
      setErrorMsg('Vehicle make and model parameters must be specified.');
      return;
    }
    if (!formData.date) {
      setErrorMsg('Please select a preferred appointment date from the calendar.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Server rejected the booking submission. Please check inputs.');
      }

      // Success!
      setSuccessMsg(result.message);
      setConfirmedBooking({
        id: result.booking_id,
        ...formData
      });
      
      // Clear selections except service
      setFormData({
        name: '',
        phone: '',
        email: '',
        vehicle_type: 'Sedan',
        make_model: '',
        service: formData.service,
        date: '',
        time: '09:00 AM',
        notes: ''
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Severe connection glitch. Could not submit database block.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full relative select-none bg-zinc-950 py-16 splatter-bkg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TEXT CLASSIFICATION */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#ff5f1f] font-mono text-xs tracking-[0.3em] uppercase font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10">
            🩸 SECURE BAY APPOINTMENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-horror tracking-wider text-white select-none text-dripping uppercase mt-4">
            Resurect Your Ride
          </h2>
          <p className="text-gray-400 font-sans mt-2">
            Fully operational reservation system integrated with our SQLite database crew backstage logs. Lock in your timing instantly.
          </p>
        </div>

        {/* ERROR / FLASH FEEDBACK */}
        {errorMsg && (
          <div className="mb-8 p-4 bg-[#d90429]/15 border border-[#d90429]/40 text-[#d90429] rounded-xl flex items-start gap-3 animate-pulse">
            <AlertCircle className="shrink-0 mt-0.5" size={18} />
            <div className="flex-grow">
              <span className="font-bold font-mono text-xs uppercase block">Engine Error:</span>
              <p className="text-sm font-sans mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* CONFIRMED TICKET VIEW / SUCCESS IF CONFIRMED */}
        {confirmedBooking ? (
          <div className="glass-card border border-[#39ff14]/40 rounded-2xl p-6 sm:p-10 shadow-3xl text-left relative overflow-hidden bg-zinc-950/90 pulse-border-green">
            
            <div className="absolute top-0 right-0 p-8 text-[#39ff14]/10 select-none font-horror text-9xl">VOUCHER</div>

            {/* Dripping green outline circle header */}
            <div className="flex items-center gap-4 border-b border-[#39ff14]/20 pb-6 mb-8">
              <div className="w-14 h-14 bg-emerald-950/80 rounded-full border border-[#39ff14] flex items-center justify-center text-[#39ff14] shrink-0 shadow-[0_0_15px_rgba(57,255,20,0.4)]">
                <CheckCircle2 size={30} className="animate-bounce" />
              </div>
              <div>
                <h3 className="text-2xl font-horror text-white tracking-widest uppercase">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs font-mono text-zinc-500 uppercase mt-0.5">
                  Texas Boyz Detailing Ticket Registry No: <span className="text-[#39ff14] font-bold"># {confirmedBooking.id}</span>
                </p>
              </div>
            </div>

            {/* Email-Style Printable Ticket Specifications */}
            <div className="bg-black/80 rounded-xl p-5 sm:p-7 border border-white/5 flex flex-col gap-6 relative">
              <div className="absolute top-4 right-4 text-xs font-mono text-[#ff5f1f] bg-[#ff5f1f]/10 border border-[#ff5f1f]/30 px-3 py-1 rounded">
                Pending Final Inspection
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">Customer Name</span>
                  <span className="text-base text-gray-200 font-sans font-bold flex items-center gap-1.5 mt-0.5">
                    <User size={14} className="text-[#39ff14]" /> {confirmedBooking.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">Phone Number Contact</span>
                  <span className="text-base text-gray-200 font-sans font-bold flex items-center gap-1.5 mt-0.5">
                    <Phone size={14} className="text-[#39ff14]" /> {confirmedBooking.phone}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">Registered Email</span>
                  <span className="text-base text-gray-200 font-mono text-sm flex items-center gap-1.5 mt-0.5">
                    <Mail size={14} className="text-[#39ff14]" /> {confirmedBooking.email}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">Selected Service Armor</span>
                  <span className="text-sm bg-[#39ff14]/10 border border-[#39ff14]/20 text-[#39ff14] font-bold px-2.5 py-1 rounded mt-1 inline-flex items-center gap-1">
                    🎃 {confirmedBooking.service}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">Appointed Date</span>
                  <span className="text-base text-gray-200 font-sans font-bold flex items-center gap-1.5 mt-0.5">
                    <Calendar size={14} className="text-[#39ff14]" /> {confirmedBooking.date}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">Appointed Slot</span>
                  <span className="text-base text-gray-200 font-sans font-bold flex items-center gap-1.5 mt-0.5">
                    <Clock size={14} className="text-[#39ff14]" /> {confirmedBooking.time}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">Vehicle Profile Spec</span>
                  <span className="text-sm text-gray-200 font-sans font-medium flex items-center gap-1.5 mt-0.5 uppercase">
                    <Car size={14} className="text-[#39ff14]" /> [{confirmedBooking.vehicle_type}] {confirmedBooking.make_model}
                  </span>
                </div>
                {confirmedBooking.notes && (
                  <div className="sm:col-span-2 border-t border-white/5 pt-4 mt-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-black block">Additional Instructions</span>
                    <p className="text-xs text-gray-400 font-sans italic mt-1 bg-white/5 p-3 rounded">{confirmedBooking.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions for the vouchers */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="text-xs text-gray-400 font-sans text-center sm:text-left">
                We have also sent an automated simulation confirmation log to <span className="text-[#39ff14] font-mono font-bold">{confirmedBooking.email}</span>. Please be ready at your designated slot timing!
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setConfirmedBooking(null)}
                  className="px-5 py-2.5 bg-[#ff5f1f] text-black hover:bg-white hover:text-black font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors"
                >
                  Book Another Ride
                </button>
                <button 
                  onClick={() => { setTab('home'); }}
                  className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-white font-mono text-xs uppercase rounded"
                >
                  Back Home
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* BOOKING FORM DESIGN */
          <form 
            onSubmit={handleFormSubmit}
            className="glass-card border border-white/5 rounded-2xl p-6 sm:p-10 shadow-3xl text-left relative overflow-hidden bg-zinc-950/70"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#ff5f1f]" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  <User size={12} className="text-[#39ff14]" /> Full Name *
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

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  <Phone size={12} className="text-[#39ff14]" /> Phone Number *
                </label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 903-555-0199"
                  className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-mono text-sm focus:border-[#39ff14] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  <Mail size={12} className="text-[#39ff14]" /> Email Address *
                </label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. mave@east-texas-rides.com"
                  className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Service Select */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  🎃 Detailing Service *
                </label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors cursor-pointer"
                >
                  {SERVICES.map((serv) => (
                    <option key={serv.id} value={serv.title}>
                      {serv.title} ({serv.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Type */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  <Car size={12} className="text-[#39ff14]" /> Vehicle Type *
                </label>
                <select 
                  name="vehicle_type"
                  value={formData.vehicle_type}
                  onChange={handleInputChange}
                  className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors cursor-pointer"
                >
                  {vehicleTypes.map((t, idx) => (
                    <option key={idx} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Vehicle Make/Model */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  ⚙️ Make / Model Spec *
                </label>
                <input 
                  type="text"
                  name="make_model"
                  value={formData.make_model}
                  onChange={handleInputChange}
                  placeholder="e.g. 2022 Dodge Charger Scatpack"
                  className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  <Calendar size={12} className="text-[#39ff14]" /> Preferred Date *
                </label>
                <input 
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-mono text-sm focus:border-[#39ff14] focus:outline-none transition-colors cursor-pointer"
                  required
                />
              </div>

              {/* Time Slot */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  <Clock size={12} className="text-[#39ff14]" /> Preferred Start Time *
                </label>
                <select 
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors cursor-pointer"
                >
                  {timeSlots.map((ts, idx) => (
                    <option key={idx} value={ts}>{ts}</option>
                  ))}
                </select>
              </div>

              {/* Additional notes */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  <MessageCircle size={12} className="text-[#ff5f1f]" /> Special Requests / Concerns
                </label>
                <textarea 
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Include any critical details e.g., heavy pet hair, glass staining, paint scratches parameters, mobile address or garage drop-off parameters..."
                  rows={4}
                  className="p-3 bg-black border border-zinc-800 rounded-lg text-white font-sans text-sm focus:border-[#39ff14] focus:outline-none transition-colors resize-none"
                />
              </div>

            </div>

            {/* CTA Submit Button */}
            <div className="border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-500 font-sans">
                ⚠️ Form sends directly to our local SQLite booking server ledger.
              </span>
              <button 
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#ff5f1f] to-[#d90429] hover:from-[#39ff14] hover:to-emerald-600 font-mono font-bold uppercase tracking-wider text-sm text-white hover:text-black transition-all rounded shadow-[0_0_15px_rgba(255,95,31,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Inserting Slot Block...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} /> Resurrect Ride Now
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
