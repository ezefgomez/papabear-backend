const Contenedor = require("../../contenedores/ContenedorMongoDB.js")
const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/ecommerce"
const productosCollection = "productos"

const ProductosSchema = new mongoose.Schema({
	title: { type: String, require: true },
	thumbnail: { type: String, require: true },
	price: { type: Number, require: true },
	stock: { type: Number, require: true }
})

const productos = mongoose.model(productosCollection, ProductosSchema)

class ProductosDaoMongodb extends Contenedor {
	constructor() {
		super(url, productos)
	}
}

module.exports = ProductosDaoMongodb