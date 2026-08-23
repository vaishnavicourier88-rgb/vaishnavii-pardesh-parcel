import React, { useState } from 'react';
import { 
  Star, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Quote,
  Sparkles,
  Send
} from 'lucide-react';
import { FAQS, TESTIMONIALS } from '../data/mockData';

interface TestimonialsFaqSectionProps {
  lang: 'en' | 'hi';
}

export const TestimonialsFaqSection: React.FC<TestimonialsFaqSectionProps> = ({ lang }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*NEW WEBSITE INQUIRY*%0A` +
      `*Name:* ${contactName}%0A` +
      `*Phone:* ${contactPhone}%0A` +
      `*Message:* ${contactMessage}`;
    window.open(`https://wa.me/919820012345?text=${text}`, '_blank');
    setContactSent(true);
  };

  return (
    <section id="faqs" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Block */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>15,000+ Happy NRI Families & Exporters</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Trusted by Customers Worldwide
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Read real stories from students, parents, and business owners who rely on Vaishnavii International Courier for safe, intact, on-time delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-blue-700 font-semibold">{t.city} ➔ {t.destination}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs & Direct Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* FAQ Accordions (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                Frequently Asked Questions
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Got Questions? We Have Answers.
              </h3>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-100 transition cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Inquiry Contact Box (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-1">
                24/7 International Desk
              </span>
              <h3 className="text-xl font-black text-white">
                Speak to a Courier Specialist
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Have custom weight, dangerous goods inquiries, or special export cargo requirements? We respond within 10 minutes.
              </p>
            </div>

            {/* Quick Contact Info */}
            <div className="space-y-2.5 text-xs text-slate-300">
              <a 
                href="mailto:vaishnavicourier88@gmail.com" 
                className="flex items-center gap-2.5 p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition"
              >
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span className="font-mono text-white">vaishnavicourier88@gmail.com</span>
              </a>

              <a 
                href="tel:+919820012345" 
                className="flex items-center gap-2.5 p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-white font-bold">+91 98200 12345 / 88000 54321</span>
              </a>
            </div>

            {/* Instant Message Form */}
            <form onSubmit={handleContactSubmit} className="space-y-3 pt-2">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder="Your WhatsApp / Mobile Number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Describe your parcel or destination..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Quick Query via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
