import { ID } from 'node-appwrite';
import { storage, SERVER_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from './index.js';
import { InputFile } from 'node-appwrite/file';

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
    const params = req.query;

    if (req.method !== 'POST' && req.method !== 'GET') {
        error('Invalid method, expected POST or GET');
        return res.send("Invalid method");
    }

    if (req.method === 'GET') {
        log("GET Request")
        const files = await storage.listFiles(BUCKET_ID);
        const file = files.files[files.files.length - 1];
        if (file) {
            const url = `${SERVER_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/download?project=${PUBLIC_APPWRITE_PROJECT}`
            return res.redirect(url);
        } else {
            error('File not found');
            return res.send("File not found");
        }
    }

    if (req.method === 'POST') {
        log("POST Request")
        const name = params.name + "-" + params.version + ".bin";
        const OTA_FILE_BYTES = req.bodyRaw;
        const file = await storage.createFile(BUCKET_ID, ID.unique(), InputFile.fromBuffer(new Blob([OTA_FILE_BYTES], { type: 'application/octet-stream' }), name));

        if (file.$id) {
            log('File created successfully');
            return res.send("File created successfully");
        } else {
            error('Failed to create file');
            return res.send("Failed to create file");
        }
    }
}
