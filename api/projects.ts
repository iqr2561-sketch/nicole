import type { VercelRequest, VercelResponse } from '@vercel/node';
import { upsertProject, deleteProject } from './portfolio';
import type { Project } from '../data/portfolioService';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method === 'POST') {
    try {
      const project: Project = request.body;
      await upsertProject(project);
      response.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in projects POST:', error);
      response.status(500).json({ error: 'Failed to save project' });
    }
  } else if (request.method === 'DELETE') {
    try {
      const { projectId } = request.body;
      await deleteProject(projectId);
      response.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in projects DELETE:', error);
      response.status(500).json({ error: 'Failed to delete project' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
}

