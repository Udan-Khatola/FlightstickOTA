import appwrite from 'node-appwrite';

// read the .env file to load environment variables
import dotenv from 'dotenv';
dotenv.config();

// env variables
const SERVER_APPWRITE_ENDPOINT = process.env.SERVER_APPWRITE_ENDPOINT;
const PUBLIC_APPWRITE_PROJECT = process.env.PUBLIC_APPWRITE_PROJECT;
const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY;

const client = new appwrite.Client();

export const account = new appwrite.Account(client);
export const users = new appwrite.Users(client);
export const teams = new appwrite.Teams(client);
export const databases = new appwrite.Databases(client);
export const storage = new appwrite.Storage(client);
export const functions = new appwrite.Functions(client);
export const locale = new appwrite.Locale(client);
export const avatars = new appwrite.Avatars(client);

client
    .setEndpoint(SERVER_APPWRITE_ENDPOINT || '')
    .setProject(PUBLIC_APPWRITE_PROJECT || '')
    .setKey(APPWRITE_API_KEY || '');

