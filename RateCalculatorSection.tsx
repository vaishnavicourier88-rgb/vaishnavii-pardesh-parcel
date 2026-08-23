import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Globe, 
  Scale, 
  Box, 
  Sparkles, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  Check, 
  Zap, 
  ShieldAlert, 
  Layers, 
  ArrowRight,
  Info,
  CalendarCheck
} from 'lucide-react';
import { POPULAR_COUNTRIES } from '../data/mockData';

interface RateCalculatorSectionProps {
  onOpenBookingWithDetails?: (details: { country: string; weight: number; parcelType: string }) => void;
  lang: 'en' | 'hi';
}

export const RateCalculatorSection: React.FC<RateCalculatorSectionProps> = ({
  onOpenBookingWithDetails,
  lang,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState('usa');
  const [parcelType, setParcelType] = useState('food'); // 'doc', 'food', 'medicine', 'baggage', 'commercial'
  const [actualWeight, setActualWeight] = useState<number>(5);
  const [useDimensions, setUseDimensions] = useState(false);
  const [lengthCm, setLengthCm] = useState<number>(30);
  const [widthCm, setWidthCm] = useState<number>(25);
  const [heightCm, setHeightCm] = useState<number>(20);
  const [serviceSpeed, setServiceSpeed] = useState<'express' | 'economy'>('express');
  const [needVacuumPacking, setNeedVacuumPacking] = useState(true);
  const [needInsurance, setNeedInsurance] = useState(false);

  // Find country
  const selectedCountry = useMemo(() => {
    return POPULAR_COUNTRIES.find((c) => c.id === selectedCountryId) || POPULAR_COUNTRIES[0];
  }, [selectedCountryId]);

  // Calculate Volumetric Weight
  const volumetricWeight = useMemo(() => {
    if (!useDimensions) return 0;
    const vol = (lengthCm * widthCm * heightCm) / 5000;
    return parseFloat(vol.toFixed(2));
  }, [useDimensions, lengthCm, widthCm, heightCm]);

  // Chargeable Weight = MAX(Actual, Volumetric)
  const chargeableWeight = useMemo(() => {
    const rawWeight = useDimensions ? Math.max(actualWeight, volumetricWeight) : actualWeight;
    // Round to nearest 0.5 kg for international airline tariff standards
    return Math.max(0.5, Math.ceil(rawWeight * 2) / 2);
  }, [actualWeight, volumetricWeight, useDimensions]);

  // Calculation Breakdown
  const quote = useMemo(() => {
    let ratePerKg = selectedCountry.baseRatePerKg;
    let baseRate = 0;

    if (parcelType === 'doc') {
      // Document special flat slabs
      baseRate = selectedCountry.docRate + (chargeableWeight > 0.5 ? (chargeableWeight - 0.5) * (ratePerKg * 0.8) : 0);
    } else if (parcelType === 'medicine') {
      // Medicine handling charges
      ratePerKg += 120;
      baseRate = chargeableWeight * ratePerKg + 600; // Doctor verification & customs paperwork fee
    } else if (parcelType === 'food') {
      // Food shipment
      baseRate = chargeableWeight * ratePerKg;
      if (needVacuumPacking) baseRate += Math.min(chargeableWeight * 40, 300);
    } else if (parcelType === 'baggage') {
      // High volume student baggage gets bulk discount
      const discount = chargeableWeight >= 15 ? 0.85 : chargeableWeight >= 10 ? 0.90 : 0.95;
      baseRate = chargeableWeight * (ratePerKg * discount);
    } else {
      // Commercial cargo
      const bulkFactor = chargeableWeight >= 25 ? 0.80 : 0.90;
      baseRate = chargeableWeight * (ratePerKg * bulkFactor);
    }

    // Express vs Economy multiplier
    if (serviceSpeed === 'express') {
      baseRate *= 1.15;
    } else {
      baseRate *= 0.92;
    }

    // Transit insurance
    const insuranceFee = needInsurance ? Math.max(250, Math.round(baseRate * 0.03)) : 0;
    
    // Fuel & handling surcharge (12%)
    const fuelSurcharge = Math.round(baseRate * 0.12);
    
    // GST (18%)
    const subtotal = Math.round(baseRate + fuelSurcharge + insuranceFee);
    const gst = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + gst;

    return {
      chargeableWeight,
      baseFreight: Math.round(baseRate),
      fuelSurcharge,
      insuranceFee,
      gst,
      totalAmount,
      deliveryDays: serviceSpeed === 'express' ? selectedCountry.expressDays : selectedCountry.economyDays,
    };
  }, [selectedCountry, parcelType, chargeableWeight, serviceSpeed, needVacuumPacking, needInsurance]);

  // WhatsApp formatted quote
  const generateWhatsAppMessage = () => {
    const text = `*VAISHNAVII INTERNATIONAL COURIER ENQUIRY*%0A` +
      `--------------------------------%0A` +
      `*Destination:* ${selectedCountry.name} (${selectedCountry.flag})%0A` +
      `*Parcel Category:* ${parcelType.toUpperCase()}%0A` +
      `*Chargeable Weight:* ${quote.chargeableWeight} kg%0A` +
      `*Service Speed:* ${serviceSpeed.toUpperCase()} (${quote.deliveryDays})%0A` +
      `*Estimated Price:* ₹${quote.totalAmount.toLocaleString('en-IN')}%0A` +
      `--------------------------------%0A` +
      `Please confirm pickup availability and schedule doorstep collection.`;
    return `https://wa.me/919820012345?text=${text}`;
  };

  return (
    <section id="calculator" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Tariff & Volumetric Calculator</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Calculate International Courier Rates
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Transparent pricing with zero hidden charges. Choose your destination country and weight to view instant quotes for express and economy flights.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            {/* 1. Destination Country */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Destination Country
              </label>
              <div className="relative">
                <select
                  value={selectedCountryId}
                  onChange={(e) => setSelectedCountryId(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm font-semibold rounded-xl p-3.5 pl-4 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-xs"
                  id="calc-destination-country"
                >
                  {POPULAR_COUNTRIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.name} — ({c.expressDays} Express)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Parcel Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Select Parcel Contents
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'food', label: 'Homemade Food & Sweets', icon: '🍲' },
                  { id: 'medicine', label: 'Prescription Medicines', icon: '💊' },
                  { id: 'baggage', label: 'Student Excess Baggage', icon: '🎒' },
                  { id: 'doc', label: 'Documents / Transcripts', icon: '📄' },
                  { id: 'commercial', label: 'Commercial Cargo / Export', icon: '📦' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setParcelType(item.id)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                      parcelType === item.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-semibold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="text-xs leading-snug">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Weight Inputs (Actual vs Volumetric) */}
            <div className="bg-white p-4.5 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-600" />
                  3. Weight & Box Dimensions
                </span>
                <button
                  type="button"
                  onClick={() => setUseDimensions(!useDimensions)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer"
                >
                  {useDimensions ? 'Hide Dimensions (Gross Weight Only)' : '+ Add Box Dimensions (L x W x H)'}
                </button>
              </div>

              {/* Actual Gross Weight Slider / Input */}
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Actual Scale Weight:</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">{actualWeight} kg</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.5"
                    max="50"
                    step="0.5"
                    value={actualWeight}
                    onChange={(e) => setActualWeight(parseFloat(e.target.value))}
                    className="w-full accent-blue-600"
                    id="calc-weight-slider"
                  />
                  <div className="flex items-center gap-1 shrink-0">
                    <input
                      type="number"
                      min="0.1"
                      max="200"
                      step="0.5"
                      value={actualWeight}
                      onChange={(e) => setActualWeight(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                      className="w-20 p-2 border border-slate-300 rounded-lg text-center font-bold text-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      id="calc-weight-number-input"
                    />
                    <span className="text-xs font-bold text-slate-500">kg</span>
                  </div>
                </div>
              </div>

              {/* Optional Dimensions Fields */}
              {useDimensions && (
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-2">
                    Enter package box dimensions in centimeters (IATA standard: L × W × H ÷ 5000):
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">Length (cm)</label>
                      <input
                        type="number"
                        value={lengthCm}
                        onChange={(e) => setLengthCm(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full p-2 border border-slate-300 rounded-lg text-center text-sm font-semibold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">Width (cm)</label>
                      <input
                        type="number"
                        value={widthCm}
                        onChange={(e) => setWidthCm(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full p-2 border border-slate-300 rounded-lg text-center text-sm font-semibold text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 font-medium mb-1">Height (cm)</label>
                      <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full p-2 border border-slate-300 rounded-lg text-center text-sm font-semibold text-slate-800"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-600 bg-slate-100 p-2 rounded-lg flex items-center justify-between">
                    <span>Volumetric Weight: <strong className="text-slate-900">{volumetricWeight} kg</strong></span>
                    <span className="text-blue-700 font-semibold">Billable: {chargeableWeight} kg</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Speed & Value Added Add-ons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Service Speed */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Delivery Speed
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceSpeed('express')}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                      serviceSpeed === 'express'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300" />
                    <span>Priority ({selectedCountry.expressDays})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceSpeed('economy')}
                    className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                      serviceSpeed === 'economy'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>Economy ({selectedCountry.economyDays})</span>
                  </button>
                </div>
              </div>

              {/* Addons checkbox */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col justify-center gap-2">
                {parcelType === 'food' && (
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={needVacuumPacking}
                      onChange={(e) => setNeedVacuumPacking(e.target.checked)}
                      className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                    />
                    <span>Include Commercial Vacuum Packing</span>
                  </label>
                )}
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={needInsurance}
                    onChange={(e) => setNeedInsurance(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                  />
                  <span>Comprehensive Transit Insurance</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary Quotation Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-blue-800 shadow-xl space-y-6 sticky top-24">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  Estimated Air Freight Quotation
                </span>
                <span className="text-2xl">{selectedCountry.flag}</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                {selectedCountry.name}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Estimated Transit: <strong className="text-amber-300">{quote.deliveryDays}</strong> (Doorstep Delivery)
              </p>
            </div>

            {/* Big Total Price Highlight */}
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/15">
              <span className="text-xs text-slate-300 block">Total All-Inclusive Estimated Cost:</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                  ₹{quote.totalAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  (₹{Math.round(quote.totalAmount / quote.chargeableWeight)}/kg effective)
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-1">
                *Includes Free Doorstep Pickup, Packaging Assistance & Customs Clearance
              </span>
            </div>

            {/* Price Itemized Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-white/10 pt-4 text-slate-300">
              <div className="flex justify-between">
                <span>Billable / Chargeable Weight:</span>
                <span className="font-bold text-white font-mono">{quote.chargeableWeight} kg</span>
              </div>
              <div className="flex justify-between">
                <span>Base Air Cargo Freight:</span>
                <span className="font-mono text-white">₹{quote.baseFreight.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Airline Fuel & Security Surcharge (12%):</span>
                <span className="font-mono text-white">₹{quote.fuelSurcharge.toLocaleString('en-IN')}</span>
              </div>
              {quote.insuranceFee > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>Transit Loss Insurance:</span>
                  <span className="font-mono">₹{quote.insuranceFee.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (18% Export Tariff):</span>
                <span className="font-mono text-white">₹{quote.gst.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-instant-quote-btn"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition duration-150 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Quotation on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  if (onOpenBookingWithDetails) {
                    onOpenBookingWithDetails({
                      country: selectedCountry.name,
                      weight: quote.chargeableWeight,
                      parcelType: parcelType,
                    });
                  }
                }}
                id="calc-book-pickup-btn"
                className="w-full py-3 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-blue-300" />
                <span>Schedule Free Doorstep Pickup Now</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-800/40 p-2.5 rounded-lg">
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                Final price may vary slightly depending on exact destination remote area pin codes. Pickup executive will verify weight on electronic digital scale.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
