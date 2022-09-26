import ContenedorMongoDb from "../../contenedores/ContenedorMemoria"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('DB/productos.json')
    }

    async desconectar() {
    }
}

export default ProductosDaoMongoDb