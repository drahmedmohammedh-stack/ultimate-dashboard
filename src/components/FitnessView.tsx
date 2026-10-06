import { Dumbbell, Flame, Timer, TrendingDown, Activity, ExternalLink } from 'lucide-react';
import { fitnessData } from '../data/fitness';

export default function FitnessView() {
  const { weeklyWorkouts, weeklyGoal, currentStreak, recentWorkouts, monthlyStats, bodyStats, weekSchedule } = fitnessData;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Dumbbell size={20} className="text-blue-400" />
            <h1 className="text-xl font-bold text-white">Fitness Tracker</h1>
          </div>
          <p className="text-sm text-white/40">
            Connected to fitness app · {currentStreak} day streak 🔥
          </p>
        </div>
        <a
          href="https://www.strong.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm hover:bg-blue-500/20 transition-all"
        >
          <ExternalLink size={14} />
          Open Fitness App
        </a>
      </div>

      {/* Week Overview */}
      <div className="bg-[#111916] border border-white/5 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">This Week</h2>
          <span className="text-xs text-blue-400">{weeklyWorkouts}/{weeklyGoal} workouts</span>
        </div>
        <div className="grid grid-cols-7 gap-3">
          {weekSchedule.map((day) => (
            <div key={day.day} className="flex flex-col items-center gap-2">
              <div
                className={`w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border transition-all ${
                  day.completed
                    ? 'bg-blue-500/15 border-blue-500/30'
                    : 'bg-white/[0.02] border-white/5'
                }`}
              >
                <span className={`text-lg ${day.completed ? '' : 'opacity-30'}`}>
                  {day.completed ? '✓' : '○'}
                </span>
              </div>
              <span className="text-[10px] text-white/40 text-center">{day.day.slice(0, 3)}</span>
              <span className="text-[9px] text-white/25 text-center leading-tight">{day.type}</span>
            </div>
          ))}
        </div>
        {/* Progress bar */}
        <div className="mt-4 w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
            style={{ width: `${(weeklyWorkouts / weeklyGoal) * 100}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#111916] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={14} className="text-emerald-400" />
            <span className="text-[11px] text-white/40">This Month</span>
          </div>
          <p className="text-xl font-bold text-white">{monthlyStats.totalWorkouts}</p>
          <p className="text-[10px] text-white/30">workouts</p>
        </div>
        <div className="bg-[#111916] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Timer size={14} className="text-blue-400" />
            <span className="text-[11px] text-white/40">Total Time</span>
          </div>
          <p className="text-xl font-bold text-white">{monthlyStats.totalMinutes}</p>
          <p className="text-[10px] text-white/30">minutes</p>
        </div>
        <div className="bg-[#111916] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={14} className="text-orange-400" />
            <span className="text-[11px] text-white/40">Calories</span>
          </div>
          <p className="text-xl font-bold text-white">{monthlyStats.totalCalories.toLocaleString()}</p>
          <p className="text-[10px] text-white/30">kcal burned</p>
        </div>
        <div className="bg-[#111916] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={14} className="text-purple-400" />
            <span className="text-[11px] text-white/40">Body Weight</span>
          </div>
          <p className="text-xl font-bold text-white">{bodyStats.weight} <span className="text-sm text-emerald-400">↓{bodyStats.weightChange}</span></p>
          <p className="text-[10px] text-white/30">lbs · {bodyStats.bodyFat}% BF</p>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Recent Workouts</h2>
        <div className="space-y-3">
          {recentWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-white">{workout.type}</p>
                  <p className="text-[11px] text-white/30">{workout.date}</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-white/40">
                  <span className="flex items-center gap-1">
                    <Timer size={11} />
                    {workout.duration}min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={11} />
                    {workout.calories}kcal
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {workout.exercises.map((ex, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 rounded-md bg-blue-500/10 text-blue-300/70 border border-blue-500/10"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
