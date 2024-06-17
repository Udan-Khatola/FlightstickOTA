import { ID } from 'node-appwrite';
import { storage } from './index.js';

/**
 * Represents the context object.
 * @typedef {Object} Context
 * @property {any} req - The request object.
 * @property {any} res - The response object.
 * @property {(msg: any) => void} log - The log function.
 * @property {(msg: any) => void} error - The error function.
 */

const BUCKET_ID = "666996a9000f8aa81832";

/**
 * The main function that handles the HTTP trigger.
 * @param {Context} context - The context object.
 * @returns {Promise<void>} - A promise that resolves when the function is completed.
 */
export default async function main({ req, res, log, error }) {
    const headers = req.headers;
    const trigger = headers['x-appwrite-trigger'];

    if (trigger !== 'http') {
        error('Invalid trigger, expected http');
        return res.send("Invalid trigger", 405);
    }

    if (req.method !== 'POST' && req.method !== 'GET') {
        error('Invalid method, expected POST or GET');
        return res.send("Invalid method", 405);
    }

    if (req.method === 'GET') {
        // return the file created in the POST request
        // const files = await storage.listFiles(BUCKET_ID);
        // const file = files.files[0];
        // if (file) {
        //     const fileData = await storage.getFileView(BUCKET_ID, file.$id);
        //     return res.send(fileData, 200);
        // } else {
        //     error('File not found');
        //     return res.send("File not found", 404);
        // }
        return res.send("GET method not implemented");
    }

    if (req.method === 'POST') {
        const OTA_FILE_BYTES = req.bodyRaw;
        const OTA_FILE = new File(new Blob([OTA_FILE_BYTES]), 'firmware.ota', { type: 'application/octet-stream' });
        const file = await storage.createFile(BUCKET_ID, ID.unique(), OTA_FILE);

        if (file.$id) {
            log('File created successfully');
            return res.send("File created successfully", 200);
        } else {
            error('Failed to create file');
            return res.send("Failed to create file", 500);
        }
    }
}
