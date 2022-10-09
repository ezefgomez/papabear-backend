const Contenedor = require("../../contenedores/contenedorFirebase")

class CarritoDaoFirebase extends Contenedor {
	constructor() {
		super("../../data/carritos.json")
	}
}

module.exports = CarritoDaoFirebase