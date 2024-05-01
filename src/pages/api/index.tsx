// app/api/svg/route.tsx

import { NextApiRequest, NextApiResponse } from 'next';

// Handler function for GET requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle GET request
        res.status(200).json({ message: 'GET request received' });
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
