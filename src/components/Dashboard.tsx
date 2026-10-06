import { ViewType } from '../App';
import {
  CheckSquare,
  Dumbbell,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Zap,
} from 'lucide-react';
import { tasksData } from '../data/tasks';
import { financeData } from '../data/finance';
import { clientsData } from '../data/clients';
import { fitnessData } from '../data/fitness';

interface DashboardProps {
  setActiveView: (view: ViewType) => void;
}

export default function Dashboard({ setActiveView }: DashboardProps) {
  const pendingTasks = tasksData.filter((t) => !t.completed).length;
  const totalIncome = financeData.income;
  const totalExpenses = financeData.expenses;
  const activeClients = clientsData.filter((c) => c.status === 'active').length;
  const gymDaysThisWeek = fitnessData.weeklyWorkouts;

  const stats = [
    {
      label: 'Pending Tasks',
      value: pendingTasks.toString(),
      change: '-2 from yesterday',
      trend: 'down' as const,
      icon: <CheckSquare size={18} />,
      color: 'emerald',
      view: 'tasks' as ViewType,
    },
    {
      label: 'Gym Days (This Week)',
      value: `${gymDaysThisWeek}/5`,
      change: '+1 from last week',
      trend: 'up' as const,
      icon: <Dumbbell size={18} />,
      color: 'blue',
      view: 'fitness' as ViewType,
    },
    {
      label: 'Net This Month',
      value: `$${(totalIncome - totalExpenses).toLocaleString()}`,
      change: '+12% vs last month',
      trend: 'up' as const,
      icon: <DollarSign size={18} />,
      color: 'purple',
      view: 'finance' as ViewType,
    },
    {
      label: 'Active Clients',
      value: activeClients.toString(),
      change: '+1 new this week',
      trend: 'up' as const,
      icon: <Users size={18} />,
      color: 'orange',
      view: 'clients' as ViewType,
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  };

  const upcomingTasks = tasksData.filter((t) => !t.completed).slice(0, 4);
  const topClients = clientsData.filter((c) => c.status === 'active').slice(0, 3);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-white/40 text-sm mb-1">
          <Clock size={14} />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'} 👋
        </h1>
        <p className="text-white/50 mt-1">Here's your command center overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const colors = colorMap[stat.color];
          return (
            <button
              key={stat.label}
              onClick={() => setActiveView(stat.view)}
              className="group relative bg-[#111916] border border-white/5 rounded-xl p-5 text-left hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center ${colors.text}`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Tasks */}
        <div className="lg:col-span-2 bg-[#111916] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">Priority Tasks</h2>
            </div>
            <button
              onClick={() => setActiveView('tasks')}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
              >
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    task.priority === 'high'
                      ? 'bg-red-400'
                      : task.priority === 'medium'
                      ? 'bg-yellow-400'
                      : 'bg-emerald-400'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 truncate">{task.title}</p>
                  <p className="text-[11px] text-white/30">{task.project}</p>
                </div>
                <span className="text-[11px] text-white/30 shrink-0">{task.dueDate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Clients */}
        <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-orange-400" />
              <h2 className="text-sm font-semibold text-white">Active Clients</h2>
            </div>
            <button
              onClick={() => setActiveView('clients')}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {topClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: client.color + '20', color: client.color }}
                >
                  {client.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 truncate">{client.name}</p>
                  <p className="text-[11px] text-white/30">{client.project}</p>
                </div>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Fitness Quick View */}
        <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Dumbbell size={16} className="text-blue-400" />
              <h2 className="text-sm font-semibold text-white">This Week's Fitness</h2>
            </div>
            <button
              onClick={() => setActiveView('fitness')}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Details →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const workedOut = i < gymDaysThisWeek;
              return (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-full aspect-square rounded-lg flex items-center justify-center text-lg ${
                      workedOut
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-white/[0.02] border border-white/5'
                    }`}
                  >
                    {workedOut ? '💪' : '·'}
                  </div>
                  <span className="text-[10px] text-white/30">{day}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="text-white/40">Streak: <span className="text-white font-medium">12 days 🔥</span></span>
            <span className="text-white/40">Goal: <span className="text-emerald-400 font-medium">5 days/week</span></span>
          </div>
        </div>

        {/* Finance Quick View */}
        <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-purple-400" />
              <h2 className="text-sm font-semibold text-white">Financial Overview</h2>
            </div>
            <button
              onClick={() => setActiveView('finance')}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Details →
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[11px] text-white/30 mb-1">Income</p>
              <p className="text-lg font-bold text-emerald-400">${totalIncome.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/30 mb-1">Expenses</p>
              <p className="text-lg font-bold text-red-400">${totalExpenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[11px] text-white/30 mb-1">Savings</p>
              <p className="text-lg font-bold text-white">
                {Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)}%
              </p>
            </div>
          </div>
          {/* Mini bar chart */}
          <div className="mt-4 flex items-end gap-1 h-12">
            {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/40 to-emerald-400/20"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <p className="text-[10px] text-white/20 mt-1">Last 7 days spending trend</p>
        </div>
      </div>
    </div>
  );
}
