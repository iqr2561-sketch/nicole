import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getPortfolioData } from './portfolio';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const data = await getPortfolioData();
    response.status(200).json(data);
  } catch (error) {
    console.error('Error in get-portfolio:', error);
    response.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
}

