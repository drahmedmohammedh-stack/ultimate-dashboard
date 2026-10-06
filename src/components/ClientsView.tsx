import { Users, Clock, DollarSign, ExternalLink, Mail, Calendar } from 'lucide-react';
import { clientsData } from '../data/clients';

export default function ClientsView() {
  const activeClients = clientsData.filter((c) => c.status === 'active');
  const totalRevenue = activeClients.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users size={20} className="text-orange-400" />
            <h1 className="text-xl font-bold text-white">Active Clients</h1>
          </div>
          <p className="text-sm text-white/40">
            {activeClients.length} active · ${totalRevenue.toLocaleString()} total revenue
          </p>
        </div>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111916] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={14} className="text-orange-400" />
            <span className="text-[11px] text-white/40">Active Clients</span>
          </div>
          <p className="text-2xl font-bold text-white">{activeClients.length}</p>
        </div>
        <div className="bg-[#111916] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={14} className="text-emerald-400" />
            <span className="text-[11px] text-white/40">Monthly Revenue</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-[#111916] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={14} className="text-purple-400" />
            <span className="text-[11px] text-white/40">Avg. Progress</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {Math.round(activeClients.reduce((sum, c) => sum + c.progress, 0) / activeClients.length)}%
          </p>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {clientsData.map((client) => (
          <div
            key={client.id}
            className="bg-[#111916] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: client.color + '20', color: client.color }}
                >
                  {client.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{client.name}</h3>
                  <p className="text-[11px] text-white/40">{client.project}</p>
                </div>
              </div>
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                  client.status === 'active'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : client.status === 'paused'
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    : 'bg-white/5 text-white/40 border border-white/10'
                }`}
              >
                {client.status}
              </span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-white/40">Project Progress</span>
                <span className="text-[11px] text-white/60 font-medium">{client.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${client.progress}%`,
                    backgroundColor: client.color,
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <DollarSign size={12} className="text-white/30" />
                <div>
                  <p className="text-[10px] text-white/30">Revenue</p>
                  <p className="text-xs text-white/80 font-medium">${client.revenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={12} className="text-white/30" />
                <div>
                  <p className="text-[10px] text-white/30">Last Contact</p>
                  <p className="text-xs text-white/80 font-medium">{client.lastContact}</p>
                </div>
              </div>
            </div>

            {/* Next Milestone */}
            <div className="mt-3 pt-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Calendar size={11} className="text-white/30" />
                <span className="text-[11px] text-white/40">Next: </span>
                <span className="text-[11px] text-white/60">{client.nextMilestone}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-white/50 hover:text-white/80 hover:border-white/10 transition-all">
                <Mail size={12} />
                Email
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-white/50 hover:text-white/80 hover:border-white/10 transition-all">
                <ExternalLink size={12} />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
