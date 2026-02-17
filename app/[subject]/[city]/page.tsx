import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubjectCityPageClient from './SubjectCityPageClient';
import { SUBJECTS, UK_CITIES } from '@/lib/siteData';

interface Props { params: { subject: string; city: string } }

export async function generateStaticParams() {
  const params: { subject: string; city: string }[] = [];
  for (const subject of SUBJECTS) {
    for (const city of UK_CITIES) {
      params.push({ subject: subject.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  const city = UK_CITIES.find((c) => c.slug === params.city);
  if (!subject || !city) return {};
  return {
    title: `Free 11+ ${subject.label} Practice in ${city.label} | WhizPrep`,
    description: `Free 11+ ${subject.label} practice questions for families in ${city.label}. Exam-style questions aligned to grammar and independent school entrance exams, with instant explanations and progress tracking.`,
  };
}

export default function SubjectCityPage({ params }: Props) {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  const city = UK_CITIES.find((c) => c.slug === params.city);
  if (!subject || !city) notFound();
  return <SubjectCityPageClient subject={subject} city={city} allSubjects={SUBJECTS} allCities={UK_CITIES} />;
}
