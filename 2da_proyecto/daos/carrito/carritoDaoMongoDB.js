const Contenedor = require("../../contenedores/ContenedorMongodb.js")
const mongoose = require("mongoose")
const { mongoConnect } = require("../../mongoDB/connection.js")

const carritosCollection = "carritos";

const CarritosSchema = new mongoose.Schema({
    title: { type: String, require: true },
    thumbnail: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true }
});

const carritos = mongoose.model(carritosCollection, CarritosSchema)

class CarritoDaoMongoDb extends Contenedor {
    constructor() {
        super(mongoConnect, carritos);
    }
}

module.exports = CarritoDaoMongoDb