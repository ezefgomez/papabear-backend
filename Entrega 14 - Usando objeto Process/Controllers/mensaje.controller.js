import mensajeModel from '../models/mensaje.model.js';
import mongoConnect from '../config/mongo.config.js';

class mensajeClass {
    constructor () {
        this.cxn = new mongoConnect();
    }

    async addMsg(req, res) {
        try {
        if (!req) {
            return res.status(404).json({ mensaje: 'Error al agregar un producto' });
        }
        const data = await { ...req };
        const newMsg = await mensajeModel.create(data);
        }
        catch (error) {
        console.log(error);
        }
    }

    async findAllMsg(req, res) {
        try {
        let mensajeFind = await mensajeModel.find();
        return res.status(200).json(mensajeFind);
        }
        catch (error) {
        return res.status(400).json({ mensaje: 'Ocurrió un error', error });
        }
    }
}

export default mensajeClass;