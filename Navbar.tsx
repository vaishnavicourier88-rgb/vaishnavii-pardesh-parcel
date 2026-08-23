import React, { useState } from 'react';
import { 
  Globe, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Search, 
  Calculator, 
  CalendarClock, 
  Menu, 
  X, 
  Languages, 
  ShieldCheck,
  Plane,
  Lock
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  onOpenBooking: () => void;
  onQuickTrack: (code: string) => void;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
  lang,
  setLang,
  onOpenBooking,
  onOpenAdminLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'tracking', label: lang === 'en' ? 'Track Shipment' : 'पार्सल ट्रैक करें', icon: Search },
    { id: 'calculator', label: lang === 'en' ? 'Rate Calculator' : 'दर कैलकुलेटर', icon: Calculator },
    { id: 'services', label: lang === 'en' ? 'Services' : 'सेवाएं', icon: Plane },
    { id: 'destinations', label: lang === 'en' ? 'Destinations' : 'देश एवं दरें', icon: Globe },
    { id: 'customs-guide', label: lang === 'en' ? 'Customs & KYC' : 'कस्टम नियम', icon: ShieldCheck },
    { id: 'faqs', label: lang === 'en' ? 'FAQs' : 'प्रश्न व उत्तर', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification & Contact Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              {lang === 'en' 
                ? 'Worldwide Express Delivery to 220+ Countries | Free Doorstep Pickup & Packing' 
                : '220+ देशों में सुरक्षित इंटरनेशनल कूरियर | फ्री डोरस्टेप पिकअप व पैकिंग'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="mailto:vaishnavicourier88@gmail.com" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Official Email"
            >
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>vaishnavicourier88@gmail.com</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="tel:+919820012345" 
              className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 98200 12345</span>
            </a>
            <span className="text-slate-600">|</span>
            
            {/* Staff / Agent Login */}
            <button
              onClick={onOpenAdminLogin}
              id="staff-portal-topbar-btn"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-900/80 hover:bg-blue-800 text-blue-200 hover:text-white font-bold transition border border-blue-700/50 cursor-pointer"
              title="Admin & Agent Wholesale Rate Portal"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Staff / Agent Login</span>
            </button>

            <span className="text-slate-600">|</span>
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium transition cursor-pointer"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => scrollTo('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo-btn"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Globe className="w-7 h-7 animate-pulse text-blue-200" />
                <Plane className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 rotate-45" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-tight">
                  VAISHNAVII
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  International
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 tracking-wide">
                COURIER & CARGO SERVICES
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  id={`nav-link-${link.id}`}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-blue-700 bg-blue-50 font-semibold' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={onOpenAdminLogin}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Staff Login</span>
            </button>

            <a
              href="https://wa.me/919820012345?text=Hello%20Vaishnavii%20International%20Courier,%20I%20want%20to%20send%20an%20international%20parcel."
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-header-btn"
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onOpenBooking}
              id="book-pickup-header-btn"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg cursor-pointer"
            >
              <CalendarClock className="w-4 h-4" />
              <span>{lang === 'en' ? 'Book Free Pickup' : 'पिकअप बुक करें'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdminLogin}
              className="p-2 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Login</span>
            </button>
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="p-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-700"
            >
              {lang === 'en' ? 'HI' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="text-xs text-slate-500 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>✉️ vaishnavicourier88@gmail.com</span>
            <span>📞 +91 98200 12345</span>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm font-medium ${
                    isActive ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-xs shadow-md"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin & Agent Wholesale Login</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm shadow-md"
            >
              <CalendarClock className="w-4 h-4" />
              {lang === 'en' ? 'Book Doorstep Pickup' : 'पिकअप बुक करें'}
            </button>
            <a
              href="https://wa.me/919820012345?text=Hello%20Vaishnavii%20International%20Courier,%20I%20want%20to%20send%20an%20international%20parcel."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-medium text-sm shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Direct Chat
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
