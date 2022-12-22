const  Contenedor  = require("../../contenedores/contenedorArchivo")

class ProductosDaoArchivo extends Contenedor {
	constructor() {
		super("./data/productos.json")
	}
	//Metodos particulares de productos
	
}

module.exports = ProductosDaoArchivo