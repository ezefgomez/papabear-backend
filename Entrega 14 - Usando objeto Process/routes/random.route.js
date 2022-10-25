import express from 'express';
import randomClass from '../controllers/random.controller.js';

const randomRoute = express.Router();
const random = new randomClass();

randomRoute.get('/', random.getRandom);
randomRoute.get('/number', random.getNumber);

export default randomRoute;