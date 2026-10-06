import { ViewType } from '../App';
import {
  LayoutDashboard,
  CheckSquare,
  Dumbbell,
  DollarSign,
  Users,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
} from 'lucide-react';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const navItems: { id: ViewType; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={20} /> },
  { id: 'fitness', label: 'Fitness', icon: <Dumbbell size={20} /> },
  { id: 'finance', label: 'Finance', icon: <DollarSign size={20} /> },
  { id: 'clients', label: 'Clients', icon: <Users size={20} /> },
];

export default function Sidebar({ activeView, setActiveView, collapsed, setCollapsed }: SidebarProps) {
  return (
    <aside
      className={`relative flex flex-col bg-[#0d1410] border-r border-white/5 transition-all duration-300 ${
        collapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center font-bold text-sm text-black shrink-0">
          CC
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-semibold text-white whitespace-nowrap">Command Center</h1>
            <p className="text-[11px] text-white/40 whitespace-nowrap">Personal Dashboard</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeView === item.id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-white/50 hover:text-white/80 hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className="shrink-0">{item.icon}</span>
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all border border-transparent">
          <Bell size={20} />
          {!collapsed && <span>Notifications</span>}
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all border border-transparent">
          <Settings size={20} />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#1a2420] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-emerald-500/20 transition-all"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
