import { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ServerDashboard from './components/ServerDashboard';
import HospitalDashboard from './components/HospitalDashboard';
import { Activity, Moon, Sun } from 'lucide-react';

function AppContent() {
  const [view, setView] = useState<'server' | 'hospital'>('server');
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors ${
      isDark
        ? 'bg-gradient-to-br from-slate-950 to-slate-900'
        : 'bg-gradient-to-br from-slate-50 to-slate-100'
    }`}>
      <header className={`border-b shadow-sm transition-colors ${
        isDark
          ? 'bg-slate-900 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>FedMed</h1>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Federated Medical Learning Platform
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setView('server')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'server'
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Server View
              </button>
              <button
                onClick={() => setView('hospital')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'hospital'
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Hospital View
              </button>
              <button
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  isDark
                    ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === 'server' ? <ServerDashboard /> : <HospitalDashboard />}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
