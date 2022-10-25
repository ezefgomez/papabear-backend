import express from 'express';
import productoClass from '../controllers/producto.controller';
import { validate } from '../middlewares/auth'

const productoRoute = express.Router();
const producto = new productoClass();

productoRoute.post('/', validate, producto.add);
productoRoute.get('/', validate, producto.findAll);
productoRoute.get('/:id', validate, producto.findByID);
productoRoute.delete('/:id', validate, producto.deleteProd);
productoRoute.put('/:id', validate, producto.update);

export default productoRoute;