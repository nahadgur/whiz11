'use client';

import React, { useState, useEffect } from 'react';
import { Subject, Screen, UserStats, Badge, QuizResult, SchoolType, QuizMode, Theme, QuizType } from '../types';
import { Header } from '../components/Header';
import { Dashboard } from '../components/Dashboard';
import { TopicSelectScreen } from '../components/TopicSelectScreen';
import { QuizArea } from '../components/QuizArea';
import { ResultsScreen } from '../components/ResultsScreen';
import { ReviewScreen } from '../components/ReviewScreen';
import { ProgressScreen } from '../components/ProgressScreen';
import { LeaderboardScreen } from '../components/LeaderboardScreen';
import { OnboardingScreen } from '../components/OnboardingScreen';
import { ThemeSelector } from '../components/ThemeSelector';
import { LandingPage } from '../components/LandingPage';
import confetti from 'canvas-confetti';

const INITIAL_BADGES: Badge[] = [
  { id: '1', name: 'First Steps', description: 'Complete your first quiz', iconName: 'rocket', color: 'blue', unlocked: false },
  { id: '2', name: 'High Five', description: 'Complete 5 quizzes', iconName: 'star', color: 'yellow', unlocked: false },
  { id: '3', name: 'Maths Whizz', description: 'Get full marks in Maths', iconName: 'brain', color: 'purple', unlocked: false },
  { id: '4', name: 'Speedster', description: 'Finish an exam quiz in under 30 seconds', iconName: 'zap', color: 'orange', unlocked: false },
  { id: '5', name: 'Champion', description: 'Reach 1,000 Stars', iconName: 'trophy', color: 'green', unlocked: false },
];

const THEME_STYLES: Record<Theme, string> = {
  default: "bg-[#f3f4f6] bg-[radial-gradient(at_0%_0%,_hsla(253,16%,7%,0)_0,_hsla(253,16%,7%,0)_50%),_radial-gradient(at_40%_20%,_hsla(260,100%,90%,1)_0,_hsla(260,100%,90%,0)_50%),_radial-gradient(at_80%_0%,_hsla(189,100%,90%,1)_0,_hsla(189,100%,90%,0)_50%),_radial-gradient(at_0%_50%,_hsla(340,100%,90%,1)_0,_hsla(340,100%,90%,0)_50%)]",
  ocean: "bg-cyan-50 bg-[radial-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-200 via-sky-100 to-blue-50",
  jungle: "bg-emerald-50 bg-[radial-gradient(at_top_left,_var(--tw-gradient-stops))] from-emerald-200 via-green-100 to-lime-50",
  sunset: "bg-orange-50 bg-[radial-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-orange-200 via-rose-100 to-amber-50",
  midnight: "bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black",
};

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [quizMode, setQuizMode] = useState<QuizMode>('exam');
  const [quizType, setQuizType] = useState<QuizType>('multiple-choice');
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const [theme, setTheme] = useState<Theme>('default');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  const [stats, setStats] = useState<UserStats>({
    targetSchool: null,
    stars: 0,
    streak: 1,
    completedQuizzes: 0,
    totalTimePlayed: 0,
    badges: INITIAL_BADGES,
    progress: {}
  });
  
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<Badge[]>([]);

  useEffect(() => {
    // Load stats from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('whiz-stats');
      if (saved) {
        try {
          setStats(JSON.parse(saved));
        } catch (e) {
          console.error('Error loading stats:', e);
        }
      }
    }
  }, []);

  // Save stats whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && stats.targetSchool !== null) {
      localStorage.setItem('whiz-stats', JSON.stringify(stats));
    }
  }, [stats]);

  const handleSchoolSelect = (type: SchoolType) => {
    setStats(prev => ({ ...prev, targetSchool: type }));
    setScreen('dashboard');
  };

  const handleSelectSubject = (sub: Subject) => {
    setSubject(sub);
    setScreen('topic-select');
  };

  const startExam = (type: QuizType) => {
    setQuizMode('exam');
    setQuizType(type);
    setSelectedTopic(undefined);
    setScreen('quiz');
  };

  const startPractice = (topic: string, type: QuizType) => {
    setQuizMode('practice');
    setQuizType(type);
    setSelectedTopic(topic);
    setScreen('quiz');
  };

  const checkBadges = (currentStats: UserStats, result: QuizResult): Badge[] => {
    const unlocked: Badge[] = [];
    const newBadges = [...currentStats.badges];

    const unlock = (id: string) => {
      const badgeIndex = newBadges.findIndex(b => b.id === id);
      if (badgeIndex !== -1 && !newBadges[badgeIndex].unlocked) {
        newBadges[badgeIndex].unlocked = true;
        unlocked.push(newBadges[badgeIndex]);
      }
    };

    if (currentStats.completedQuizzes >= 1) unlock('1');
    if (currentStats.completedQuizzes >= 5) unlock('2');
    if (result.subject === Subject.Maths && result.score === result.total) unlock('3');
    if (result.mode === 'exam' && result.timeTaken < 30) unlock('4');
    if (currentStats.stars >= 1000) unlock('5');

    if (unlocked.length > 0) {
      setStats(s => ({ ...s, badges: newBadges }));
    }
    
    return unlocked;
  };

  const handleQuizComplete = (result: QuizResult) => {
    setLastResult(result);

    setStats(prev => {
      const newProgress = { ...prev.progress };
      const subProg = newProgress[result.subject] || { totalQuestions: 0, correctAnswers: 0 };
      
      newProgress[result.subject] = {
        totalQuestions: subProg.totalQuestions + result.total,
        correctAnswers: subProg.correctAnswers + result.score
      };

      const updatedStats = {
        ...prev,
        stars: prev.stars + result.pointsEarned,
        completedQuizzes: prev.completedQuizzes + 1,
        totalTimePlayed: prev.totalTimePlayed + result.timeTaken,
        progress: newProgress
      };

      const unlocked = checkBadges(updatedStats, result);
      setNewlyUnlockedBadges(unlocked);

      return updatedStats;
    });

    if (result.score === result.total) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    setScreen('results');
  };

  // Show landing page first
  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out font-inter pb-20 ${THEME_STYLES[theme]}`}>
      {screen !== 'onboarding' && (
        <Header 
          stats={stats} 
          onHome={() => { setScreen('dashboard'); setSubject(null); }} 
          onOpenThemeSelector={() => setShowThemeSelector(true)}
        />
      )}

      <main>
        {screen === 'onboarding' && (
          <OnboardingScreen onSelect={handleSchoolSelect} />
        )}

        {screen === 'dashboard' && (
          <Dashboard 
            onSelectSubject={handleSelectSubject}
            onShowProgress={() => setScreen('progress')}
            onShowLeaderboard={() => setScreen('leaderboard')}
          />
        )}

        {screen === 'topic-select' && subject && (
          <TopicSelectScreen 
            subject={subject}
            onSelectExamMode={startExam}
            onSelectPracticeTopic={startPractice}
            onBack={() => setScreen('dashboard')}
          />
        )}

        {screen === 'quiz' && subject && (
          <QuizArea 
            subject={subject}
            schoolType={stats.targetSchool}
            mode={quizMode}
            quizType={quizType}
            topic={selectedTopic}
            onComplete={handleQuizComplete}
          />
        )}

        {screen === 'results' && lastResult && (
          <ResultsScreen 
            result={lastResult}
            newBadges={newlyUnlockedBadges}
            onHome={() => { setScreen('dashboard'); setSubject(null); }}
            onRetry={() => { 
                setSubject(null);
                setTimeout(() => setSubject(lastResult.subject), 10);
                setScreen('quiz');
            }}
            onReview={() => setScreen('review')}
          />
        )}

        {screen === 'review' && lastResult && (
           <ReviewScreen result={lastResult} onBack={() => setScreen('results')} />
        )}

        {screen === 'progress' && (
          <ProgressScreen stats={stats} onBack={() => setScreen('dashboard')} />
        )}

        {screen === 'leaderboard' && (
          <LeaderboardScreen currentUserStats={stats} onBack={() => setScreen('dashboard')} />
        )}
      </main>

      <ThemeSelector 
        isOpen={showThemeSelector}
        currentTheme={theme}
        onSelect={(t) => { setTheme(t); setShowThemeSelector(false); }}
        onClose={() => setShowThemeSelector(false)}
      />
    </div>
  );
}
