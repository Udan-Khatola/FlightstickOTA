import { Client, Storage } from 'node-appwrite';

// read the .env file to load environment variables
import dotenv from 'dotenv';
dotenv.config();

// env variables
export const SERVER_APPWRITE_ENDPOINT = process.env.SERVER_APPWRITE_ENDPOINT;
export const PUBLIC_APPWRITE_PROJECT = process.env.PUBLIC_APPWRITE_PROJECT;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;

const client = new Client()
    .setEndpoint(SERVER_APPWRITE_ENDPOINT || '')
    .setProject(PUBLIC_APPWRITE_PROJECT || '')
    .setKey(APPWRITE_API_KEY || '');

export const storage = new Storage(client);



