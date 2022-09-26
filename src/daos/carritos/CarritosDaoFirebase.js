import ContenedorFirebase from "../../contenedores/ContenedorFirebase"

class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('DB/productos.json')
    }

    async desconectar() {
    }
}

export default CarritosDaoFirebase