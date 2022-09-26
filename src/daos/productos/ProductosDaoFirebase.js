import ContenedorFirebase from "../../contenedores/ContenedorFirebase"

class ProductosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('DB/productos.json')
    }

    async desconectar() {
    }
}

export default ProductosDaoFirebase