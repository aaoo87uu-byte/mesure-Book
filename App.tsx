
import React, { useState } from 'react';
import { ViewType } from './types.ts';
import MeasurementView from './components/MeasurementView.tsx';
import DebtView from './components/DebtView.tsx';
import Navigation from './components/Navigation.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('measurements');

  return (
    <div className="min-h-screen pb-24 md:pb-0 md:pr-64 text-gray-900">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" />
            </svg>
            إدارة القياسات والديون
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 max-w-4xl">
        {currentView === 'measurements' ? <MeasurementView /> : <DebtView />}
      </main>

      {/* Sidebar / Bottom Navigation */}
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
};

export default App;
