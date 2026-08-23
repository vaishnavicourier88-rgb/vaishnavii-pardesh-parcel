import React from 'react';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Plane, 
  ArrowUp,
  MessageSquare,
  Package,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  lang: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Network Logistics Hubs Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Key Indian Cargo Gateway Hubs:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                'Mumbai (BOM)',
                'Delhi NCR (DEL)',
                'Ahmedabad (AMD)',
                'Bengaluru (BLR)',
                'Hyderabad (HYD)',
                'Chennai (MAA)',
                'Kolkata (CCU)',
                'Surat (STV)',
                'Pune (PNQ)',
                'Jaipur (JAI)',
              ].map((hub) => (
                <span
                  key={hub}
                  className="px-2.5 py-1 bg-slate-800/80 text-slate-300 rounded-md border border-slate-700 font-mono"
                >
                  {hub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight">
                  VAISHNAVII
                </span>
                <span className="ml-1 text-[10px] uppercase font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">
                  International
                </span>
                <p className="text-[11px] text-slate-400">Courier & Cargo Services</p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India's premier international express courier provider for NRIs, students, and businesses. Delivering parcels to USA, UK, Canada, Australia, Europe, and 220+ countries with free home pickup, commercial vacuum packing, and customs clearance.
            </p>

            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400" />
                <a href="mailto:vaishnavicourier88@gmail.com" className="hover:text-white transition">
                  vaishnavicourier88@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 98200 12345 / +91 88000 54321</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Specialized Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition cursor-pointer">
                  Homemade Food & Sweets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition cursor-pointer">
                  Prescription Medicines Express
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition cursor-pointer">
                  Student Excess Baggage (35% Off)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition cursor-pointer">
                  Urgent Documents & WES
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition cursor-pointer">
                  Commercial Air Cargo / Export
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Top Destinations
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  🇺🇸 Courier to USA (3-5 Days)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  🇬🇧 Courier to UK (3-5 Days)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  🇨🇦 Courier to Canada (4-6 Days)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  🇦🇺 Courier to Australia (4-6 Days)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  🇦🇪 Courier to Dubai / UAE (2-3 Days)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-4">
              Quick Portals
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('tracking')} className="hover:text-white transition cursor-pointer">
                  Live Consignment Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-white transition cursor-pointer">
                  International Rate Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('customs-guide')} className="hover:text-white transition cursor-pointer">
                  KYC & Customs Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('customs-guide')} className="hover:text-white transition cursor-pointer">
                  Prohibited Items List
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-white transition cursor-pointer">
                  FAQs & Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Logistics Partner Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">
              Integrated Global Freight & Customs Clearance Network Partner
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-slate-300">
            <span className="px-2 py-1 bg-slate-900 border border-slate-700 rounded">FEDEX</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-700 rounded">DHL EXPRESS</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-700 rounded">ARAMEX</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-700 rounded">UPS</span>
            <span className="px-2 py-1 bg-slate-900 border border-slate-700 rounded">VAISHNAVII DIRECT</span>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} Vaishnavii International Courier & Cargo Services. All rights reserved. Registered IATA Export Logistics Partner.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-blue-400 hover:text-white transition cursor-pointer font-medium"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
