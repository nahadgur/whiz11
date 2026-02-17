import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LocationPageClient from './LocationPageClient';
import { UK_CITIES, SUBJECTS } from '@/components/SiteNav';

interface Props { params: { city: string } }

export async function generateStaticParams() {
  return UK_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = UK_CITIES.find((c) => c.slug === params.city);
  if (!city) return {};
  return {
    title: `11+ Preparation in ${city.label} | Free Practice | WhizPrep`,
    description: `Free 11+ practice questions for families in ${city.label}. Prepare for grammar school and independent school entrance exams with WhizPrep — Maths, English, Verbal and Non-Verbal Reasoning.`,
  };
}

export default function LocationPage({ params }: Props) {
  const city = UK_CITIES.find((c) => c.slug === params.city);
  if (!city) notFound();
  return <LocationPageClient city={city} subjects={SUBJECTS} allCities={UK_CITIES} />;
}
