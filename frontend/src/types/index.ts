export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  vision?: string;
  mission?: string;
  location?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  technologies: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startYear?: number;
  endYear?: number;
  grade?: string;
  description?: string;
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialUrl?: string;
  fileUrl?: string;
}

export interface Document {
  id: number;
  title: string;
  category: string;
  fileUrl: string;
  description?: string;
}