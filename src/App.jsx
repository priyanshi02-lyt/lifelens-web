import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MomentModal from './components/MomentModal';
import ThermalReceiptModal from './components/ThermalReceiptModal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import ErrorBoundary from './components/ErrorBoundary';

import { userMoments, userChapters } from './data/userLifeDataset';
import { soundFx } from './utils/audioSynthesizer';
import { exportMomentsToCSV, exportDatasetToJSON } from './utils/dataExporter';

// Lazy-loaded routes for Performance Engine code splitting
const LandingView = lazy(() => import('./views/LandingView'));
const DashboardView = lazy(() => import('./views/DashboardView'));
const TimelineView = lazy(() => import('./views/TimelineView'));
const ExploreView = lazy(() => import('./views/ExploreView'));
const InsightsView = lazy(() => import('./views/InsightsView'));
const StoryView = lazy(() => import('./views/StoryView'));
const JournalView = lazy(() => import('./views/JournalView'));

// Loading Fallback with accessible status
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div className="size-9 rounded-full border-3 border-[#5269dd]/20 border-t-[#5269dd] animate-spin"></div>
        <span className="text-xs font-semibold text-slate-400">Loading LifeLens moments...</span>
      </div>
    </div>
  );
}

// Main App Layout Wrapper with Header, Footer, and Floating Mobile Dock
function AppLayout({ 
  onSelectMoment, 
  onOpenThermalSlip, 
  isDark, 
  onToggleTheme, 
  isAmbientPlaying, 
  onToggleAmbient,
  onOpenShortcuts,
  onExportCSV,
  onExportJSON
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8fc] dark:bg-[#0d1117] text-[#2d1f3f] dark:text-[#f0f6fc] transition-colors duration-200">
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#172b65] focus:text-white focus:rounded-xl focus:shadow-xl focus:text-xs focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Top Header & Floating Mobile Dock */}
      <Navbar 
        onOpenThermalSlip={() => onOpenThermalSlip()} 
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={onToggleAmbient}
        onOpenShortcuts={onOpenShortcuts}
        onExportCSV={onExportCSV}
        onExportJSON={onExportJSON}
      />

      {/* Main Page Area */}
      <main id="main-content" className="flex-1 w-full" role="main" tabIndex="-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer onOpenShortcuts={onOpenShortcuts} />
    </div>
  );
}

export default function App() {
  const [moments] = useState(userMoments);
  const [chapters] = useState(userChapters);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [thermalReceipt, setThermalReceipt] = useState(null);
  const [isThermalOpen, setIsThermalOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('lifelens-theme') === 'dark';
  });

  // Ambient soundscape state
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lifelens-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lifelens-theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    soundFx.playClick();
    setIsDark(prev => !prev);
  };

  const handleToggleAmbient = () => {
    soundFx.toggleAmbient((playing) => {
      setIsAmbientPlaying(playing);
    });
  };

  const handleSelectMoment = (moment) => {
    soundFx.playClick();
    setSelectedMoment(moment);
  };

  const handleOpenThermalSlip = (moment) => {
    soundFx.playChime();
    if (moment) {
      setThermalReceipt(moment);
    } else {
      const summarySlip = {
        id: 'lifelens-summary-2018',
        kind: 'Summary',
        title: 'LifeLens Biographical Summary',
        subtitle: '4 Life Chapters • 600+ Lived Moments',
        date: '20 Sep 2018',
        time: '11:59 PM',
        amount: '551800',
        currency: 'INR',
        mode: 'Multi-Channel Verified Digits',
        mood: 'Grateful & Resilient',
        category: 'Biographical Archive',
        story: 'Synthesized 2015-2018 financial expenses, sleeper trains, Spotify soundtrack, clinic duty, and marathon miles into a meaningful story.'
      };
      setThermalReceipt(summarySlip);
    }
    setIsThermalOpen(true);
  };

  const handleSaveToJournal = (moment) => {
    soundFx.playChime();
    const saved = JSON.parse(localStorage.getItem('lifelens-journal-imports') || '[]');
    if (!saved.some(item => item.sourceId === moment.id)) {
      const newEntry = {
        title: moment.title,
        date: moment.date,
        image: moment.image,
        color: moment.color,
        rotate: '1deg',
        sourceId: moment.id
      };
      localStorage.setItem('lifelens-journal-imports', JSON.stringify([newEntry, ...saved]));
    }
    setSelectedMoment(null);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Do not intercept if typing in input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        soundFx.playClick();
        setIsShortcutsOpen(prev => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        handleToggleTheme();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        handleToggleAmbient();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handleOpenThermalSlip();
      } else if (e.key === 'Escape') {
        setIsThermalOpen(false);
        setSelectedMoment(null);
        setIsShortcutsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDark]);

  return (
    <ErrorBoundary>
      <Routes>
        {/* Landing Page Route */}
        <Route 
          path="/" 
          element={
            <Suspense fallback={<PageLoader />}>
              <LandingView isDark={isDark} onToggleTheme={handleToggleTheme} />
            </Suspense>
          } 
        />

        {/* Core App Layout Routes */}
        <Route 
          element={
            <AppLayout 
              onSelectMoment={handleSelectMoment} 
              onOpenThermalSlip={handleOpenThermalSlip}
              isDark={isDark}
              onToggleTheme={handleToggleTheme}
              isAmbientPlaying={isAmbientPlaying}
              onToggleAmbient={handleToggleAmbient}
              onOpenShortcuts={() => setIsShortcutsOpen(true)}
              onExportCSV={() => exportMomentsToCSV(moments)}
              onExportJSON={() => exportDatasetToJSON(moments, chapters)}
            />
          }
        >
          <Route 
            path="/dashboard" 
            element={
              <DashboardView 
                moments={moments} 
                chapters={chapters} 
                onSelectMoment={handleSelectMoment}
                onOpenThermalSlip={handleOpenThermalSlip}
              />
            } 
          />
          <Route 
            path="/timeline" 
            element={
              <TimelineView 
                moments={moments} 
                chapters={chapters} 
                onSelectMoment={handleSelectMoment}
              />
            } 
          />
          <Route 
            path="/explore" 
            element={
              <ExploreView 
                moments={moments} 
                onSelectMoment={handleSelectMoment}
                onOpenThermalSlip={handleOpenThermalSlip}
              />
            } 
          />
          <Route 
            path="/insights" 
            element={
              <InsightsView />
            } 
          />
          <Route 
            path="/story" 
            element={
              <StoryView 
                chapters={chapters} 
                moments={moments} 
                onSelectMoment={handleSelectMoment}
                onOpenThermalSlip={handleOpenThermalSlip}
              />
            } 
          />
          <Route 
            path="/journal" 
            element={
              <JournalView />
            } 
          />
        </Route>
      </Routes>

      {/* Global Moment Details Modal */}
      <MomentModal
        moment={selectedMoment}
        isOpen={!!selectedMoment}
        onClose={() => setSelectedMoment(null)}
        onSaveToJournal={handleSaveToJournal}
        onOpenThermalSlip={handleOpenThermalSlip}
      />

      {/* Global Thermal Receipt Modal */}
      <ThermalReceiptModal
        receipt={thermalReceipt}
        isOpen={isThermalOpen}
        onClose={() => setIsThermalOpen(false)}
      />

      {/* Global Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </ErrorBoundary>
  );
}
