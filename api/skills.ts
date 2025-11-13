import type { VercelRequest, VercelResponse } from '@vercel/node';
import { upsertSkill, deleteSkill } from './portfolio';
import type { Skill } from '../data/portfolioService';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method === 'POST') {
    try {
      const skill: Skill = request.body;
      await upsertSkill(skill);
      response.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in skills POST:', error);
      response.status(500).json({ error: 'Failed to save skill' });
    }
  } else if (request.method === 'DELETE') {
    try {
      const { skillId } = request.body;
      await deleteSkill(skillId);
      response.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in skills DELETE:', error);
      response.status(500).json({ error: 'Failed to delete skill' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
}

