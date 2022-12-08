import { serverListen } from './src/server.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers'
import mongoose from "mongoose";
import config from './src/config.js';
import cluster from "cluster";
import os from 'os';

await mongoose.connect(config.mongodb.connectionString)

const PORT = process.env.PORT || 8080
serverListen(PORT);