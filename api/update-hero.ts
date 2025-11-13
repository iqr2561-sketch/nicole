import type { VercelRequest, VercelResponse } from '@vercel/node';
import { updateHero } from './portfolio';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, subtitle } = request.body;
    await updateHero({ name, subtitle });
    response.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in update-hero:', error);
    response.status(500).json({ error: 'Failed to update hero' });
  }
}

