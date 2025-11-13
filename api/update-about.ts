import type { VercelRequest, VercelResponse } from '@vercel/node';
import { updateAbout } from './portfolio';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bio, avatarUrl } = request.body;
    await updateAbout({ bio, avatarUrl });
    response.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in update-about:', error);
    response.status(500).json({ error: 'Failed to update about' });
  }
}

