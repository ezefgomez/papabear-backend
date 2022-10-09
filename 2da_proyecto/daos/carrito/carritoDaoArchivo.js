const  ContenedorArchivo  = require("../../contenedores/contenedorArchivo")

class CarritoDaoArchivo extends ContenedorArchivo {
	constructor() {
		super("../../data/carritos.json")
	}
}

module.exports = CarritoDaoArchivo