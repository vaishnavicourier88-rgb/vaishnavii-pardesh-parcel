/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrackingSection } from './components/TrackingSection';
import { RateCalculatorSection } from './components/RateCalculatorSection';
import { ServicesSection } from './components/ServicesSection';
import { DestinationsSection } from './components/DestinationsSection';
import { CustomsGuideSection } from './components/CustomsGuideSection';
import { TestimonialsFaqSection } from './components/TestimonialsFaqSection';
import { PickupBookingModal } from './components/PickupBookingModal';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminPortal/AdminLoginModal';
import { AdminDashboard } from './components/AdminPortal/AdminDashboard';
import { CountryRate, ServiceItem, StaffUser } from './types';
import { MessageSquare, CalendarClock, Shield, ArrowRight, LayoutDashboard } from 'lucide-react';
import { clearAuthSession, getAuthSession, setAuthSession } from './utils/storageManager';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [trackingCode, setTrackingCode] = useState('VIC-98234IN');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(null);
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');

  const [bookingDetails, setBookingDetails] = useState<{
    country?: string;
    weight?: number;
    parcelType?: string;
  }>({});

  // Check existing auth on load
  useEffect(() => {
    const session = getAuthSession();
    if (session && session.user) {
      setCurrentUser(session.user);
    }
  }, []);

  const handleLoginSuccess = (user: StaffUser) => {
    setCurrentUser(user);
    setViewMode('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    clearAuthSession();
    setCurrentUser(null);
    setViewMode('public');
  };

  // Triggered when user tracks a code from Hero or Nav
  const handleSearchTracking = (code: string) => {
    setTrackingCode(code);
    setActiveSection('tracking');
    const el = document.getElementById('tracking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open calculator scroll
  const handleOpenCalculator = () => {
    setActiveSection('calculator');
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open booking modal with prefilled data
  const handleOpenBooking = (details?: { country?: string; weight?: number; parcelType?: string }) => {
    if (details) {
      setBookingDetails(details);
    } else {
      setBookingDetails({});
    }
    setIsBookingOpen(true);
  };

  // Handle service selection
  const handleSelectService = (service: ServiceItem) => {
    let type = 'food';
    if (service.id === 'medicines-pharma') type = 'medicine';
    else if (service.id === 'student-baggage') type = 'baggage';
    else if (service.id === 'express-documents') type = 'doc';
    else if (service.id === 'commercial-cargo') type = 'commercial';

    handleOpenBooking({ parcelType: type });
  };

  // Handle country selection from destinations
  const handleSelectCountry = (country: CountryRate) => {
    handleOpenBooking({ country: country.name });
  };

  // If user is viewing the internal Admin / Staff portal
  if (viewMode === 'admin' && currentUser) {
    return (
      <AdminDashboard
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigateToPublicWebsite={() => setViewMode('public')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Logged-In Admin Banner */}
      {currentUser && (
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white px-4 py-2 text-xs flex items-center justify-between border-b border-blue-900 sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold">Logged in as {currentUser.name}</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-700 text-white font-black">
                {currentUser.role}
              </span>
              <span className="hidden sm:inline text-slate-400">({currentUser.branchName})</span>
            </div>

            <button
              onClick={() => setViewMode('admin')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-black transition cursor-pointer shadow-xs"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Open Admin & Booking Portal</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Primary Sticky Header */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        lang={lang}
        setLang={setLang}
        onOpenBooking={() => handleOpenBooking()}
        onQuickTrack={handleSearchTracking}
        onOpenAdminLogin={() => {
          if (currentUser) {
            setViewMode('admin');
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onSearchTracking={handleSearchTracking}
          onOpenBooking={() => handleOpenBooking()}
          onOpenCalculator={handleOpenCalculator}
          lang={lang}
        />

        {/* Tracking Live Radar Section */}
        <TrackingSection
          initialTrackingCode={trackingCode}
          lang={lang}
        />

        {/* Dynamic Rate Calculator Section */}
        <RateCalculatorSection
          onOpenBookingWithDetails={handleOpenBooking}
          lang={lang}
        />

        {/* Core Services Section */}
        <ServicesSection
          onSelectService={handleSelectService}
          lang={lang}
        />

        {/* Global Destinations & Country Directory */}
        <DestinationsSection
          onSelectCountry={handleSelectCountry}
          lang={lang}
        />

        {/* Customs Documentation & KYC Guide */}
        <CustomsGuideSection
          lang={lang}
        />

        {/* Customer Reviews, FAQs & Direct Inquiries */}
        <TestimonialsFaqSection
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(sectionId) => {
          setActiveSection(sectionId);
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        lang={lang}
      />

      {/* Doorstep Pickup Modal */}
      <PickupBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialDetails={bookingDetails}
        lang={lang}
      />

      {/* Admin / Staff Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Quick Action Widget (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
        <button
          onClick={() => handleOpenBooking()}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs shadow-xl hover:bg-blue-700 hover:scale-105 transition cursor-pointer border border-white/20"
          id="floating-pickup-btn"
        >
          <CalendarClock className="w-4 h-4" />
          <span>Book Free Pickup</span>
        </button>

        <a
          href="https://wa.me/919820012345?text=Hello%20Vaishnavii%20International%20Courier,%20I%20want%20to%20send%20a%20parcel%20abroad."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 text-white font-bold text-xs shadow-2xl hover:bg-emerald-600 hover:scale-105 transition cursor-pointer border border-emerald-400"
          id="floating-whatsapp-btn"
          title="Direct WhatsApp Helpline"
        >
          <MessageSquare className="w-5 h-5 fill-white text-emerald-500" />
          <span className="hidden md:inline">WhatsApp Support</span>
        </a>
      </div>
    </div>
  );
}

