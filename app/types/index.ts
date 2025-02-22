export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'APPROVED';
  reward: number;
  childId: string;
  createdAt: string;
}

export interface Child {
  id: string;
  name: string;
  balance: number;
}

export interface User {
  id: string;
  role: 'parent' | 'child';
  name: string;
  balance: number;
}