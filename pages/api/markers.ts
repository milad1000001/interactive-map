// pages/api/markers.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    { lat: 51.505, lng: -0.09, description: 'Marker 1' },
    { lat: 51.51, lng: -0.1, description: 'Marker 2' },
  ]);
}