import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Info, 
  FileSpreadsheet,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { PROHIBITED_ITEMS } from '../data/mockData';

interface CustomsGuideSectionProps {
  lang: 'en' | 'hi';
}

export const CustomsGuideSection: React.FC<CustomsGuideSectionProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'kyc' | 'prohibited' | 'food_rules'>('kyc');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const samplePackingList = `COMMERCIAL / NON-COMMERCIAL EXPORT PACKING INVOICE
Sender Name: [Your Name] | Contact: [Phone]
Sender Address: [Your City, India]
Receiver Name: [Overseas Recipient Name]
Receiver Address: [City, State/Province, Country, Zip Code]
Recipient Phone: [Recipient Overseas Mobile]

ITEMIZED CONTENT DECLARATION:
1. Homemade Sweets (Vacuum Sealed) - Qty: 2 kg - Value: INR 1200
2. Roasted Snacks / Namkeen - Qty: 1.5 kg - Value: INR 600
3. Cotton Garments (Personal Use) - Qty: 3 Pcs - Value: INR 1500
Total Declared Value: INR 3300
Declaration: The items contained in this package are for personal gifting/consumption and have no commercial value.`;

  const copyTemplate = () => {
    navigator.clipboard.writeText(samplePackingList);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <section id="customs-guide" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
            <span>International Compliance & Customs Clearance</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Customs Documentation & Packaging Guide
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We handle 100% of the airport customs paperwork and export certifications. Here is everything you need to know to ensure swift overseas clearance.
          </p>
        </div>

        {/* Interactive Guide Tabs */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1.5">
            <button
              onClick={() => setActiveTab('kyc')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'kyc'
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Required KYC & Documents</span>
            </button>

            <button
              onClick={() => setActiveTab('prohibited')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'prohibited'
                  ? 'bg-white text-rose-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Prohibited & Restricted Items</span>
            </button>

            <button
              onClick={() => setActiveTab('food_rules')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'food_rules'
                  ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Food & Medicine Guidelines</span>
            </button>
          </div>

          {/* Tab 1: KYC & Documents */}
          {activeTab === 'kyc' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black mb-3">
                    01
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Sender KYC Identification</h4>
                  <p className="text-xs text-slate-600">
                    Aadhaar Card, Passport Copy, or PAN Card of the sender in India (Govt. IATA compliance requirement).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black mb-3">
                    02
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Receiver Address & Mobile</h4>
                  <p className="text-xs text-slate-600">
                    Full overseas street address, Zip/Postal code, local receiver contact number, and email ID for delivery SMS.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black mb-3">
                    03
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Itemized Packing List</h4>
                  <p className="text-xs text-slate-600">
                    Detailed list of parcel items with quantities and approximate values for customs clearance invoice declaration.
                  </p>
                </div>
              </div>

              {/* Sample Invoice Template Box */}
              <div className="bg-slate-900 text-slate-200 p-5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4" />
                    Copyable Packing List Template for Customs
                  </span>
                  <button
                    onClick={copyTemplate}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTemplate ? 'Copied to Clipboard!' : 'Copy Template'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono bg-slate-950 p-3 rounded-lg overflow-x-auto text-slate-300 whitespace-pre-wrap">
                  {samplePackingList}
                </pre>
              </div>
            </div>
          )}

          {/* Tab 2: Prohibited Items */}
          {activeTab === 'prohibited' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Strict Aviation Safety & Customs Regulation Notice:</strong>
                  The following items cannot be shipped via commercial air freight under international civil aviation guidelines. Attempting to ship prohibited goods may lead to confiscation by airport security.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROHIBITED_ITEMS.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.category}</h4>
                      <p className="text-xs text-slate-600 mt-1">{item.items}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Food & Medicine Guidelines */}
          {activeTab === 'food_rules' && (
            <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Food Guide */}
                <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200">
                  <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">🍲</span>
                    <span>Homemade Food & Sweets Protocol</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Vacuum Sealing:</strong> All snacks, thepla, namkeen & sweets must be vacuum sealed in commercial airtight bags (provided free by Vaishnavii Courier).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Pickles & Ghee:</strong> Must be packed in sealed, leak-proof plastic jars with outer foam cushioning.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Shelf Life:</strong> Dry sweets and snacks with 30+ days ambient shelf life are approved for all countries.</span>
                    </li>
                  </ul>
                </div>

                {/* Medicine Guide */}
                <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200">
                  <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="text-xl">💊</span>
                    <span>Prescription Medicine Protocol</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Doctor's Prescription:</strong> Original or clear digital copy of a licensed MBBS doctor's prescription matching patient's name.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Pharmacy Bill:</strong> Original purchase tax invoice from a registered pharmacy chemist with batch numbers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>Quantity Limit:</strong> Up to 3 months (90 days) personal supply allowed under FDA and international patient care waivers.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
