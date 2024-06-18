import * as fs from 'fs';
import { type NextApiRequest, type NextApiResponse } from 'next';
import path from 'path';

// Handler function for GET requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const country_code: string = req.query.slug as string;
    const svgFilename: string = `${country_code}.svg`;

    const DEV_MODE = process.env.NODE_ENV === 'development';

    const filePath = DEV_MODE ? path.join("src", "asset", "img", "flags", "country", "4x3", svgFilename) : "";

    if (req.method === 'PUT') {
        const newSvgContent = req.body.svg;
        try {
            fs.writeFileSync(filePath, newSvgContent);
            res.status(200).json({ success: true, message: 'SVG file updated' });
        } catch (error) {
            console.error('Error writing SVG file:', error);
            res.status(500).json({ success: false, message: 'An error occured while updating SVG File' });
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
