const ContenedorFirebase= require('../contenedores/ContenedorFirebase')

class CarritoDaosFirebase extends ContenedorFirebase{
    constructor(){
        super('carrito')
    }
}

module.exports=CarritoDaosFirebase