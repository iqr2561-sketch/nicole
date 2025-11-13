import type { VercelRequest, VercelResponse } from '@vercel/node';
import { upsertPhoto, deletePhoto } from './portfolio';
import type { Photo } from '../data/portfolioService';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method === 'POST') {
    try {
      const photo: Photo = request.body;
      await upsertPhoto(photo);
      response.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in photos POST:', error);
      response.status(500).json({ error: 'Failed to save photo' });
    }
  } else if (request.method === 'DELETE') {
    try {
      const { photoId } = request.body;
      await deletePhoto(photoId);
      response.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in photos DELETE:', error);
      response.status(500).json({ error: 'Failed to delete photo' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
}

