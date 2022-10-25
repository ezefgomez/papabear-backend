import dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config();

const portDef = process.env.PORT || 8080;

// "p": "port" : alias to param p
const { port } = minimist(process.argv.slice(2), { alias: { "p": "port" }, default: { "port":  portDef} });

export const serverConfig = {
    MONGO_ATLAS: process.env.MONGO_ATLAS || "",
    PORT: port
};