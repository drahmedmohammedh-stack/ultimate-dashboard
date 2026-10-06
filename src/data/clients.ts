export interface Client {
  id: string;
  name: string;
  project: string;
  status: 'active' | 'paused' | 'completed';
  revenue: number;
  progress: number;
  color: string;
  lastContact: string;
  nextMilestone: string;
}

export const clientsData: Client[] = [
  {
    id: '1',
    name: 'Acme Corp',
    project: 'Financial Dashboard Redesign',
    status: 'active',
    revenue: 15000,
    progress: 72,
    color: '#3FBA3F',
    lastContact: '2 hours ago',
    nextMilestone: 'Final Review - Mar 22',
  },
  {
    id: '2',
    name: 'TechStart Inc',
    project: 'Mobile App Development',
    status: 'active',
    revenue: 22000,
    progress: 45,
    color: '#61E190',
    lastContact: '1 day ago',
    nextMilestone: 'Beta Release - Apr 5',
  },
  {
    id: '3',
    name: 'GreenLeaf Co',
    project: 'E-commerce Platform',
    status: 'active',
    revenue: 8500,
    progress: 88,
    color: '#6866AA',
    lastContact: '3 days ago',
    nextMilestone: 'Launch - Mar 28',
  },
  {
    id: '4',
    name: 'DataFlow',
    project: 'API Integration',
    status: 'active',
    revenue: 6200,
    progress: 30,
    color: '#F59E0B',
    lastContact: '5 hours ago',
    nextMilestone: 'Phase 1 Complete - Apr 1',
  },
  {
    id: '5',
    name: 'NewClient LLC',
    project: 'Brand Identity Package',
    status: 'paused',
    revenue: 4000,
    progress: 15,
    color: '#EF4444',
    lastContact: '1 week ago',
    nextMilestone: 'Kickoff Call - TBD',
  },
  {
    id: '6',
    name: 'CloudNine SaaS',
    project: 'Landing Page Design',
    status: 'completed',
    revenue: 3500,
    progress: 100,
    color: '#8B5CF6',
    lastContact: '2 weeks ago',
    nextMilestone: 'Completed',
  },
];
