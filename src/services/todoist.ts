const TODOIST_API_TOKEN = 'e2456bee2a0a3512d880fd575a7faddd5235dbdf';
const TODOIST_API_BASE = 'https://api.todoist.com/rest/v2';

export interface TodoistTask {
  id: string;
  content: string;
  description: string;
  project_id: string;
  priority: number; // 1-4, where 4 is highest
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

export async function fetchTasks(): Promise<TodoistTask[]> {
  try {
    const response = await fetch(`${TODOIST_API_BASE}/tasks`, {
      headers: {
        'Authorization': `Bearer ${TODOIST_API_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Todoist tasks:', error);
    throw error;
  }
}

export async function fetchProjects(): Promise<TodoistProject[]> {
  try {
    const response = await fetch(`${TODOIST_API_BASE}/projects`, {
      headers: {
        'Authorization': `Bearer ${TODOIST_API_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Todoist projects:', error);
    throw error;
  }
}

export async function completeTask(taskId: string): Promise<void> {
  try {
    const response = await fetch(`${TODOIST_API_BASE}/tasks/${taskId}/close`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TODOIST_API_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to complete task: ${response.status}`);
    }
  } catch (error) {
    console.error('Error completing task:', error);
    throw error;
  }
}
