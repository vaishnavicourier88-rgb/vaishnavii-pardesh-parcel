import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  MapPin, 
  Clock, 
  Plane, 
  CheckCircle, 
  AlertCircle, 
  ShieldCheck, 
  Share2, 
  Printer, 
  ArrowRight,
  ExternalLink,
  Building,
  User,
  Scale,
  Calendar,
  Layers,
  Copy,
  Check
} from 'lucide-react';
import { ShipmentData } from '../types';
import { MOCK_SHIPMENTS } from '../data/mockData';

interface TrackingSectionProps {
  initialTrackingCode: string;
  lang: 'en' | 'hi';
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  initialTrackingCode,
  lang,
}) => {
  const [searchCode, setSearchCode] = useState(initialTrackingCode || 'VIC-98234IN');
  const [activeShipment, setActiveShipment] = useState<ShipmentData | null>(
    MOCK_SHIPMENTS[initialTrackingCode] || MOCK_SHIPMENTS['VIC-98234IN']
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCode = searchCode.trim().toUpperCase();
    if (!cleanCode) {
      setErrorMsg('Please enter a valid tracking number or AWB code.');
      return;
    }

    if (MOCK_SHIPMENTS[cleanCode]) {
      setActiveShipment(MOCK_SHIPMENTS[cleanCode]);
      setErrorMsg(null);
    } else {
      // Dynamic fallback shipment generation if user tests their own code
      const generatedShipment: ShipmentData = {
        trackingNumber: cleanCode,
        senderName: 'Authorized Client',
        senderCity: 'India Hub',
        senderCountry: 'India (IN)',
        receiverName: 'Overseas Recipient',
        receiverCity: 'International Destination Gateway',
        receiverCountry: 'Global Destination',
        status: 'In Transit',
        statusColor: 'bg-blue-500',
        serviceType: 'International Priority Cargo Express',
        weightKg: 3.5,
        pieces: 1,
        expectedDelivery: '3 - 5 Business Days',
        bookingDate: 'Recent Booking',
        lastUpdated: 'Just now',
        partnerNetwork: 'Vaishnavii Direct Express',
        originAirport: 'BOM / DEL International Hub',
        destinationAirport: 'Destination Port Hub',
        packageType: 'Secured Air Consignment',
        checkpoints: [
          {
            id: 'cp1',
            status: 'Shipment Booked & Collected',
            location: 'Vaishnavii Processing Hub, India',
            timestamp: 'Pickup Completed',
            description: 'Barcode assigned, weighed and processed for overseas air express dispatch.',
            completed: true,
          },
          {
            id: 'cp2',
            status: 'Export Customs Screening',
            location: 'Air Cargo Export Terminal',
            timestamp: 'In Process',
            description: 'Export clearance paperwork verified with shipping airway bill.',
            completed: true,
            current: true,
          },
          {
            id: 'cp3',
            status: 'Departing International Air Cargo Flight',
            location: 'Direct Airline Transit',
            timestamp: 'Scheduled',
            description: 'Transiting on international freight cargo carrier.',
            completed: false,
          },
          {
            id: 'cp4',
            status: 'Destination Port Delivery Handover',
            location: 'Destination Local Hub',
            timestamp: 'Pending',
            description: 'Local courier courier assigned for doorstep handover.',
            completed: false,
          },
        ],
      };
      setActiveShipment(generatedShipment);
      setErrorMsg(null);
    }
  };

  const handleCopy = () => {
    if (!activeShipment) return;
    navigator.clipboard.writeText(
      `Tracking Update for ${activeShipment.trackingNumber}: Status is [${activeShipment.status}] - Expected Delivery: ${activeShipment.expectedDelivery}. Tracked via Vaishnavii International Courier.`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sampleTrackingButtons = [
    { code: 'VIC-98234IN', label: 'USA Food Shipment', status: 'In Transit' },
    { code: 'VIC-88412UK', label: 'UK Urgent Medicines', status: 'Out for Delivery' },
    { code: 'VIC-55192CA', label: 'Canada Student Baggage', status: 'Delivered' },
  ];

  return (
    <section id="tracking" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Plane className="w-3.5 h-3.5" />
            <span>Real-Time Global Consignment Radar</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Track Your International Shipment
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Enter your Vaishnavii AWB, FedEx, DHL, or direct booking reference code to check live flight status, customs clearance, and delivery timeline.
          </p>
        </div>

        {/* Tracking Search Form */}
        <div className="max-w-3xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl shadow-lg border border-slate-200">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Consignment No. (e.g. VIC-98234IN)"
                className="w-full pl-12 pr-4 py-3 text-slate-900 font-mono text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                id="tracking-search-field"
              />
            </div>
            <button
              type="submit"
              id="tracking-submit-btn"
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs font-medium text-slate-500">Live Demonstrations:</span>
            {sampleTrackingButtons.map((btn) => (
              <button
                key={btn.code}
                onClick={() => {
                  setSearchCode(btn.code);
                  setActiveShipment(MOCK_SHIPMENTS[btn.code]);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border font-mono transition cursor-pointer flex items-center gap-1.5 ${
                  activeShipment?.trackingNumber === btn.code
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="font-semibold">{btn.code}</span>
                <span className="text-[11px] opacity-80">({btn.status})</span>
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Active Shipment Detail Dashboard */}
        {activeShipment && (
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden" id="shipment-status-card">
            {/* Top Status Header */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                    Airway Bill / Tracking ID
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {activeShipment.serviceType}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white mt-1">
                  {activeShipment.trackingNumber}
                </div>
              </div>

              {/* Status Badge & Action Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className={`px-4 py-2 rounded-xl text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm ${
                  activeShipment.status === 'Delivered' 
                    ? 'bg-emerald-600' 
                    : activeShipment.status === 'Out for Delivery'
                    ? 'bg-amber-600'
                    : 'bg-blue-600'
                }`}>
                  <Package className="w-5 h-5" />
                  <span>{activeShipment.status}</span>
                </div>

                <button
                  onClick={handleCopy}
                  title="Copy Tracking Summary"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer flex items-center gap-1 text-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Visual Origin to Destination Flight Path */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-6 py-6 text-white border-t border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Origin */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider">Origin</p>
                    <p className="text-base font-bold text-white">{activeShipment.senderCity}, {activeShipment.senderCountry}</p>
                    <p className="text-xs text-slate-400 font-mono">{activeShipment.originAirport}</p>
                  </div>
                </div>

                {/* Flight Animation Connector */}
                <div className="flex flex-col items-center justify-center text-center px-4">
                  <div className="flex items-center justify-center w-full gap-2 text-xs text-slate-300 mb-1">
                    <Plane className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Global Air Freight Route</span>
                  </div>
                  <div className="w-full h-1 bg-slate-700 rounded-full relative overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ 
                        width: activeShipment.status === 'Delivered' ? '100%' : activeShipment.status === 'Out for Delivery' ? '85%' : '55%' 
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Carrier Partner: <span className="text-white font-semibold">{activeShipment.partnerNetwork}</span>
                  </p>
                </div>

                {/* Destination */}
                <div className="flex items-center gap-3 md:justify-end">
                  <div className="md:text-right">
                    <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Destination</p>
                    <p className="text-base font-bold text-white">{activeShipment.receiverCity}, {activeShipment.receiverCountry}</p>
                    <p className="text-xs text-slate-400 font-mono">{activeShipment.destinationAirport}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-blue-500" /> Gross Weight
                </span>
                <span className="font-bold text-slate-900 text-base">{activeShipment.weightKg} kg ({activeShipment.pieces} Piece)</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" /> Expected Delivery
                </span>
                <span className="font-bold text-slate-900 text-base text-blue-700">{activeShipment.expectedDelivery}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-blue-500" /> Declared Content
                </span>
                <span className="font-bold text-slate-900 text-xs truncate block" title={activeShipment.packageType}>
                  {activeShipment.packageType}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-blue-500" /> Recipient
                </span>
                <span className="font-bold text-slate-900 text-sm truncate block">{activeShipment.receiverName}</span>
              </div>
            </div>

            {/* Detailed Timeline Checkpoints */}
            <div className="p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Shipment History & Checkpoints</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:top-3 before:bottom-3 before:left-4 before:w-0.5 before:bg-slate-200">
                {activeShipment.checkpoints.map((cp, idx) => (
                  <div key={cp.id} className="relative flex items-start gap-4 sm:gap-6">
                    {/* Checkpoint Dot */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      cp.completed 
                        ? cp.current 
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md animate-pulse' 
                          : 'bg-emerald-600 text-white' 
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {cp.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                      )}
                    </div>

                    {/* Checkpoint Content Box */}
                    <div className={`flex-1 p-4 rounded-xl border transition-all ${
                      cp.current 
                        ? 'bg-blue-50/70 border-blue-200 shadow-xs' 
                        : cp.completed 
                        ? 'bg-white border-slate-200' 
                        : 'bg-slate-50/50 border-slate-100 text-slate-400'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className={`text-base font-bold ${cp.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                          {cp.status}
                        </h4>
                        <span className="text-xs font-mono text-slate-500 bg-white sm:bg-transparent px-2 sm:px-0 py-0.5 rounded sm:rounded-none w-fit">
                          {cp.timestamp}
                        </span>
                      </div>
                      <p className={`text-xs font-medium ${cp.completed ? 'text-blue-700' : 'text-slate-400'} mb-1.5 flex items-center gap-1`}>
                        <MapPin className="w-3.5 h-3.5" />
                        {cp.location}
                      </p>
                      <p className={`text-xs ${cp.completed ? 'text-slate-600' : 'text-slate-400'}`}>
                        {cp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Proof of Delivery / Support CTA */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Protected by Vaishnavii 100% On-Time International Delivery Assurance</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/919820012345?text=Hello%20Vaishnavii%20Support,%20I%20am%20inquiring%20about%20my%20shipment%20${activeShipment.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Need Courier Assistance?</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
