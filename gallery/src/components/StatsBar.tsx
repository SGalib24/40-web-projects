import React from 'react';
import { Layers, Clock, Activity, CheckCircle2 } from 'lucide-react';

interface StatsBarProps {
  total: number;
  inProgress: number;
  comingSoon: number;
  completed: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  total,
  inProgress,
  comingSoon,
  completed,
}) => {
  const completedPercentage = Math.round((completed / total) * 100);
  const activePercentage = Math.round(((completed + inProgress) / total) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Projects */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg shadow-black/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Projects</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1">{total}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-amber-500/20 shadow-lg shadow-amber-950/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              In Progress
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300 mt-1">{inProgress}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg shadow-black/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Coming Soon</div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-300 mt-1">{comingSoon}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Completed */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-emerald-500/20 shadow-lg shadow-emerald-950/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Completed</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">{completed}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-semibold text-slate-200">Roadmap Progress:</span>
          <span>{inProgress} active development ({activePercentage}% underway)</span>
        </div>
        <div className="flex-1 sm:max-w-md bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${completedPercentage}%` }}
            title={`Completed: ${completedPercentage}%`}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${Math.max(2.5, (inProgress / total) * 100)}%` }}
            title={`In Progress: ${inProgress}`}
          />
        </div>
      </div>
    </div>
  );
};
