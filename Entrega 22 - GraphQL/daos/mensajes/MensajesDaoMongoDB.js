const Contenedor = require("../../contenedores/ContenedorMongodb.js")
const mongoose = require("mongoose")


const Author = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true }
})

class MensajesDaoMongoDB extends Contenedor {
    constructor() {
        super('mensajes', new mongoose.Schema({
            author: { type: Author, required: true },
            text: { type: String, required: true },
            timestamp: { type: String, required: true }
        }));
    }
}

export default MensajesDaoMongoDB;