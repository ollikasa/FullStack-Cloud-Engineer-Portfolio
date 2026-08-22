const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getProfile() {
  const response = await fetch(`${API_URL}/profile`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
}

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}

export async function getEducation() {
  const response = await fetch(`${API_URL}/education`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch education');
  }

  return response.json();
}

export async function getCertificates() {
  const response = await fetch(`${API_URL}/certificates`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch certificates');
  }

  return response.json();
}

export async function getDocuments() {
  const response = await fetch(`${API_URL}/documents`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch documents');
  }

  return response.json();
}