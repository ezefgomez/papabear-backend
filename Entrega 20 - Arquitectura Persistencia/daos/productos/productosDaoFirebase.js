const  Contenedor  = require("../../contenedores/contenedorFirebase")

class ProductosDaoFirebase extends Contenedor {
	constructor() {
		super("./data/productos.json")
	}
}

module.exports = ProductosDaoFirebase