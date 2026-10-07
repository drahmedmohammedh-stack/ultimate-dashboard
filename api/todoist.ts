import type { VercelRequest, VercelResponse } from '@vercel/node';

const TODOIST_API_TOKEN = 'e2456bee2a0a3512d880fd575a7faddd5235dbdf';
const TODOIST_API_BASE = 'https://api.todoist.com/rest/v2';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { endpoint, method = 'GET' } = req.query;
    
    if (!endpoint || typeof endpoint !== 'string') {
      return res.status(400).json({ error: 'Endpoint parameter is required' });
    }

    const targetUrl = `${TODOIST_API_BASE}${endpoint}`;
    
    const fetchOptions: RequestInit = {
      method: method as string,
      headers: {
        'Authorization': `Bearer ${TODOIST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    // Add body for POST requests
    if (method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);

    // Handle empty responses (like from close/reopen endpoints)
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from Todoist',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
