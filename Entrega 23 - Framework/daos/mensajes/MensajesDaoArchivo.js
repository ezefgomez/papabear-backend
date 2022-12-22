const  ContenedorArchivo  = require("../../contenedores/contenedorArchivo")

class MensajesDaoArchivo extends ContenedorArchivo {
	constructor() {
		super("../../data/mensajes.json")
	}
}

module.exports = MensajesDaoArchivo