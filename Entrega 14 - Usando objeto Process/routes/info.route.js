import express from 'express';
import infoClass from '../controllers/info.controller.js';

const infoRoute = express.Router();
const info = new infoClass();

infoRoute.get('/', info.getInfo);

export default infoRoute;