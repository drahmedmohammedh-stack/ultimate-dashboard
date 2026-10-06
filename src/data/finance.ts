export interface FinanceEntry {
  month: string;
  income: number;
  expenses: number;
}

export interface Account {
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'investment';
  change: number;
}

export const financeData = {
  income: 12450,
  expenses: 7820,
  savings: 4630,
  monthlyHistory: [
    { month: 'Oct', income: 10200, expenses: 7100 },
    { month: 'Nov', income: 11800, expenses: 7500 },
    { month: 'Dec', income: 9800, expenses: 8200 },
    { month: 'Jan', income: 11200, expenses: 7000 },
    { month: 'Feb', income: 12100, expenses: 7400 },
    { month: 'Mar', income: 12450, expenses: 7820 },
  ] as FinanceEntry[],
  accounts: [
    { name: 'Business Checking', balance: 24500, type: 'checking' as const, change: 5.2 },
    { name: 'Personal Savings', balance: 45200, type: 'savings' as const, change: 2.1 },
    { name: 'Investment Portfolio', balance: 89300, type: 'investment' as const, change: 8.4 },
  ] as Account[],
  recentTransactions: [
    { id: '1', description: 'Client Payment - Acme Corp', amount: 4500, type: 'income', date: 'Mar 15' },
    { id: '2', description: 'Office Rent', amount: -2200, type: 'expense', date: 'Mar 14' },
    { id: '3', description: 'Client Payment - TechStart', amount: 3200, type: 'income', date: 'Mar 12' },
    { id: '4', description: 'Software Subscriptions', amount: -340, type: 'expense', date: 'Mar 11' },
    { id: '5', description: 'Client Payment - GreenLeaf', amount: 2800, type: 'income', date: 'Mar 10' },
    { id: '6', description: 'Equipment Purchase', amount: -890, type: 'expense', date: 'Mar 9' },
    { id: '7', description: 'Freelance Project', amount: 1950, type: 'income', date: 'Mar 8' },
  ],
};
