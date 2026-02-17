'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight, Check, Star, MapPin, ChevronRight,
  BookOpen, Trophy, Target, Users, CheckCircle,
  Mail, Phone, User, Calendar, Lock, X, Rocket,
} from 'lucide-react';
import { SiteNav, LeadGenModal } from '../../../components/SiteNav';

// ── per-subject content ──────────────────────────────────────────────────────

const SUBJECT_CONTENT: Record<string, {
  topics: string[];
  heroStat: string;
  heroStatLabel: string;
  faqs: { q: string; a: string }[];
  color: string;
  gradient: string;
  lightBg: string;
}> = {
  maths: {
    topics: [
      'Number & Place Value', 'Addition & Subtraction', 'Multiplication & Division',
      'Fractions, Decimals & Percentages', 'Ratio & Proportion', 'Algebra & Sequences',
      'Geometry & Shapes', 'Measurement', 'Data Handling & Statistics', 'Problem Solving',
    ],
    heroStat: '1,200+', heroStatLabel: 'Maths practice questions',
    gradient: 'from-blue-600 to-cyan-500',
    color: 'text-blue-600', lightBg: 'bg-blue-50',
    faqs: [
      { q: 'What maths topics appear in 11+ exams?', a: 'The 11+ maths syllabus covers number, fractions, decimals, algebra, geometry, measurement and data. GL Assessment and CEM exams both test these areas, often in multi-step word problems.' },
      { q: 'What level is 11+ maths?', a: 'Questions typically go beyond the standard Year 6 curriculum. Top-scoring children are comfortable with Year 7 concepts including basic algebra, advanced fractions and speed-distance-time calculations.' },
      { q: 'How many maths questions are in the 11+ exam?', a: 'GL Assessment maths papers usually have 50 questions in 50 minutes. CEM exams combine maths with reasoning and vary by region, typically 45–60 questions.' },
      { q: 'How do I help my child with 11+ maths?', a: 'Daily 15-minute practice sessions beat occasional long sessions. Focus on weak topics, use timed practice to build speed, and review mistakes carefully rather than just marking answers right or wrong.' },
    ],
  },
  english: {
    topics: [
      'Reading Comprehension', 'Synonyms & Antonyms', 'Grammar & Punctuation',
      'Spelling', 'Vocabulary in Context', 'Cloze Passages', 'Shuffled Sentences',
      'Creative Writing', 'Persuasive Writing', 'Inference & Deduction',
    ],
    heroStat: '900+', heroStatLabel: 'English practice questions',
    gradient: 'from-emerald-600 to-teal-500',
    color: 'text-emerald-600', lightBg: 'bg-emerald-50',
    faqs: [
      { q: 'What English skills does the 11+ test?', a: 'Reading comprehension is the largest section — inference, vocabulary and retrieval. Grammar, punctuation, spelling and creative or persuasive writing also feature, depending on your target school.' },
      { q: 'How do I improve my child\'s vocabulary for the 11+?', a: 'Wide reading is the most effective long-term strategy. Supplement with daily word learning (10 new words per week), and practise using words in sentences rather than just memorising definitions.' },
      { q: 'Is creative writing in the 11+ exam?', a: 'Independent schools almost always include a writing task. Grammar school exams vary — GL Assessment usually has a shorter writing component, while some schools set a full creative writing paper.' },
      { q: 'How long should 11+ English preparation take?', a: 'Most families start 12–18 months before the exam. Six months of consistent practice is a reasonable minimum if your child is already a confident reader.' },
    ],
  },
  'verbal-reasoning': {
    topics: [
      'Letter Codes', 'Number Codes', 'Word Analogies', 'Odd One Out',
      'Word Relationships', 'Alphabetical Order', 'Hidden Words',
      'Compound Words', 'Logical Deduction', 'Sequences',
    ],
    heroStat: '800+', heroStatLabel: 'Verbal Reasoning questions',
    gradient: 'from-violet-600 to-purple-500',
    color: 'text-violet-600', lightBg: 'bg-violet-50',
    faqs: [
      { q: 'What is verbal reasoning in the 11+ exam?', a: 'Verbal reasoning tests the ability to understand and reason using words and language. Question types include codes, analogies, odd-one-out, word sequences and logical deduction — skills not usually taught in school.' },
      { q: 'Is verbal reasoning hard to learn?', a: 'Most children can improve significantly with practice because the question types follow predictable patterns. Spotting the pattern quickly is the core skill, which comes with repetition.' },
      { q: 'Do all 11+ exams include verbal reasoning?', a: 'GL Assessment exams always include a verbal reasoning paper. CEM exams blend verbal reasoning with English comprehension rather than separating them. Independent school exams vary by school.' },
      { q: 'How long does it take to prepare for verbal reasoning?', a: 'Most children need 6–12 months of regular practice. Start with understanding each question type, then build speed through timed practice.' },
    ],
  },
  'non-verbal-reasoning': {
    topics: [
      'Matrices', 'Series & Sequences', 'Analogies', 'Similarities & Differences',
      'Reflections & Rotations', 'Nets & 3D Shapes', 'Codes', 'Odd Shape Out',
      'Spatial Reasoning', 'Pattern Completion',
    ],
    heroStat: '750+', heroStatLabel: 'Non-Verbal Reasoning questions',
    gradient: 'from-amber-500 to-orange-500',
    color: 'text-amber-600', lightBg: 'bg-amber-50',
    faqs: [
      { q: 'What is non-verbal reasoning?', a: 'Non-verbal reasoning uses shapes and patterns rather than words or numbers. It tests abstract thinking and spatial awareness — following a pattern in a series, identifying the odd shape out, or completing a matrix.' },
      { q: 'Can you improve at non-verbal reasoning?', a: 'Yes — while it has a natural ability component, consistent practice with each question type dramatically improves speed and accuracy. Most children find certain question types much harder than others, so targeted practice helps.' },
      { q: 'Which schools test non-verbal reasoning?', a: 'GL Assessment grammar school exams almost always include NVR. Some CEM regions include it. Independent schools increasingly use NVR as part of their own assessments or the ISEB Pre-Test.' },
      { q: 'My child struggles with shapes and patterns — what should I do?', a: 'Start with one question type at a time. Use physical shapes and paper folding to build spatial intuition before moving to printed questions. WhizPrep\'s explanations break down each pattern step-by-step.' },
    ],
  },
};

// ── component ────────────────────────────────────────────────────────────────

interface SubjectData {
  slug: string;
  label: string;
  desc: string;
  color: string;
  bg: string;
  dot: string;
  icon: React.ElementType;
}

interface CityData {
  slug: string;
  label: string;
}

export default function SubjectPageClient({
  subject,
  cities,
}: {
  subject: SubjectData;
  cities: CityData[];
}) {
  const [showModal, setShowModal] = useState(false);
  const content = SUBJECT_CONTENT[subject.slug];

  const handleModalSubmit = () => {
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteNav ctaLabel="Start Free" ctaHref="/" />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pt-20 pb-28 px-4 sm:px-6">
        {/* background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-gradient-to-r ${content.gradient}`} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600 rounded-full blur-[100px] opacity-10" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6 ${content.lightBg} ${content.color} border border-current/20`}>
            <subject.icon size={15} />
            Free 11+ {subject.label} Practice
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
            Free 11+ <span className={`text-transparent bg-clip-text bg-gradient-to-r ${content.gradient}`}>{subject.label}</span> Practice Questions
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hundreds of exam-style questions, instant explanations and progress tracking. Aligned to GL Assessment, CEM and independent school formats.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { val: content.heroStat, label: content.heroStatLabel },
              { val: '4 exam', label: 'question formats' },
              { val: 'Instant', label: 'explanations' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.val}</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-black text-lg rounded-2xl shadow-2xl hover:scale-105 hover:shadow-white/20 transition-all"
          >
            Start practising free <ArrowRight size={20} />
          </button>

          <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm font-semibold text-slate-400">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> No card needed</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> Instant access</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> Free practice questions</span>
          </div>
        </div>
      </section>

      {/* ── Topics covered ── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              {subject.label} topics covered
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Every topic that appears in the 11+ exam, with questions at the right level of difficulty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.topics.map((topic, i) => (
              <motion.button
                key={topic}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setShowModal(true)}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all group text-left"
              >
                <div className={`w-8 h-8 rounded-xl ${content.lightBg} flex items-center justify-center shrink-0`}>
                  <div className={`w-2 h-2 rounded-full ${content.dot}`} />
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors text-sm flex-1">{topic}</span>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why WhizPrep ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              Why WhizPrep for 11+ {subject.label}?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Exam-aligned questions', desc: `Every ${subject.label} question is written to match the style and difficulty of GL Assessment, CEM and independent school papers.`, color: 'bg-indigo-100 text-indigo-600' },
              { icon: Trophy, title: 'Instant explanations', desc: 'After every answer, your child sees a clear step-by-step explanation — building understanding, not just marking answers right or wrong.', color: 'bg-amber-100 text-amber-600' },
              { icon: BookOpen, title: 'Progress tracking', desc: `See exactly which ${subject.label} topics your child has mastered and which need more work, so practice time is never wasted.`, color: 'bg-emerald-100 text-emerald-600' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-5`}>
                  <f.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA mid-page ── */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to practise 11+ {subject.label}?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Join thousands of families preparing for grammar and independent school entrance exams.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 font-black text-lg rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
          >
            Start free trial <ArrowRight size={20} />
          </button>
          <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm font-semibold text-indigo-200">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> No card needed</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> 50 free questions</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> Instant access</span>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-3">
              11+ {subject.label} — common questions
            </h2>
          </div>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
              >
                <h3 className="font-bold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practise by city ── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-3">
              11+ {subject.label} prep by city
            </h2>
            <p className="text-slate-500">Find local resources and connect with tutors in your area.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${subject.slug}/${city.slug}`}
                className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-sm font-semibold transition-all group"
              >
                <MapPin size={13} className="text-slate-300 group-hover:text-indigo-400 shrink-0" />
                {city.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900">What parents say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', role: 'Mother of Year 5 student', text: `My daughter went from dreading ${subject.label} practice to actually asking to do it. The explanations make everything click.` },
              { name: 'James T.', role: 'Father, Leeds', text: `We tried several apps but WhizPrep's ${subject.label} questions are the closest to the actual exam style. Really helped with exam technique.` },
              { name: 'Priya K.', role: 'Mother, London', text: 'The progress tracking showed us exactly where to focus. We stopped wasting time on topics he already knew.' },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />

      <LeadGenModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleModalSubmit} />
    </div>
  );
}
