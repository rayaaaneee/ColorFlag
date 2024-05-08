import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';

// Handler function for GET requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const svgFilename = `${req.query.slug}.svg`;
            const filePath = "src/asset/img/flags/4x3/" + svgFilename;

            const svgContent = fs.readFileSync(filePath, 'utf-8');

            res.status(200).json({ svg: svgContent });
        } catch (error) {
            console.error('Error reading SVG file:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
