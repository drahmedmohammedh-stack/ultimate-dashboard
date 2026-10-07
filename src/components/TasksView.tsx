import { useState, useEffect } from 'react';
import { CheckSquare, Plus, Filter, ExternalLink, Check, Circle, RefreshCw, AlertCircle } from 'lucide-react';
import { fetchTasks, completeTask, TodoistTask } from '../services/todoist';

export default function TasksView() {
  const [tasks, setTasks] = useState<TodoistTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | '1' | '2' | '3' | '4'>('all');

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks from Todoist. Please check your API token.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCompleteTask = async (taskId: string) => {
    try {
      await completeTask(taskId);
      setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: true } : t));
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'active' && t.is_completed) return false;
    if (filter === 'completed' && !t.is_completed) return false;
    if (priorityFilter !== 'all' && t.priority.toString() !== priorityFilter) return false;
    return true;
  });

  const completedCount = tasks.filter((t) => t.is_completed).length;
  const totalCount = tasks.length;

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      default: return 'Low';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 4: return 'bg-red-400';
      case 3: return 'bg-orange-400';
      case 2: return 'bg-yellow-400';
      default: return 'bg-emerald-400';
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 max-w-[1200px] mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw size={32} className="text-emerald-400 animate-spin mx-auto mb-3" />
          <p className="text-white/60">Loading tasks from Todoist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-400 font-medium mb-1">Connection Error</p>
            <p className="text-xs text-white/60 mb-3">{error}</p>
            <div className="bg-white/5 rounded-lg p-3 mb-3">
              <p className="text-[11px] text-white/40 mb-1">Possible causes:</p>
              <ul className="text-[11px] text-white/40 space-y-0.5 list-disc list-inside">
                <li>CORS proxy may be temporarily unavailable</li>
                <li>API token may be invalid or expired</li>
                <li>Network connectivity issue</li>
              </ul>
            </div>
            <button
              onClick={loadTasks}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs hover:bg-red-500/30 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center gap-2">
          <button
            onClick={loadTasks}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 transition-all"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
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
      </div>

      {/* Progress bar */}
      <div className="mb-6 bg-[#111916] border border-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/50">Today's Progress</span>
          <span className="text-xs text-emerald-400 font-medium">
            {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
          </span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
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
          {(['all', '4', '3', '2', '1'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                priorityFilter === p
                  ? 'bg-white/10 text-white/80'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              {p === 'all' ? 'All' : getPriorityLabel(parseInt(p))}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-white/30">
            <p className="text-sm">No tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                task.is_completed
                  ? 'bg-white/[0.01] border-white/5 opacity-50'
                  : 'bg-[#111916] border-white/5 hover:border-white/10'
              }`}
            >
              <button onClick={() => !task.is_completed && handleCompleteTask(task.id)} className="shrink-0">
                {task.is_completed ? (
                  <Check size={18} className="text-emerald-400" />
                ) : (
                  <Circle size={18} className="text-white/30 hover:text-white/60 transition-colors" />
                )}
              </button>
              <div className={`w-2 h-2 rounded-full shrink-0 ${getPriorityColor(task.priority)}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${task.is_completed ? 'line-through text-white/30' : 'text-white/90'}`}>
                  {task.content}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-white/30">{getPriorityLabel(task.priority)}</span>
                  {task.due && (
                    <span className="text-[11px] text-white/30">• Due: {task.due.string}</span>
                  )}
                  {task.labels.length > 0 && (
                    <div className="flex gap-1">
                      {task.labels.map((label) => (
                        <span
                          key={label}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add task button */}
      <a
        href="https://todoist.com/app#inbox"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/10 text-white/30 text-sm hover:border-emerald-500/30 hover:text-emerald-400 transition-all"
      >
        <Plus size={16} />
        Add Task in Todoist
      </a>
    </div>
  );
}
