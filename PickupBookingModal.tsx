import React, { useState } from 'react';
import { 
  X, 
  CalendarClock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Scale, 
  Box, 
  CheckCircle2, 
  Send, 
  MessageSquare,
  ShieldCheck,
  Check,
  FileText
} from 'lucide-react';
import { POPULAR_COUNTRIES } from '../data/mockData';
import { PickupBookingRequest } from '../types';

interface PickupBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDetails?: {
    country?: string;
    weight?: number;
    parcelType?: string;
  };
  lang: 'en' | 'hi';
}

export const PickupBookingModal: React.FC<PickupBookingModalProps> = ({
  isOpen,
  onClose,
  initialDetails,
  lang,
}) => {
  const [formData, setFormData] = useState<PickupBookingRequest>({
    fullName: '',
    phone: '',
    email: '',
    pickupAddress: '',
    pickupCity: '',
    pickupPincode: '',
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTimeSlot: '10:00 AM - 01:00 PM (Morning Slot)',
    destinationCountry: initialDetails?.country || 'United States (USA)',
    parcelType: initialDetails?.parcelType || 'food',
    approxWeightKg: initialDetails?.weight || 5,
    specialInstructions: '',
    requiresPackaging: true,
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomId = 'VIC-PK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setBookingConfirmed(true);
  };

  const getWhatsAppSyncUrl = () => {
    const text = `*NEW DOORSTEP PICKUP BOOKING - ${bookingId}*%0A` +
      `------------------------------------%0A` +
      `*Client:* ${formData.fullName} (%2B91 ${formData.phone})%0A` +
      `*Address:* ${formData.pickupAddress}, ${formData.pickupCity} - ${formData.pickupPincode}%0A` +
      `*Pickup Date/Slot:* ${formData.pickupDate} (${formData.pickupTimeSlot})%0A` +
      `*Destination:* ${formData.destinationCountry}%0A` +
      `*Parcel Type:* ${formData.parcelType.toUpperCase()}%0A` +
      `*Approx Weight:* ${formData.approxWeightKg} kg%0A` +
      `*Needs Packaging:* ${formData.requiresPackaging ? 'YES (Free Export Packing)' : 'NO'}%0A` +
      `*Instructions:* ${formData.specialInstructions || 'N/A'}%0A` +
      `------------------------------------%0A` +
      `Please assign local pickup executive immediately.`;
    return `https://wa.me/919820012345?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                Book Free Doorstep Pickup
              </h3>
              <p className="text-xs text-slate-300">
                100% Free Doorstep Pickup & Digital Weight Verification Across India
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {!bookingConfirmed ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Step 1: Personal Contact */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-2">
                1. Sender & Contact Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Pickup Location */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-2">
                2. Pickup Address in India
              </span>
              <div className="space-y-3">
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat No, Building Name, Street & Landmark..."
                    value={formData.pickupAddress}
                    onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="City (e.g. Mumbai, Delhi, Surat)"
                      value={formData.pickupCity}
                      onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Pincode (e.g. 400001)"
                      value={formData.pickupPincode}
                      onChange={(e) => setFormData({ ...formData, pickupPincode: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Destination & Parcel Specs */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-2">
                3. Shipment Specifications
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Destination Country</label>
                  <select
                    value={formData.destinationCountry}
                    onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Parcel Contents</label>
                  <select
                    value={formData.parcelType}
                    onChange={(e) => setFormData({ ...formData, parcelType: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="food">🍲 Homemade Food & Sweets</option>
                    <option value="medicine">💊 Prescription Medicines</option>
                    <option value="baggage">🎒 Student Baggage & Clothes</option>
                    <option value="doc">📄 Urgent Documents / Transcripts</option>
                    <option value="commercial">📦 Commercial Goods / Samples</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Approx Gross Weight (kg)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={formData.approxWeightKg}
                    onChange={(e) => setFormData({ ...formData, approxWeightKg: parseFloat(e.target.value) || 1 })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Pickup Date</label>
                  <input
                    type="date"
                    required
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Time Window</label>
                  <select
                    value={formData.pickupTimeSlot}
                    onChange={(e) => setFormData({ ...formData, pickupTimeSlot: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="10:00 AM - 01:00 PM (Morning Slot)">10:00 AM - 01:00 PM (Morning Slot)</option>
                    <option value="01:00 PM - 05:00 PM (Afternoon Slot)">01:00 PM - 05:00 PM (Afternoon Slot)</option>
                    <option value="05:00 PM - 08:30 PM (Evening Slot)">05:00 PM - 08:30 PM (Evening Slot)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Packaging checkbox */}
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <label className="flex items-center gap-2.5 text-xs text-blue-950 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requiresPackaging}
                  onChange={(e) => setFormData({ ...formData, requiresPackaging: e.target.checked })}
                  className="rounded text-blue-600 accent-blue-600 w-4 h-4"
                />
                <span>Free Export Packaging Required (Vacuum Packing / 7-Ply Heavy Box)</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="submit-pickup-booking-btn"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base shadow-lg shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm & Schedule Free Pickup</span>
                <Send className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero upfront booking fee. Payment only after weighing at pickup.</span>
              </p>
            </div>
          </form>
        ) : (
          /* Confirmation Receipt View */
          <div className="p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Doorstep Pickup Scheduled Successfully!
              </span>
              <h4 className="text-2xl font-black text-slate-900 mt-1">
                Booking ID: {bookingId}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Our logistics executive will arrive at your address on <strong>{formData.pickupDate}</strong> during <strong>{formData.pickupTimeSlot}</strong>.
              </p>
            </div>

            {/* Summary Details Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Sender Name:</span>
                <span className="font-bold text-slate-900">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact:</span>
                <span className="font-bold text-slate-900">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-blue-700">{formData.destinationCountry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Weight:</span>
                <span className="font-bold text-slate-900">{formData.approxWeightKg} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-medium text-slate-800 text-right truncate max-w-[200px]">{formData.pickupAddress}, {formData.pickupCity}</span>
              </div>
            </div>

            {/* WhatsApp Sync Button */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppSyncUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm Pickup on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
