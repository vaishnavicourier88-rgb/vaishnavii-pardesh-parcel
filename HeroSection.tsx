import React, { useState } from 'react';
import { 
  Search, 
  Calculator, 
  CalendarClock, 
  ShieldCheck, 
  Plane, 
  PackageCheck, 
  Clock, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  TrendingDown,
  Building2
} from 'lucide-react';

interface HeroSectionProps {
  onSearchTracking: (code: string) => void;
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
  lang: 'en' | 'hi';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchTracking,
  onOpenBooking,
  onOpenCalculator,
  lang,
}) => {
  const [trackingInput, setTrackingInput] = useState('');
  const [selectedQuickOrigin, setSelectedQuickOrigin] = useState('Mumbai / Delhi / All India');
  const [selectedQuickDest, setSelectedQuickDest] = useState('United States (USA)');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onSearchTracking(trackingInput.trim());
    } else {
      onSearchTracking('VIC-98234IN');
    }
  };

  const popularSampleCodes = [
    { code: 'VIC-98234IN', label: '🇺🇸 USA Sweets Parcel (In Transit)' },
    { code: 'VIC-88412UK', label: '🇬🇧 UK Urgent Medicines (Out for Delivery)' },
    { code: 'VIC-55192CA', label: '🇨🇦 Canada Student Baggage (Delivered)' },
  ];

  return (
    <section id="hero" className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden pt-8 pb-16 lg:pb-24">
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Govt. Registered & IATA Compliant International Courier</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Doorstep Pickup Across 1,000+ Pin Codes in India</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            Fast, Reliable & Affordable{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              International Courier
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {lang === 'en' 
              ? 'Delivering your precious homemade food, sweets, medicines, student baggage, urgent documents & commercial cargo from India to 220+ countries worldwide with complete customs clearance & real-time tracking.'
              : 'भारत से अमेरिका, यूके, कनाडा, ऑस्ट्रेलिया और 220+ देशों में घर का खाना, दवाइयां, छात्रों का सामान व व्यापारिक पार्सल सुरक्षित और सबसे कम दरों पर भेजें।'}
          </p>
        </div>

        {/* Primary Interactive Hero Card: Integrated Tracking & Quick Estimator */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-8">
          {/* Quick Tracking Search Form */}
          <form onSubmit={handleTrackSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-900/80 p-2 sm:p-2.5 rounded-xl border border-slate-700/80 shadow-inner">
              <div className="flex items-center gap-3 pl-3 flex-1 w-full">
                <Search className="w-5 h-5 text-blue-400 shrink-0" />
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Enter AWB / Tracking No. (e.g. VIC-98234IN or your Airway Bill)"
                  className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none font-mono"
                  id="hero-tracking-input"
                />
              </div>
              <button
                type="submit"
                id="hero-track-btn"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-md shadow-blue-500/30 flex items-center justify-center gap-2 transition duration-200 cursor-pointer"
              >
                <span>Track Parcel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Demo Tracking Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Try Live Samples:</span>
              {popularSampleCodes.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setTrackingInput(item.code);
                    onSearchTracking(item.code);
                  }}
                  className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 transition cursor-pointer font-mono"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </form>

          {/* Quick Booking & Calculator Action Row */}
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={onOpenBooking}
              className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/30 hover:border-blue-400 transition cursor-pointer hover:shadow-lg hover:shadow-blue-900/30"
              id="hero-doorstep-pickup-card"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 group-hover:scale-105 transition-transform">
                  <CalendarClock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-base group-hover:text-blue-300 transition">
                    Book Free Doorstep Pickup
                  </h2>
                  <p className="text-xs text-slate-300">
                    We collect & pack from your home today
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-300 group-hover:translate-x-1 transition-transform" />
            </div>

            <div 
              onClick={onOpenCalculator}
              className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900/60 border border-emerald-500/30 hover:border-emerald-400 transition cursor-pointer hover:shadow-lg hover:shadow-emerald-950/30"
              id="hero-rate-calc-card"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-emerald-600/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform">
                  <Calculator className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-base group-hover:text-emerald-300 transition">
                    Calculate Shipping Rate
                  </h2>
                  <p className="text-xs text-slate-300">
                    Get instant per kg quotes & transit times
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* 4 Pillars Trust Metrics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="flex items-center justify-center mb-1 text-amber-400">
              <Plane className="w-5 h-5" />
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white">220+</div>
            <div className="text-xs text-slate-400 font-medium">Countries Delivered</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="flex items-center justify-center mb-1 text-emerald-400">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white">100%</div>
            <div className="text-xs text-slate-400 font-medium">Customs Clearance Support</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="flex items-center justify-center mb-1 text-blue-400">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white">48 - 72 Hrs</div>
            <div className="text-xs text-slate-400 font-medium">Priority Express Transit</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <div className="flex items-center justify-center mb-1 text-rose-400">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white">Up to 60%</div>
            <div className="text-xs text-slate-400 font-medium">Savings vs Airline Cargo</div>
          </div>
        </div>
      </div>
    </section>
  );
};
