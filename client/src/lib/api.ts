const API_URL = 'http://localhost:3001/api';

export interface Issue {
  id: number;
  title: string;
  description: string;
}

export const getIssues = async (): Promise<Issue[]> => {
  const response = await fetch(`${API_URL}/issues`);
  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }
  return response.json();
};

export const createIssue = async (issue: Omit<Issue, 'id'>): Promise<Issue> => {
  const response = await fetch(`${API_URL}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issue),
  });
  if (!response.ok) {
    throw new Error('Failed to create issue');
  }
  return response.json();
};

export const updateIssue = async (issue: Issue): Promise<Issue> => {
  const response = await fetch(`${API_URL}/issues/${issue.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(issue),
  });
  if (!response.ok) {
    throw new Error('Failed to update issue');
  }
  return response.json();
};

export const deleteIssue = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/issues/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete issue');
  }
};