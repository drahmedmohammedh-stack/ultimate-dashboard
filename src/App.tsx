import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TasksView from './components/TasksView';
import FitnessView from './components/FitnessView';
import FinanceView from './components/FinanceView';
import ClientsView from './components/ClientsView';

export type ViewType = 'dashboard' | 'tasks' | 'fitness' | 'finance' | 'clients';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'tasks':
        return <TasksView />;
      case 'fitness':
        return <FitnessView />;
      case 'finance':
        return <FinanceView />;
      case 'clients':
        return <ClientsView />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
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
