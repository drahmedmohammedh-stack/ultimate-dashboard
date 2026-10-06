import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Wallet, PiggyBank, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { financeData } from '../data/finance';

export default function FinanceView() {
  const { income, expenses, savings, monthlyHistory, accounts, recentTransactions } = financeData;
  const savingsRate = Math.round((savings / income) * 100);

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={20} className="text-purple-400" />
            <h1 className="text-xl font-bold text-white">Finances</h1>
          </div>
          <p className="text-sm text-white/40">March 2026 Overview</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <TrendingUp size={16} className="text-emerald-400" />
            </div>
            <span className="text-xs text-white/40">Income</span>
          </div>
          <p className="text-2xl font-bold text-emerald-400">${income.toLocaleString()}</p>
          <p className="text-[11px] text-white/30 mt-1">+8.4% from last month</p>
        </div>
        <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <TrendingDown size={16} className="text-red-400" />
            </div>
            <span className="text-xs text-white/40">Expenses</span>
          </div>
          <p className="text-2xl font-bold text-red-400">${expenses.toLocaleString()}</p>
          <p className="text-[11px] text-white/30 mt-1">+5.6% from last month</p>
        </div>
        <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <PiggyBank size={16} className="text-purple-400" />
            </div>
            <span className="text-xs text-white/40">Net Savings</span>
          </div>
          <p className="text-2xl font-bold text-white">${savings.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-400 mt-1">{savingsRate}% savings rate</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#111916] border border-white/5 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Income vs Expenses</h2>
          </div>
          <span className="text-[11px] text-white/30">Last 6 months</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyHistory} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3FBA3F" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3FBA3F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a2420',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#3FBA3F"
                fill="url(#incomeGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                fill="url(#expenseGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-white/40">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-[11px] text-white/40">Expenses</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accounts */}
        <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Wallet size={16} className="text-purple-400" />
            <h2 className="text-sm font-semibold text-white">Accounts</h2>
          </div>
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.name}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div>
                  <p className="text-sm text-white/90">{account.name}</p>
                  <p className="text-[11px] text-white/30 capitalize">{account.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">${account.balance.toLocaleString()}</p>
                  <p className="text-[11px] text-emerald-400 flex items-center justify-end gap-0.5">
                    <ArrowUpRight size={10} />
                    {account.change}%
                  </p>
                </div>
              </div>
            ))}
            <div className="pt-3 mt-3 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Total Net Worth</span>
                <span className="text-lg font-bold text-white">
                  ${accounts.reduce((sum, a) => sum + a.balance, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#111916] border border-white/5 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Recent Transactions</h2>
          <div className="space-y-2">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      tx.type === 'income'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}
                  >
                    {tx.type === 'income' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                  </div>
                  <div>
                    <p className="text-xs text-white/80">{tx.description}</p>
                    <p className="text-[10px] text-white/30">{tx.date}</p>
                  </div>
                </div>
                <span
                  className={`text-sm font-medium ${
                    tx.amount > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
