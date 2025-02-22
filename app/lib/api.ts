const API_BASE = 'http://10.0.3.119:8080/v1';
///task/findAll
export async function fetchTasks(userId: string) {
  //const response = await fetch(`${API_BASE}/task?userId=${userId}`);
  const response = await fetch(`${API_BASE}/task/findAll`);
  return response.json();
}

export async function updateTaskStatus(taskId: string, status: string) {
  const response = await fetch(`${API_BASE}/task/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return response.json();
}

export async function fetchChildren(parentId: string) {
  //const response = await fetch(`${API_BASE}/child?parentId=${parentId}`);
  const response = await fetch(`${API_BASE}/child/findAll`);
  return response.json();
}

export async function addChild(parentId: string, childData: any) {
  const response = await fetch(`${API_BASE}/child`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parentId, ...childData }),
  });
  return response.json();
}

export async function removeChild(childId: string) {
  const response = await fetch(`${API_BASE}/child/${childId}`, {
    method: 'DELETE',
  });
  return response.json();
}