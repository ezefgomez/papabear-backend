import ContenedorMemoria from "../../contenedores/ContenedorMemoria"

class ProductosDaoMem extends ContenedorMemoria {

    constructor() {
        super('DB/productos.json')
    }

    async desconectar() {
    }
}

export default ProductosDaoMem