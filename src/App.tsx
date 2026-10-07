import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TasksView from './components/TasksView';
import EisenhowerMatrix from './components/EisenhowerMatrix';
import FitnessView from './components/FitnessView';
import FinanceView from './components/FinanceView';
import ClientsView from './components/ClientsView';
import { fetchTasks, TodoistTask } from './services/todoist';

export type ViewType = 'dashboard' | 'tasks' | 'eisenhower' | 'fitness' | 'finance' | 'clients';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState<TodoistTask[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error('Failed to load tasks:', err);
      }
    };
    loadTasks();
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} tasks={tasks} />;
      case 'tasks':
        return <TasksView />;
      case 'eisenhower':
        return <EisenhowerMatrix tasks={tasks} />;
      case 'fitness':
        return <FitnessView />;
      case 'finance':
        return <FinanceView />;
      case 'clients':
        return <ClientsView />;
      default:
        return <Dashboard setActiveView={setActiveView} tasks={tasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0f0d] text-white overflow-hidden">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
}
