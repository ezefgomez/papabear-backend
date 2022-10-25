import productoModel from '../models/producto.model.js';

class productoClass {
    
    async add(req, res) {
        try {
        if (!req) {
            return res.status(404).json({ mensaje: 'Error al agregar un producto' });
        }
        
        const data = {
            title: req.producto.title,
            price: req.producto.price,
            thumbnail: req.producto.thumbnail
        }
        const newProduct = await productoModel.create(data);
        }
        catch (error) {
        console.log(error);
        }
    }

    async findAll(req, res) {
        try {
        const productoFind = await productoModel.find({});
        return res.status(200).json(productoFind);
        }
        catch (error) {
        return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }

    async findByID(req, res) {
        const _id = req.params.id;
        
        try {
        if (_id === "") {
            return res.status(404).json({ mensaje: 'Producto no encontrado', error });
        }
        
        const prodById = await productoModel.findOne({ _id });
        if (!prodById) { 
            return res.status(404).json({ mensaje: 'No se encontró el producto' });
        }
        return res.status(200).json(prodById);
        }
        catch (error) {
        return res.status(400).json({ mensaje: 'Ocurrió un error', error });
        }
    }

    async deleteProd(req, res) {
        const _id = req.params.id;
        try {
        if (_id === "") {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        const prodToDel = await productoModel.deleteOne({ _id });
        if (!prodToDel) { 
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Producto eliminado con exito' });
        }
        catch (error) {
        return res.status(400).json({ mensaje: 'Ocurrió un error', error });
        }
    }

    async update(req, res) {
        const _id = req.params.id;
        const data = { ...req.body };
        
        try {
        const prodUpdated = await productoModel.updateOne({ _id }, data, { new: true });
        return res.status(200).json({ prodUpdated, mensaje: 'Producto actualizado' });
        }
        catch (error) {
        return res.status(400).json({ mensaje: 'Ocurrió un error', error });
        }
    }
}

export default productoClass;