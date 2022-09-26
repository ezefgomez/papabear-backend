import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('DB/productos.json')
    }

    async desconectar() {
    }
}

export default CarritosDaoMongoDb