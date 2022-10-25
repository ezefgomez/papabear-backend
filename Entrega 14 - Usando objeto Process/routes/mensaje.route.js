import express from 'express';
import mensajeClass from '../Controllers/mensaje.controller.js';
import { validate } from '../middlewares/auth.js';

const mensajeRoute = express.Router();
const mensaje = new mensajeClass();

mensajeRoute.post('/', validate, mensaje.addMsg);
mensajeRoute.get('/', validate, mensaje.findAllMsg);

export default mensajeRoute;