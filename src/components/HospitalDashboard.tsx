import { useState } from 'react';
import { Building2, Database, Download, Upload, Shield, Lock, Activity, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function HospitalDashboard() {
  const { isDark } = useTheme();
  const [selectedHospital, setSelectedHospital] = useState('A');
  const [trainingStatus, setTrainingStatus] = useState<'idle' | 'downloading' | 'training' | 'encrypting' | 'uploading' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const hospitals = [
    { id: 'A', name: 'General Hospital A', specialty: 'Geriatric Care', patients: 12500 },
    { id: 'B', name: 'Medical Center B', specialty: 'General Medicine', patients: 9800 },
    { id: 'C', name: 'Regional Hospital C', specialty: 'Emergency Care', patients: 15200 },
    { id: 'D', name: 'University Hospital D', specialty: 'Research & Teaching', patients: 11000 },
    { id: 'E', name: 'Children\'s Hospital E', specialty: 'Pediatric Care', patients: 8300 },
  ];

  const currentHospital = hospitals.find(h => h.id === selectedHospital) || hospitals[0];

  const startTraining = () => {
    setTrainingStatus('downloading');
    setProgress(0);

    setTimeout(() => {
      setProgress(25);
      setTrainingStatus('training');

      setTimeout(() => {
        setProgress(60);
        setTrainingStatus('encrypting');

        setTimeout(() => {
          setProgress(85);
          setTrainingStatus('uploading');

          setTimeout(() => {
            setProgress(100);
            setTrainingStatus('complete');
          }, 2000);
        }, 2000);
      }, 3000);
    }, 2000);
  };

  const getStatusColor = () => {
    switch (trainingStatus) {
      case 'downloading':
        return 'text-blue-600';
      case 'training':
        return 'text-indigo-600';
      case 'encrypting':
        return 'text-emerald-600';
      case 'uploading':
        return 'text-green-600';
      case 'complete':
        return 'text-green-600';
      default:
        return 'text-slate-600';
    }
  };

  const getStatusText = () => {
    switch (trainingStatus) {
      case 'downloading':
        return 'Downloading global model...';
      case 'training':
        return 'Training on local data...';
      case 'encrypting':
        return 'Applying differential privacy & encryption...';
      case 'uploading':
        return 'Uploading encrypted updates...';
      case 'complete':
        return 'Training complete!';
      default:
        return 'Ready to start training';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Select Hospital</h2>
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {hospitals.map((hospital) => (
            <button
              key={hospital.id}
              onClick={() => setSelectedHospital(hospital.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedHospital === hospital.id
                  ? isDark
                    ? 'border-blue-500 bg-blue-900'
                    : 'border-blue-600 bg-blue-50'
                  : isDark
                  ? 'border-slate-600 bg-slate-900 hover:border-slate-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className={`font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Hospital {hospital.id}</div>
              <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{hospital.specialty}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Hospital</p>
              <p className={`text-xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{currentHospital.name}</p>
            </div>
            <Building2 className="h-10 w-10 text-blue-600 opacity-80" />
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Local Dataset</p>
              <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{currentHospital.patients.toLocaleString()}</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>patient records</p>
            </div>
            <Database className="h-10 w-10 text-indigo-600 opacity-80" />
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Specialty</p>
              <p className={`text-lg font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{currentHospital.specialty}</p>
            </div>
            <Activity className="h-10 w-10 text-emerald-600 opacity-80" />
          </div>
        </div>
      </div>

      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Training Pipeline</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className={`p-4 rounded-lg border-2 ${
              trainingStatus === 'downloading'
                ? isDark
                  ? 'border-blue-500 bg-blue-900'
                  : 'border-blue-600 bg-blue-50'
                : isDark
                ? 'border-slate-600 bg-slate-900'
                : 'border-slate-200 bg-white'
            }`}>
              <Download className={`h-8 w-8 mb-2 ${
                trainingStatus === 'downloading' ? 'text-blue-600' : isDark ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Download Model</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>From server</p>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              trainingStatus === 'training'
                ? isDark
                  ? 'border-indigo-500 bg-indigo-900'
                  : 'border-indigo-600 bg-indigo-50'
                : isDark
                ? 'border-slate-600 bg-slate-900'
                : 'border-slate-200 bg-white'
            }`}>
              <Activity className={`h-8 w-8 mb-2 ${
                trainingStatus === 'training' ? 'text-indigo-600 animate-pulse' : isDark ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Local Training</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>On private data</p>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              trainingStatus === 'encrypting'
                ? isDark
                  ? 'border-emerald-500 bg-emerald-900'
                  : 'border-emerald-600 bg-emerald-50'
                : isDark
                ? 'border-slate-600 bg-slate-900'
                : 'border-slate-200 bg-white'
            }`}>
              <Shield className={`h-8 w-8 mb-2 ${
                trainingStatus === 'encrypting' ? 'text-emerald-600' : isDark ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Privacy Layer</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Add noise + encrypt</p>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              trainingStatus === 'uploading'
                ? isDark
                  ? 'border-green-500 bg-green-900'
                  : 'border-green-600 bg-green-50'
                : isDark
                ? 'border-slate-600 bg-slate-900'
                : 'border-slate-200 bg-white'
            }`}>
              <Upload className={`h-8 w-8 mb-2 ${
                trainingStatus === 'uploading' ? 'text-green-600' : isDark ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Upload Updates</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>To server</p>
            </div>

            <div className={`p-4 rounded-lg border-2 ${
              trainingStatus === 'complete'
                ? isDark
                  ? 'border-green-500 bg-green-900'
                  : 'border-green-600 bg-green-50'
                : isDark
                ? 'border-slate-600 bg-slate-900'
                : 'border-slate-200 bg-white'
            }`}>
              <CheckCircle2 className={`h-8 w-8 mb-2 ${
                trainingStatus === 'complete' ? 'text-green-600' : isDark ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <p className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Complete</p>
              <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Round finished</p>
            </div>
          </div>

          {trainingStatus !== 'idle' && trainingStatus !== 'complete' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${getStatusColor()}`}>
                  {getStatusText()}
                </span>
                <span className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{progress}%</span>
              </div>
              <div className={`w-full rounded-full h-3 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                <div
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {trainingStatus === 'complete' && (
            <div className={`border rounded-lg p-4 flex items-center space-x-3 ${
              isDark
                ? 'bg-green-900 border-green-700'
                : 'bg-green-50 border-green-200'
            }`}>
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <p className={`font-medium ${isDark ? 'text-green-200' : 'text-green-900'}`}>Training Complete!</p>
                <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>Encrypted model updates successfully uploaded to server</p>
              </div>
            </div>
          )}

          <button
            onClick={startTraining}
            disabled={trainingStatus !== 'idle' && trainingStatus !== 'complete'}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
              trainingStatus !== 'idle' && trainingStatus !== 'complete'
                ? isDark
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {trainingStatus === 'idle' || trainingStatus === 'complete' ? 'Start Training Round' : 'Training in Progress...'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="h-6 w-6 text-emerald-600" />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Privacy Guarantees</h3>
          </div>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              isDark ? 'bg-emerald-900' : 'bg-emerald-50'
            }`}>
              <span className={`text-sm ${isDark ? 'text-emerald-200' : 'text-slate-700'}`}>Differential Privacy</span>
              <span className={`text-sm font-semibold ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>ε = 0.5</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              isDark ? 'bg-blue-900' : 'bg-blue-50'
            }`}>
              <span className={`text-sm ${isDark ? 'text-blue-200' : 'text-slate-700'}`}>Encryption</span>
              <span className={`text-sm font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>AES-256</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              isDark ? 'bg-indigo-900' : 'bg-indigo-50'
            }`}>
              <span className={`text-sm ${isDark ? 'text-indigo-200' : 'text-slate-700'}`}>Data Location</span>
              <span className={`text-sm font-semibold ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>Local Only</span>
            </div>
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-6 w-6 text-blue-600" />
            <h3 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Training Statistics</h3>
          </div>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              isDark ? 'bg-slate-900' : 'bg-slate-50'
            }`}>
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Local Accuracy</span>
              <span className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>89.3%</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              isDark ? 'bg-slate-900' : 'bg-slate-50'
            }`}>
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Training Epochs</span>
              <span className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>5</span>
            </div>
            <div className={`flex items-center justify-between p-3 rounded-lg ${
              isDark ? 'bg-slate-900' : 'bg-slate-50'
            }`}>
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Rounds Completed</span>
              <span className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
