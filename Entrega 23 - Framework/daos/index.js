require("dotenv").config();

const CarritoDaoArchivo = require("./carrito/CarritoDaoArchivo.js");
const CarritoDaoFirebase = require("./carrito/CarritoDaoFirebase.js");
const CarritoDaoMongoDB = require("./carrito/CarritoDaoMongoDB.js");

const ProductosDaoArchivo = require("./productos/ProductosDaoArchivo.js");
const ProductosDaoMongoDB = require("./productos/ProductosDaoMongoDB.js");
const ProductosDaoFirebase = require("./productos/ProductosDaoFirebase.js");

if (process.env.DAO === "fs") {
	exports.Carrito = CarritoDaoArchivo
	exports.Productos = ProductosDaoArchivo
} else if (process.env.DAO === "mongo") {
	exports.Carrito = CarritoDaoMongoDB
	exports.Productos = ProductosDaoMongoDB
} else if (process.env.DAO === "firebase") {
	exports.Carrito = CarritoDaoFirebase
	exports.Productos = ProductosDaoFirebase
} else {
	console.log("Error al elegir sistema de datos")
}