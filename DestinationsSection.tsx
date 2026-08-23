import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  Clock, 
  ShieldCheck, 
  Check, 
  X, 
  ArrowUpRight, 
  Plane, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { POPULAR_COUNTRIES } from '../data/mockData';
import { CountryRate } from '../types';

interface DestinationsSectionProps {
  onSelectCountry: (country: CountryRate) => void;
  lang: 'en' | 'hi';
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onSelectCountry,
  lang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('All');

  const regions = ['All', 'North America', 'Europe', 'Middle East', 'Oceania', 'Asia', 'Africa'];

  const filteredCountries = useMemo(() => {
    return POPULAR_COUNTRIES.filter((country) => {
      const matchSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          country.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRegion = activeRegion === 'All' || country.region === activeRegion;
      return matchSearch && matchRegion;
    });
  }, [searchQuery, activeRegion]);

  return (
    <section id="destinations" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>220+ Countries Worldwide Network</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Popular Global Destinations & Rates
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Daily air freight connections from major Indian cargo terminals to USA, UK, Canada, Australia, Europe, UAE, and 200+ other destinations.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Region Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            {regions.map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setActiveRegion(reg)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeRegion === reg
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country (e.g. USA, UK)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Flag + Country Name */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-blue-600 transition">
                        {country.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">{country.region}</span>
                    </div>
                  </div>
                </div>

                {/* Rate & Transit Info */}
                <div className="space-y-2 py-3 border-y border-slate-200/80 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Starting From:</span>
                    <span className="font-black text-slate-900 font-mono text-sm text-blue-700">
                      ₹{country.baseRatePerKg} <span className="text-[10px] font-normal text-slate-500">/ kg</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Express Flight Transit:</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {country.expressDays}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Document Slab (0.5kg):</span>
                    <span className="font-mono text-slate-700 font-semibold">₹{country.docRate}</span>
                  </div>
                </div>

                {/* Badges: Allowed categories */}
                <div className="pt-3 flex flex-wrap gap-1.5 text-[11px]">
                  <span className={`px-2 py-0.5 rounded-md flex items-center gap-1 ${
                    country.foodAllowed 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {country.foodAllowed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    Food Allowed
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Medicines OK
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => onSelectCountry(country)}
                  className="w-full py-2 px-3 rounded-lg bg-white group-hover:bg-blue-600 text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-blue-600 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>Select & Calculate Rate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <Globe className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-700 font-bold">No countries found matching "{searchQuery}"</p>
            <p className="text-xs text-slate-500 mt-1">
              We ship to 220+ countries. Contact our helpline at +91 98200 12345 for custom country tariffs.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
