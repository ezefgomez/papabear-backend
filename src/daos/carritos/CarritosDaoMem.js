import ContenedorMemoria from "../../contenedores/ContenedorMemoria"

class CarritosDaoMem extends ContenedorMemoria {

    constructor() {
        super('DB/productos.json')
    }

    async desconectar() {
    }
}

export default CarritosDaoMem