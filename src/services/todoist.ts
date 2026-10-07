const TODOIST_API_TOKEN = 'e2456bee2a0a3512d880fd575a7faddd5235dbdf';
const TODOIST_API_BASE = 'https://api.todoist.com/rest/v2';

// Try direct first, then CORS proxies as fallback
const FETCH_STRATEGIES = [
  // Direct (works in some environments like Electron, or if CORS is configured)
  (endpoint: string) => TODOIST_API_BASE + endpoint,
  // CORS proxies
  (endpoint: string) => `https://corsproxy.io/?${encodeURIComponent(TODOIST_API_BASE + endpoint)}`,
  (endpoint: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(TODOIST_API_BASE + endpoint)}`,
  (endpoint: string) => `https://proxy.cors.sh/${TODOIST_API_BASE + endpoint}`,
];

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

async function todoistFetch(endpoint: string, options: RequestInit = {}) {
  let lastError: Error | null = null;

  for (const buildUrl of FETCH_STRATEGIES) {
    try {
      const url = buildUrl(endpoint);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${TODOIST_API_TOKEN}`,
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Todoist API error (${response.status}): ${errorText}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      continue;
    }
  }

  throw lastError || new Error('All connection methods failed. Please check your network and API token.');
}

export async function fetchTasks(): Promise<TodoistTask[]> {
  const response = await todoistFetch('/tasks');
  return await response.json();
}

export async function fetchProjects(): Promise<TodoistProject[]> {
  const response = await todoistFetch('/projects');
  return await response.json();
}

export async function completeTask(taskId: string): Promise<void> {
  await todoistFetch(`/tasks/${taskId}/close`, {
    method: 'POST',
  });
}

export async function uncompleteTask(taskId: string): Promise<void> {
  await todoistFetch(`/tasks/${taskId}/reopen`, {
    method: 'POST',
  });
}
