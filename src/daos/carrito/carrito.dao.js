const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDb")
const Carrito = require("../../carrito.schema")

class CarritoDAO extends ContenedorMongoDb {
    constructor(Model) {
        super(Model)
        this.connect().catch(err => {
            throw new Error(`ERROR INICIALIZACIÓN DAO ${err}`)
        })
    }
}

const carritoDAO = new CarritoDAO(Carrito)

module.exports = carritoDAO