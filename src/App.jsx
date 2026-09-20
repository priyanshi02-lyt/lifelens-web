import React, { useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MomentModal from './components/MomentModal';
import ThermalReceiptModal from './components/ThermalReceiptModal';

import LandingView from './views/LandingView';
import DashboardView from './views/DashboardView';
import TimelineView from './views/TimelineView';
import ExploreView from './views/ExploreView';
import InsightsView from './views/InsightsView';
import StoryView from './views/StoryView';
import JournalView from './views/JournalView';

import { userMoments, userChapters } from './data/userLifeDataset';

// Main App Layout Wrapper with Header, Footer, and Floating Mobile Dock
function AppLayout({ onSelectMoment, onOpenThermalSlip }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8fc] text-[#2d1f3f]">
      {/* Top Header & Floating Mobile Dock */}
      <Navbar onOpenThermalSlip={() => onOpenThermalSlip()} />

      {/* Main Page Area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  const [moments] = useState(userMoments);
  const [chapters] = useState(userChapters);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [thermalReceipt, setThermalReceipt] = useState(null);
  const [isThermalOpen, setIsThermalOpen] = useState(false);

  const handleSelectMoment = (moment) => {
    setSelectedMoment(moment);
  };

  const handleOpenThermalSlip = (moment) => {
    if (moment) {
      setThermalReceipt(moment);
    } else {
      // Overall life summary receipt
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

  return (
    <>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingView />} />

        {/* Core App Layout Routes */}
        <Route element={<AppLayout onSelectMoment={handleSelectMoment} onOpenThermalSlip={handleOpenThermalSlip} />}>
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
    </>
  );
}
