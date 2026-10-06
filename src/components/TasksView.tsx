import { useState } from 'react';
import { CheckSquare, Plus, Filter, ExternalLink, Check, Circle } from 'lucide-react';
import { tasksData, Task } from '../data/tasks';

export default function TasksView() {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active' && t.completed) return false;
    if (filter === 'completed' && !t.completed) return false;
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare size={20} className="text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Tasks</h1>
          </div>
          <p className="text-sm text-white/40">
            Synced with Todoist · {completedCount}/{totalCount} completed
          </p>
        </div>
        <a
          href="https://todoist.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm hover:bg-emerald-500/20 transition-all"
        >
          <ExternalLink size={14} />
          Open Todoist
        </a>
      </div>

      {/* Progress bar */}
      <div className="mb-6 bg-[#111916] border border-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/50">Today's Progress</span>
          <span className="text-xs text-emerald-400 font-medium">{Math.round((completedCount / totalCount) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex items-center gap-1 bg-[#111916] border border-white/5 rounded-lg p-1">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === f
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-[#111916] border border-white/5 rounded-lg p-1">
          <Filter size={12} className="text-white/30 ml-2" />
          {(['all', 'high', 'medium', 'low'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                priorityFilter === p
                  ? 'bg-white/10 text-white/80'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {p === 'all' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
              task.completed
                ? 'bg-white/[0.01] border-white/5 opacity-50'
                : 'bg-[#111916] border-white/5 hover:border-white/10'
            }`}
          >
            <button onClick={() => toggleTask(task.id)} className="shrink-0">
              {task.completed ? (
                <Check size={18} className="text-emerald-400" />
              ) : (
                <Circle size={18} className="text-white/30 hover:text-white/60 transition-colors" />
              )}
            </button>
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
              <p className={`text-sm ${task.completed ? 'line-through text-white/30' : 'text-white/90'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] text-white/30">{task.project}</span>
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-[11px] text-white/30 shrink-0">{task.dueDate}</span>
          </div>
        ))}
      </div>

      {/* Add task button */}
      <button className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/10 text-white/30 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-all">
        <Plus size={16} />
        Add Task in Todoist
      </button>
    </div>
  );
}
