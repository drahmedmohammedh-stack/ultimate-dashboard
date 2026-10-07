import { useState, useEffect } from 'react';
import { Target, Clock, Users, Trash2, GripVertical } from 'lucide-react';
import { TodoistTask } from '../services/todoist';

export type EisenhowerQuadrant = 'do-first' | 'schedule' | 'delegate' | 'eliminate';

interface EisenhowerMatrixProps {
  tasks: TodoistTask[];
}

interface TaskQuadrantMap {
  [taskId: string]: EisenhowerQuadrant;
}

const STORAGE_KEY = 'eisenhower-quadrants';

export default function EisenhowerMatrix({ tasks }: EisenhowerMatrixProps) {
  const [quadrantMap, setQuadrantMap] = useState<TaskQuadrantMap>({});
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  // Load quadrant assignments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setQuadrantMap(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever quadrantMap changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quadrantMap));
  }, [quadrantMap]);

  const assignQuadrant = (taskId: string, quadrant: EisenhowerQuadrant) => {
    setQuadrantMap(prev => ({
      ...prev,
      [taskId]: quadrant
    }));
  };

  const removeQuadrant = (taskId: string) => {
    setQuadrantMap(prev => {
      const newMap = { ...prev };
      delete newMap[taskId];
      return newMap;
    });
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (quadrant: EisenhowerQuadrant) => {
    if (draggedTask) {
      assignQuadrant(draggedTask, quadrant);
      setDraggedTask(null);
    }
  };

  const unassignedTasks = tasks.filter(task => !quadrantMap[task.id]);
  const doFirstTasks = tasks.filter(task => quadrantMap[task.id] === 'do-first');
  const scheduleTasks = tasks.filter(task => quadrantMap[task.id] === 'schedule');
  const delegateTasks = tasks.filter(task => quadrantMap[task.id] === 'delegate');
  const eliminateTasks = tasks.filter(task => quadrantMap[task.id] === 'eliminate');

  const quadrants = [
    {
      id: 'do-first' as EisenhowerQuadrant,
      title: 'Do First',
      subtitle: 'Urgent & Important',
      icon: <Target size={16} />,
      color: 'red',
      tasks: doFirstTasks,
    },
    {
      id: 'schedule' as EisenhowerQuadrant,
      title: 'Schedule',
      subtitle: 'Not Urgent & Important',
      icon: <Clock size={16} />,
      color: 'blue',
      tasks: scheduleTasks,
    },
    {
      id: 'delegate' as EisenhowerQuadrant,
      title: 'Delegate',
      subtitle: 'Urgent & Not Important',
      icon: <Users size={16} />,
      color: 'yellow',
      tasks: delegateTasks,
    },
    {
      id: 'eliminate' as EisenhowerQuadrant,
      title: 'Eliminate',
      subtitle: 'Not Urgent & Not Important',
      icon: <Trash2 size={16} />,
      color: 'gray',
      tasks: eliminateTasks,
    },
  ];

  const colorClasses = {
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      icon: 'text-red-400',
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      icon: 'text-blue-400',
    },
    yellow: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      icon: 'text-yellow-400',
    },
    gray: {
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/30',
      text: 'text-gray-400',
      icon: 'text-gray-400',
    },
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Eisenhower Matrix</h1>
        <p className="text-sm text-white/40">
          Categorize your tasks by urgency and importance
        </p>
      </div>

      {/* Unassigned Tasks */}
      {unassignedTasks.length > 0 && (
        <div className="mb-6 bg-[#111916] border border-white/5 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-3">
            Unassigned Tasks ({unassignedTasks.length})
          </h2>
          <p className="text-xs text-white/40 mb-4">
            Drag tasks to a quadrant below or click to assign
          </p>
          <div className="space-y-2">
            {unassignedTasks.map(task => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task.id)}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-move"
              >
                <GripVertical size={14} className="text-white/20" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 truncate">{task.content}</p>
                  <p className="text-[11px] text-white/30">
                    Priority {task.priority} {task.due && `• Due: ${task.due.string}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {quadrants.map(quadrant => {
          const colors = colorClasses[quadrant.color as keyof typeof colorClasses];
          
          return (
            <div
              key={quadrant.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(quadrant.id)}
              className={`bg-[#111916] border-2 ${colors.border} rounded-xl p-5 min-h-[300px] transition-all`}
            >
              {/* Quadrant Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center ${colors.icon}`}>
                  {quadrant.icon}
                </div>
                <div>
                  <h3 className={`text-sm font-semibold ${colors.text}`}>
                    {quadrant.title}
                  </h3>
                  <p className="text-[11px] text-white/40">{quadrant.subtitle}</p>
                </div>
                <span className={`ml-auto text-xs ${colors.text} font-medium`}>
                  {quadrant.tasks.length}
                </span>
              </div>

              {/* Tasks in Quadrant */}
              <div className="space-y-2">
                {quadrant.tasks.length === 0 ? (
                  <div className="text-center py-8 text-white/20 text-xs">
                    Drop tasks here
                  </div>
                ) : (
                  quadrant.tasks.map(task => (
                    <div
                      key={task.id}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/90 truncate">{task.content}</p>
                        <p className="text-[11px] text-white/30">
                          Priority {task.priority} {task.due && `• Due: ${task.due.string}`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeQuadrant(task.id)}
                        className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/60 transition-all"
                        title="Remove from quadrant"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-[#111916] border border-white/5 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-2">How to use</h3>
        <ul className="text-xs text-white/40 space-y-1">
          <li>• <strong className="text-white/60">Do First:</strong> Tasks that are both urgent and important - do these immediately</li>
          <li>• <strong className="text-white/60">Schedule:</strong> Important but not urgent - schedule time to do these</li>
          <li>• <strong className="text-white/60">Delegate:</strong> Urgent but not important - delegate if possible</li>
          <li>• <strong className="text-white/60">Eliminate:</strong> Neither urgent nor important - consider eliminating</li>
        </ul>
      </div>
    </div>
  );
}
