
import React from 'react';
import { ViewType } from '../types';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed right-0 top-0 h-full w-64 bg-white border-l shadow-sm p-6 space-y-4">
        <div className="mb-8 pt-4 border-b pb-4">
          <p className="text-sm text-gray-500 font-medium">القائمة الرئيسية</p>
        </div>
        <button
          onClick={() => onViewChange('measurements')}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
            currentView === 'measurements' 
            ? 'bg-indigo-100 text-indigo-700 font-bold' 
            : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          إدارة القياسات
        </button>
        <button
          onClick={() => onViewChange('debts')}
          className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
            currentView === 'debts' 
            ? 'bg-indigo-100 text-indigo-700 font-bold' 
            : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          إدارة الديون
        </button>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around p-3 z-50">
        <button
          onClick={() => onViewChange('measurements')}
          className={`flex flex-col items-center gap-1 ${
            currentView === 'measurements' ? 'text-indigo-600' : 'text-gray-400'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span className="text-xs">القياسات</span>
        </button>
        <button
          onClick={() => onViewChange('debts')}
          className={`flex flex-col items-center gap-1 ${
            currentView === 'debts' ? 'text-indigo-600' : 'text-gray-400'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs">الديون</span>
        </button>
      </nav>
    </>
  );
};

export default Navigation;
