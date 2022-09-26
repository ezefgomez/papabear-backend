import ContenedorArchivo from "../../contenedores/ContenedorArchivo"

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('DB/productos.json')
    }

    async desconectar() {
    }
}

export default CarritosDaoArchivo