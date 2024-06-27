import { storage, SERVER_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from './index.js';

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
    const params = req.query;
    log(req.method + ' Request')
    log(JSON.stringify(req.headers));

    if (req.method !== 'GET') {
        error('Invalid method, expected GET');
        return res.send("Invalid method");
    }

    if (req.method === 'GET') {
        log("Handling GET Request")
        const files = await storage.listFiles(BUCKET_ID);
        const file = files.files[files.total - 1];
        if (file) {
            const url = `${SERVER_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/download?project=${PUBLIC_APPWRITE_PROJECT}`
            return res.redirect(url);
        } else {
            error('File not found');
            return res.send("File not found");
        }
    }
}
