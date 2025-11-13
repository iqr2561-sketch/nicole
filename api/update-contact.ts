import type { VercelRequest, VercelResponse } from '@vercel/node';
import { updateContact } from './portfolio';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { whatsapp, github, linkedin, instagram } = request.body;
    await updateContact({ whatsapp, github, linkedin, instagram });
    response.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in update-contact:', error);
    response.status(500).json({ error: 'Failed to update contact' });
  }
}

