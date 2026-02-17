import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubjectPageClient from './SubjectPageClient';
import { SUBJECTS, UK_CITIES } from '../../../components/SiteNav';

interface Props {
  params: { subject: string };
}

export async function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) return {};
  return {
    title: `Free 11+ ${subject.label} Practice Questions | WhizPrep`,
    description: `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by 2,500+ UK families preparing for grammar and independent school entrance exams.`,
    openGraph: {
      title: `Free 11+ ${subject.label} Practice | WhizPrep`,
      description: `Free 11+ ${subject.label} practice questions for grammar and independent school entrance exams.`,
    },
  };
}

export default function SubjectPage({ params }: Props) {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) notFound();
  return <SubjectPageClient subject={subject} cities={UK_CITIES} />;
}
