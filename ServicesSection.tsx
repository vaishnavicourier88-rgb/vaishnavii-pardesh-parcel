import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Pill, 
  GraduationCap, 
  FileText, 
  PlaneTakeoff, 
  Package, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Zap,
  Box
} from 'lucide-react';
import { SERVICES_LIST } from '../data/mockData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  lang: 'en' | 'hi';
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  lang,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-amber-500" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-rose-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-indigo-500" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-blue-500" />;
      case 'PlaneTakeoff':
        return <PlaneTakeoff className="w-6 h-6 text-emerald-500" />;
      default:
        return <Package className="w-6 h-6 text-purple-500" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Specialized Overseas Dispatch</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Our International Courier Services
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Engineered specifically for Indian families, NRI students, medical patients, and export businesses with specialized packaging and seamless customs paperwork.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between group"
              id={`service-card-${service.id}`}
            >
              <div>
                {/* Top Icon & Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-13 h-13 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-3 group-hover:scale-105 group-hover:bg-blue-50 group-hover:border-blue-200 transition-transform">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 text-right leading-tight">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                {service.hindiTitle && (
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {service.hindiTitle}
                  </p>
                )}

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Transit time pill */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Transit Time: {service.deliveryTime}</span>
                </div>

                {/* Suitable Items */}
                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-700 block mb-1">Items Handled:</span>
                  <span className="text-slate-600 leading-normal">{service.suitableFor}</span>
                </div>

                {/* Features List */}
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-800 group-hover:text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Book This Courier Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Free Packaging Callout Box */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-blue-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-lg">
              <Box className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">
                100% Free International Export Packaging at Doorstep
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                We bring heavy-duty 7-ply corrugated export cartons, commercial vacuum-sealing machines for food items, and bubble protection directly to your home at zero extra charge.
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/919820012345?text=Hello%20Vaishnavii%20Courier,%20I%20need%20doorstep%20packaging%20for%20my%20international%20shipment."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-xl transition shrink-0 flex items-center gap-2 shadow-md cursor-pointer"
          >
            <span>Request Packaging Team</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
