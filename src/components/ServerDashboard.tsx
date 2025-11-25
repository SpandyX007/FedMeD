import { useState } from 'react';
import { Server, Users, Shield, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import TrainingPipelineGraph from './TrainingPipelineGraph';

interface TrainingRound {
  round: number;
  status: 'completed' | 'in-progress' | 'pending';
  accuracy: number;
  hospitals: number;
}

export default function ServerDashboard() {
  const { isDark } = useTheme();
  const [currentRound] = useState(3);
  const [trainingRounds] = useState<TrainingRound[]>([
    { round: 1, status: 'completed', accuracy: 72.5, hospitals: 5 },
    { round: 2, status: 'completed', accuracy: 81.3, hospitals: 5 },
    { round: 3, status: 'in-progress', accuracy: 87.2, hospitals: 3 },
    { round: 4, status: 'pending', accuracy: 0, hospitals: 0 },
  ]);

  const hospitals = [
    { id: 'A', name: 'General Hospital A', status: 'training', progress: 85, dataPoints: 12500 },
    { id: 'B', name: 'Medical Center B', status: 'training', progress: 72, dataPoints: 9800 },
    { id: 'C', name: 'Regional Hospital C', status: 'uploading', progress: 100, dataPoints: 15200 },
    { id: 'D', name: 'University Hospital D', status: 'waiting', progress: 0, dataPoints: 11000 },
    { id: 'E', name: 'Children\'s Hospital E', status: 'waiting', progress: 0, dataPoints: 8300 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Training Round</p>
              <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{currentRound}</p>
            </div>
            <Server className="h-12 w-12 text-blue-600 opacity-80" />
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Active Hospitals</p>
              <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{hospitals.length}</p>
            </div>
            <Users className="h-12 w-12 text-green-600 opacity-80" />
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Global Accuracy</p>
              <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>87.2%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-indigo-600 opacity-80" />
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Privacy Level</p>
              <p className={`text-3xl font-bold mt-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>ε=0.5</p>
            </div>
            <Shield className="h-12 w-12 text-emerald-600 opacity-80" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Training Progress</h2>
          <div className="space-y-4">
            {trainingRounds.map((round) => (
              <div key={round.round} className={`border rounded-lg p-4 ${
                isDark
                  ? 'border-slate-700 bg-slate-900'
                  : 'border-slate-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {round.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {round.status === 'in-progress' && <Clock className="h-5 w-5 text-blue-600 animate-pulse" />}
                    {round.status === 'pending' && <AlertCircle className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />}
                    <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Round {round.round}</span>
                  </div>
                  {round.status !== 'pending' && (
                    <span className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{round.accuracy}%</span>
                  )}
                </div>
                {round.status === 'in-progress' && (
                  <div className="mt-3">
                    <div className={`flex justify-between text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span>{round.hospitals}/{hospitals.length} hospitals completed</span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(round.hospitals / hospitals.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-xl shadow-sm border p-6 ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Hospital Network Status</h2>
          <div className="space-y-3">
            {hospitals.map((hospital) => (
              <div key={hospital.id} className={`border rounded-lg p-4 ${
                isDark
                  ? 'border-slate-700 bg-slate-900'
                  : 'border-slate-200 bg-white'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>{hospital.name}</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{hospital.dataPoints.toLocaleString()} data points</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      hospital.status === 'training'
                        ? 'bg-blue-100 text-blue-700'
                        : hospital.status === 'uploading'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {hospital.status === 'training' && 'Training'}
                    {hospital.status === 'uploading' && 'Uploading'}
                    {hospital.status === 'waiting' && 'Waiting'}
                  </span>
                </div>
                {hospital.status !== 'waiting' && (
                  <div className="mt-2">
                    <div className={`w-full rounded-full h-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          hospital.status === 'uploading' ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${hospital.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <TrainingPipelineGraph />

      <div className={`rounded-xl shadow-sm border p-6 ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Federated Learning Pipeline</h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                1
              </div>
              <p className="text-sm font-medium text-slate-900">Model Distribution</p>
              <p className="text-xs text-slate-600 mt-1">Server → Hospitals</p>
            </div>

            <div className="flex-none px-4">
              <div className="w-12 h-0.5 bg-blue-600" />
            </div>

            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                2
              </div>
              <p className="text-sm font-medium text-slate-900">Local Training</p>
              <p className="text-xs text-slate-600 mt-1">Private Data</p>
            </div>

            <div className="flex-none px-4">
              <div className="w-12 h-0.5 bg-blue-600" />
            </div>

            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                3
              </div>
              <p className="text-sm font-medium text-slate-900">Privacy + Encryption</p>
              <p className="text-xs text-slate-600 mt-1">Differential Privacy</p>
            </div>

            <div className="flex-none px-4">
              <div className="w-12 h-0.5 bg-emerald-600" />
            </div>

            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                4
              </div>
              <p className="text-sm font-medium text-slate-900">FedProx Aggregation</p>
              <p className="text-xs text-slate-600 mt-1">Global Model Update</p>
            </div>

            <div className="flex-none px-4">
              <div className="w-12 h-0.5 bg-indigo-600" />
            </div>

            <div className="flex-1 text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                5
              </div>
              <p className="text-sm font-medium text-slate-900">Distribution</p>
              <p className="text-xs text-slate-600 mt-1">Final Model Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
