const Contenedor = require("../../contenedores/contenedorFirebase")

class MensajesDaoFirebase extends Contenedor {
	constructor() {
		super("../../data/mensajes.json")
	}
}

module.exports = MensajesDaoFirebase