import { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, Clock, User, Phone, Mail, Car, MessageCircle, RefreshCw, Trash2, Check, AlertTriangle, Database, Info, Search } from 'lucide-react';
import { Booking, ContactMessage } from '../types';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts'>('bookings');
  const [dbStats, setDbStats] = useState<any>(null);

  const fetchBackstageData = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      // Sync Bookings
      const bookingsRes = await fetch('/api/bookings');
      if (!bookingsRes.ok) throw new Error('Could not synchronize bookings database ledger.');
      const bookingsJson = await bookingsRes.json();
      setBookings(bookingsJson);

      // Sync Contacts
      const contactsRes = await fetch('/api/contacts');
      if (!contactsRes.ok) throw new Error('Could not synchronize contact records database.');
      const contactsJson = await contactsRes.json();
      setContacts(contactsJson);

      // Sync Health
      const healthRes = await fetch('/api/db-health');
      if (healthRes.ok) {
        const healthJson = await healthRes.json();
        setDbStats(healthJson);
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Severe connection lag to SQLite engine.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackstageData();
  }, []);

  const handleStatusChange = async (bookingId: number, currentStatus: string, newStatus: string) => {
    if (currentStatus === newStatus) return;
    setActionLoading(bookingId);
    setFeedback(null);
    try {
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to apply new status.');

      setFeedback({ type: 'success', message: `Booking #${bookingId} status updated to ${newStatus} successfully.` });
      
      // Update local state smoothly
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: newStatus as any } : b)
      );
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to modify status.' });
    } finally {
      setActionLoading(null);
    }
  };

  const handleBookingDelete = async (bookingId: number) => {
    if (!window.confirm(`⚠️ CRITICAL ACTION: Are you sure you want to delete and wipe Booking Ticket #${bookingId} entirely from local SQLite records?`)) {
      return;
    }
    setActionLoading(bookingId);
    setFeedback(null);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to delete row.');

      setFeedback({ type: 'success', message: `Booking record #${bookingId} deleted forever.` });
      // Update state
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Wipe action failed.' });
    } finally {
      setActionLoading(null);
    }
  };

  // Filter lists based on query
  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.phone.includes(searchQuery) ||
    b.make_model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone?.includes(searchQuery) ||
    c.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full relative select-none bg-zinc-950 py-16 splatter-bkg text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/5 pb-8 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-emerald-950 border border-[#39ff14]/30 flex items-center justify-center text-[#39ff14]">
                <ShieldCheck size={18} />
              </div>
              <span className="text-[#39ff14] font-mono text-xs tracking-wider uppercase font-extrabold">
                🔒 INTERNAL DATABASE BACKSTAGE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-horror tracking-widest text-white uppercase text-dripping-orange mt-2">
              Crew Command
            </h2>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={fetchBackstageData} 
              disabled={loading}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-gray-300 hover:text-[#39ff14] transition-all rounded text-sm font-mono flex items-center gap-2"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh SQLite DB
            </button>
          </div>
        </div>

        {/* FEEDBACK WARNING PANELS */}
        {feedback && (
          <div className={`mb-8 p-4 rounded-xl border flex items-start gap-3 justify-between ${
            feedback.type === 'success' 
              ? 'bg-emerald-950/20 border-emerald-500/40 text-[#39ff14]' 
              : 'bg-red-950/20 border-red-500/40 text-red-500'
          }`}>
            <div className="flex items-start gap-2.5">
              <span className="text-base">{feedback.type === 'success' ? '✅' : '⚠️'}</span>
              <p className="text-sm font-sans">{feedback.message}</p>
            </div>
            <button onClick={() => setFeedback(null)} className="text-xs hover:underline uppercase font-mono tracking-widest">
              Close
            </button>
          </div>
        )}

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-white">
          <div className="glass-card p-5 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-zinc-900 rounded-lg text-[#39ff14]">
              <Calendar size={22} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Total Reservations</span>
              <h4 className="text-2xl font-mono font-black">{bookings.length}</h4>
            </div>
          </div>
          <div className="glass-card p-5 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-zinc-900 rounded-lg text-[#ff5f1f]">
              <MessageCircle size={22} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Total Dispatch Radio Logs</span>
              <h4 className="text-2xl font-mono font-black">{contacts.length}</h4>
            </div>
          </div>
          <div className="glass-card p-5 rounded-xl border border-white/5 flex items-center gap-4">
            <div className="p-3 bg-zinc-900 rounded-lg text-[#39ff14]">
              <Database size={22} />
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">SQLite Driver Status</span>
              <span className="text-xs font-mono bg-emerald-950 text-[#39ff14] border border-[#39ff14]/30 px-2.5 py-0.5 rounded-full uppercase font-bold block mt-1 w-max">
                {dbStats ? `SQLITE ${dbStats.sqlite_version || 'OK'}` : 'CONNECTED'}
              </span>
            </div>
          </div>
        </div>

        {/* TABS & SEARCH */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/50 p-3 rounded-xl border border-white/5 mb-8">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('bookings'); setSearchQuery(''); }}
              className={`flex-grow sm:flex-grow-0 px-4 py-2.5 rounded text-xs font-mono uppercase font-extrabold tracking-widest ${
                activeTab === 'bookings' 
                  ? 'bg-[#ff5f1f] text-black shadow-[0_0_10px_rgba(255,95,31,0.4)]' 
                  : 'bg-black text-gray-400 border border-zinc-800'
              }`}
            >
              📅 Bookings List ({filteredBookings.length})
            </button>
            <button
              onClick={() => { setActiveTab('contacts'); setSearchQuery(''); }}
              className={`flex-grow sm:flex-grow-0 px-4 py-2.5 rounded text-xs font-mono uppercase font-extrabold tracking-widest ${
                activeTab === 'contacts' 
                  ? 'bg-[#ff5f1f] text-black shadow-[0_0_10px_rgba(255,95,31,0.4)]' 
                  : 'bg-black text-gray-400 border border-zinc-800'
              }`}
            >
              💬 Contact Logs ({filteredContacts.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
            <input 
              type="text"
              placeholder="Search databases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black border border-zinc-800 rounded text-xs text-white focus:outline-none focus:border-[#39ff14] transition-colors"
            />
          </div>
        </div>

        {/* VIEW SEGREGATION: 1. BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="flex flex-col gap-6">
            {filteredBookings.length === 0 ? (
              <div className="p-10 border border-white/5 rounded-xl bg-zinc-900/10 text-center flex flex-col items-center">
                <AlertTriangle size={36} className="text-[#ff5f1f] mb-3" />
                <span className="font-horror tracking-wider text-white text-lg uppercase">Registry Void</span>
                <p className="text-xs text-zinc-500 font-sans mt-1">No booking parameters match the specified criteria or SQLite is empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredBookings.map((b) => (
                  <div 
                    key={b.id}
                    className={`rounded-xl glass-card border p-6 relative flex flex-col justify-between hover:scale-[1.01] transition-transform ${
                      b.status === 'Completed' ? 'border-[#39ff14]/20 bg-zinc-950/80' : 'border-zinc-800'
                    }`}
                  >
                    {/* Status badge in corner */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      {actionLoading === b.id ? (
                        <span className="text-[10px] font-mono text-[#39ff14] bg-white/5 px-2 py-0.5 rounded animate-pulse">Syncing...</span>
                      ) : (
                        <select 
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id!, b.status!, e.target.value)}
                          className={`text-xs font-mono font-bold px-2.5 py-1 rounded border appearance-none pr-6 dark:bg-black focus:outline-none focus:border-[#39ff14] ${
                            b.status === 'Completed' 
                              ? 'bg-emerald-950/80 text-[#39ff14] border-[#39ff14]/30' 
                              : b.status === 'Confirmed'
                              ? 'bg-[#ff5f1f]/10 text-[#ff5f1f] border-[#ff5f1f]/30'
                              : b.status === 'Cancelled'
                              ? 'bg-zinc-900 text-zinc-500 border-zinc-850'
                              : 'bg-black text-white border-zinc-700'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      )}

                      <button 
                        onClick={() => handleBookingDelete(b.id!)}
                        className="p-1.5 bg-black hover:bg-red-950 text-zinc-650 hover:text-red-500 border border-zinc-850 rounded transition-colors"
                        title="Delete Reference"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div>
                      {/* Ticket id */}
                      <span className="text-[10px] font-mono text-[#ff5f1f] font-bold">
                        TICKET #{b.id}
                      </span>

                      {/* Client row */}
                      <h3 className="text-xl font-bold font-sans text-gray-100 flex items-center gap-2 mt-2 leading-none">
                        {b.name}
                      </h3>

                      {/* Service tags */}
                      <span className="inline-block text-[10px] font-mono uppercase bg-zinc-900 border border-zinc-800 text-[#39ff14] px-2 py-0.5 rounded font-black mt-2">
                        🎃 {b.service}
                      </span>

                      {/* Specifications */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4 border-t border-white/5 pt-4 text-xs font-sans text-gray-300">
                        <div className="flex items-center gap-1.5">
                          <Phone size={11} className="text-[#39ff14] shrink-0" />
                          <a href={`tel:${b.phone}`} className="hover:underline font-mono">{b.phone}</a>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail size={11} className="text-[#39ff14] shrink-0" />
                          <span className="truncate hover:underline" title={b.email}>{b.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-[#39ff14] shrink-0" />
                          <span className="font-mono">{b.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={11} className="text-[#39ff14] shrink-0" />
                          <span className="font-mono">{b.time}</span>
                        </div>
                        <div className="col-span-2 flex items-center gap-1.5">
                          <Car size={11} className="text-[#39ff14] shrink-0" />
                          <span className="uppercase text-[11px] font-semibold">[{b.vehicle_type}] {b.make_model}</span>
                        </div>
                      </div>

                      {/* Customer Notes */}
                      {b.notes && (
                        <div className="mt-3 bg-black/60 p-2.5 rounded border border-white/5">
                          <span className="text-[9px] font-mono text-zinc-500 uppercase font-black block">Special Specs:</span>
                          <p className="text-xs text-gray-400 font-sans italic mt-0.5">{b.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-white/5 pt-3 mt-4 flex justify-between items-center text-[10px] text-zinc-600 font-mono">
                      <span>Created: {b.created_at ? b.created_at.slice(0, 16) : 'N/A'}</span>
                      <span className="text-[#39ff14] font-black uppercase">Active slot verified</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW SEGREGATION: 2. CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="flex flex-col gap-6">
            {filteredContacts.length === 0 ? (
              <div className="p-10 border border-white/5 rounded-xl bg-zinc-900/10 text-center flex flex-col items-center">
                <AlertTriangle size={36} className="text-[#ff5f1f] mb-3" />
                <span className="font-horror tracking-wider text-white text-lg uppercase">Transmissions Void</span>
                <p className="text-xs text-zinc-500 font-sans mt-1">No radio messages found matching the parameters.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredContacts.map((c) => (
                  <div key={c.id} className="p-6 rounded-xl glass-card border border-zinc-800 hover:border-[#39ff14]/20 transition-all flex flex-col gap-4 relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#ff5f1f] font-bold">DISPATCH MSG #{c.id}</span>
                        <h3 className="text-lg font-bold text-white mt-1 uppercase">{c.name}</h3>
                      </div>
                      <span className="text-xs text-zinc-550 font-mono italic">{c.created_at ? c.created_at.slice(0, 16) : 'N/A'}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-white/5 py-3 text-xs text-gray-300 font-sans">
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} className="text-[#39ff14] shrink-0" />
                        <span>{c.email}</span>
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} className="text-[#39ff14] shrink-0" />
                          <span className="font-mono">{c.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-black/50 p-4 rounded text-sm text-gray-300 leading-relaxed font-sans italic border-l-2 border-[#ff5f1f]/50">
                      "{c.message}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
