'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, MapPin, ChevronRight, CheckCircle, School, Building2 } from 'lucide-react';
import { SiteNav, LeadGenModal } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

const CITY_CONTENT: Record<string, { grammar?: string[]; independent?: string[]; blurb: string }> = {
  london: {
    grammar: ["Queen Elizabeth's Boys' School", "St Olave's Grammar", 'Wallington County Grammar', 'Tiffin School', 'Henrietta Barnett School'],
    independent: ["St Paul's School", 'Westminster School', "Alleyn's School", 'Dulwich College', 'City of London School'],
    blurb: 'London is the most competitive 11+ market in the UK, with selective grammar schools in Barnet, Sutton, Kingston and Bromley alongside world-renowned independent schools.',
  },
  manchester: {
    grammar: ['Altrincham Grammar School for Boys', 'Altrincham Grammar School for Girls', 'Sale Grammar School', 'Stretford Grammar School'],
    independent: ['Manchester Grammar School', "Withington Girls' School", 'Manchester High School for Girls'],
    blurb: "Greater Manchester has a strong tradition of grammar school education, particularly in Trafford, alongside some of the north's most academically selective independent schools.",
  },
  birmingham: {
    grammar: ['King Edward VI Camp Hill', 'Sutton Coldfield Grammar School', 'Handsworth Grammar School'],
    independent: ["King Edward's School Birmingham", 'Birmingham High School', 'Edgbaston High School'],
    blurb: "Birmingham's King Edward foundation operates some of the UK's most prestigious grammar schools, making 11+ preparation essential for families across the West Midlands.",
  },
  leeds: {
    grammar: ['Crossley Heath School', 'Heckmondwike Grammar School', 'Bradford Grammar School'],
    independent: ['Leeds Grammar School', "Wakefield Girls' High School", 'Woodhouse Grove School'],
    blurb: 'West Yorkshire has selective schools spread across Leeds, Bradford and Halifax, with strong demand for 11+ preparation across the region.',
  },
  default: { blurb: 'Families across the UK are competing for places at grammar and independent schools. WhizPrep gives your child the best possible preparation with exam-style questions, instant feedback and progress tracking.' },
};

interface SubjectData { slug: string; label: string; desc: string; color: string; bg: string; dot: string; icon?: React.ElementType }
interface CityData { slug: string; label: string }

export default function LocationPageClient({ city, subjects, allCities }: { city: CityData; subjects: SubjectData[]; allCities: CityData[] }) {
  const [showModal, setShowModal] = useState(false);
  const content = CITY_CONTENT[city.slug] || CITY_CONTENT.default;
  const handleModalSubmit = () => { setShowModal(false); window.location.href = '/'; };

  return (
    <div className="min-h-screen bg-white">
      <SiteNav ctaLabel="Start Free" ctaHref="/" />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 pt-20 pb-28 px-4 sm:px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] opacity-10" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6 bg-white/10 text-white border border-white/20">
            <MapPin size={14} /> {city.label}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
            11+ Preparation in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">{city.label}</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">{content.blurb}</p>
          <p className="text-slate-400 max-w-xl mx-auto mb-10 text-base">Practise with hundreds of free 11+ questions across Maths, English, Verbal and Non-Verbal Reasoning — aligned to the schools in {city.label} and surrounding areas.</p>
          <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-black text-lg rounded-2xl shadow-2xl hover:scale-105 transition-all">
            Start free practice <ArrowRight size={20} />
          </button>
          <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm font-semibold text-slate-400">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> No card needed</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> Free questions</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> All 4 subjects</span>
          </div>
        </div>
      </section>

      {(content.grammar || content.independent) && (
        <section className="py-20 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Schools in {city.label}</h2>
              <p className="text-slate-500 text-lg">Prepare specifically for local entrance exams.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.grammar && (
                <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center"><School size={20} /></div>
                    <h3 className="font-black text-slate-800 text-lg">Grammar Schools</h3>
                  </div>
                  <ul className="space-y-3">
                    {content.grammar.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-slate-600 text-sm font-medium">
                        <CheckCircle size={15} className="text-indigo-500 shrink-0 mt-0.5" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {content.independent && (
                <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><Building2 size={20} /></div>
                    <h3 className="font-black text-slate-800 text-lg">Independent Schools</h3>
                  </div>
                  <ul className="space-y-3">
                    {content.independent.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-slate-600 text-sm font-medium">
                        <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">11+ subjects for {city.label} students</h2>
            <p className="text-slate-500">Choose a subject to see topic guides, practice questions and exam tips.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {subjects.map((s, i) => (
              <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={`/${s.slug}/${city.slug}`} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all group">
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}><s.icon size={22} className={s.color} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">11+ {s.label} in {city.label}</div>
                    <div className="text-sm text-slate-400 font-medium">{s.desc}</div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Start your child's 11+ journey today</h2>
          <p className="text-indigo-100 text-lg mb-8">Hundreds of practice questions. Instant feedback. No card needed.</p>
          <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 font-black text-lg rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
            Try free now <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2">11+ prep across the UK</h2>
            <p className="text-slate-500 text-sm">Resources and guides for families in every major city.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {allCities.filter((c) => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/locations/${c.slug}`} className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 text-sm font-semibold transition-all group">
                <MapPin size={12} className="text-slate-300 group-hover:text-indigo-400 shrink-0" />{c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <LeadGenModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleModalSubmit} />
    </div>
  );
}
