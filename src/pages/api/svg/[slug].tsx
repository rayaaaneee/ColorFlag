import { NextApiRequest, NextApiResponse } from 'next';
import * as fs from 'fs';
import * as path from 'path';

// Handler function for GET requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Construct the file path using the query parameter
            const svgFilename = `${req.query.slug}.svg`;
            const filePath = path.join(process.cwd(), 'asset', 'img', 'flags', '4x3', svgFilename);

            // Read the SVG file content
            const svgContent = fs.readFileSync(filePath, 'utf-8');

            // Send the SVG content in the response
            res.status(200).json({ svg: svgContent });
        } catch (error) {
            console.error('Error reading SVG file:', error);
            // Send error response
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
