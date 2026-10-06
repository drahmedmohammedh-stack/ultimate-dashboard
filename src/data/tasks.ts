export interface Task {
  id: string;
  title: string;
  project: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  tags: string[];
}

export const tasksData: Task[] = [
  {
    id: '1',
    title: 'Finalize Q1 financial report for client',
    project: 'Acme Corp',
    priority: 'high',
    dueDate: 'Today',
    completed: false,
    tags: ['finance', 'report'],
  },
  {
    id: '2',
    title: 'Review and approve new design mockups',
    project: 'TechStart Inc',
    priority: 'high',
    dueDate: 'Today',
    completed: false,
    tags: ['design', 'review'],
  },
  {
    id: '3',
    title: 'Send invoice for March deliverables',
    project: 'GreenLeaf Co',
    priority: 'medium',
    dueDate: 'Tomorrow',
    completed: false,
    tags: ['billing'],
  },
  {
    id: '4',
    title: 'Prepare presentation for board meeting',
    project: 'Acme Corp',
    priority: 'high',
    dueDate: 'Wed',
    completed: false,
    tags: ['presentation'],
  },
  {
    id: '5',
    title: 'Update project timeline in Notion',
    project: 'TechStart Inc',
    priority: 'low',
    dueDate: 'Thu',
    completed: false,
    tags: ['planning'],
  },
  {
    id: '6',
    title: 'Code review for API endpoints',
    project: 'DataFlow',
    priority: 'medium',
    dueDate: 'Thu',
    completed: false,
    tags: ['development'],
  },
  {
    id: '7',
    title: 'Schedule follow-up call with marketing team',
    project: 'GreenLeaf Co',
    priority: 'low',
    dueDate: 'Fri',
    completed: false,
    tags: ['communication'],
  },
  {
    id: '8',
    title: 'Deploy staging environment updates',
    project: 'DataFlow',
    priority: 'medium',
    dueDate: 'Fri',
    completed: true,
    tags: ['development', 'deployment'],
  },
  {
    id: '9',
    title: 'Write blog post about new features',
    project: 'Personal',
    priority: 'low',
    dueDate: 'Sat',
    completed: true,
    tags: ['content'],
  },
  {
    id: '10',
    title: 'Client onboarding documentation',
    project: 'NewClient LLC',
    priority: 'medium',
    dueDate: 'Next Mon',
    completed: false,
    tags: ['documentation'],
  },
];
