const TODOIST_API_TOKEN = 'e2456bee2a0a3512d880fd575a7faddd5235dbdf';
const TODOIST_API_BASE = 'https://api.todoist.com/rest/v2';

// When deployed to Vercel, requests go through /api/todoist serverless function
// In preview/dev, we try CORS proxies as fallback
const USE_VERCEL_PROXY = typeof window !== 'undefined' && window.location.hostname.includes('vercel');

export interface TodoistTask {
  id: string;
  content: string;
  description: string;
  project_id: string;
  priority: number; // 1-4, where 4 is highest (urgent)
  due?: {
    date: string;
    string: string;
  };
  labels: string[];
  is_completed: boolean;
  created_at: string;
}

export interface TodoistProject {
  id: string;
  name: string;
  color: string;
}

// Mock data for demo/preview when API is unreachable
const MOCK_TASKS: TodoistTask[] = [
  {
    id: 'mock-1',
    content: 'Finalize Q1 financial report for Acme Corp',
    description: '',
    project_id: 'proj-1',
    priority: 4,
    due: { date: '2026-03-17', string: 'Today' },
    labels: ['finance', 'urgent'],
    is_completed: false,
    created_at: '2026-03-15T10:00:00Z',
  },
  {
    id: 'mock-2',
    content: 'Review and approve new design mockups',
    description: '',
    project_id: 'proj-2',
    priority: 4,
    due: { date: '2026-03-17', string: 'Today' },
    labels: ['design'],
    is_completed: false,
    created_at: '2026-03-15T11:00:00Z',
  },
  {
    id: 'mock-3',
    content: 'Send invoice for March deliverables',
    description: '',
    project_id: 'proj-3',
    priority: 3,
    due: { date: '2026-03-18', string: 'Tomorrow' },
    labels: ['billing'],
    is_completed: false,
    created_at: '2026-03-14T09:00:00Z',
  },
  {
    id: 'mock-4',
    content: 'Prepare presentation for board meeting',
    description: '',
    project_id: 'proj-1',
    priority: 3,
    due: { date: '2026-03-19', string: 'Wed' },
    labels: ['presentation'],
    is_completed: false,
    created_at: '2026-03-13T14:00:00Z',
  },
  {
    id: 'mock-5',
    content: 'Update project timeline in Notion',
    description: '',
    project_id: 'proj-2',
    priority: 2,
    due: { date: '2026-03-20', string: 'Thu' },
    labels: ['planning'],
    is_completed: false,
    created_at: '2026-03-12T16:00:00Z',
  },
  {
    id: 'mock-6',
    content: 'Code review for API endpoints',
    description: '',
    project_id: 'proj-4',
    priority: 2,
    due: { date: '2026-03-20', string: 'Thu' },
    labels: ['development'],
    is_completed: false,
    created_at: '2026-03-11T10:00:00Z',
  },
  {
    id: 'mock-7',
    content: 'Schedule follow-up call with marketing team',
    description: '',
    project_id: 'proj-3',
    priority: 1,
    due: { date: '2026-03-21', string: 'Fri' },
    labels: ['communication'],
    is_completed: false,
    created_at: '2026-03-10T11:00:00Z',
  },
  {
    id: 'mock-8',
    content: 'Deploy staging environment updates',
    description: '',
    project_id: 'proj-4',
    priority: 2,
    due: { date: '2026-03-21', string: 'Fri' },
    labels: ['development', 'deployment'],
    is_completed: true,
    created_at: '2026-03-09T09:00:00Z',
  },
  {
    id: 'mock-9',
    content: 'Write blog post about new features',
    description: '',
    project_id: 'proj-5',
    priority: 1,
    due: { date: '2026-03-22', string: 'Sat' },
    labels: ['content'],
    is_completed: true,
    created_at: '2026-03-08T15:00:00Z',
  },
  {
    id: 'mock-10',
    content: 'Client onboarding documentation',
    description: '',
    project_id: 'proj-6',
    priority: 2,
    due: { date: '2026-03-24', string: 'Next Mon' },
    labels: ['documentation'],
    is_completed: false,
    created_at: '2026-03-07T10:00:00Z',
  },
];

async function fetchViaProxy(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const targetUrl = `${TODOIST_API_BASE}${endpoint}`;
  
  // Try Vercel serverless proxy first
  try {
    const response = await fetch(`/api/todoist?endpoint=${encodeURIComponent(endpoint)}&method=${options.method || 'GET'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    if (response.ok) return response;
  } catch (e) {
    // Vercel proxy not available
  }

  // Fallback: CORS proxy
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
  const response = await fetch(proxyUrl, {
    method: options.method || 'GET',
    headers: {
      'Authorization': `Bearer ${TODOIST_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response;
}

export async function fetchTasks(): Promise<TodoistTask[]> {
  try {
    const response = await fetchViaProxy('/tasks');
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch from Todoist API, using demo data:', error);
    // Return mock data so the UI still works in preview
    return MOCK_TASKS;
  }
}

export async function fetchProjects(): Promise<TodoistProject[]> {
  try {
    const response = await fetchViaProxy('/projects');
    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch projects, using empty array');
    return [];
  }
}

export async function completeTask(taskId: string): Promise<void> {
  // Skip API call for mock tasks
  if (taskId.startsWith('mock-')) {
    return;
  }
  
  try {
    await fetchViaProxy(`/tasks/${taskId}/close`, { method: 'POST' });
  } catch (error) {
    console.error('Error completing task:', error);
  }
}

export async function uncompleteTask(taskId: string): Promise<void> {
  if (taskId.startsWith('mock-')) {
    return;
  }
  
  try {
    await fetchViaProxy(`/tasks/${taskId}/reopen`, { method: 'POST' });
  } catch (error) {
    console.error('Error reopening task:', error);
  }
}

export function isDemoMode(tasks: TodoistTask[]): boolean {
  return tasks.length > 0 && tasks[0].id.startsWith('mock-');
}
