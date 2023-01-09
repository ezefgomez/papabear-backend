const ContenedorMongo=require('../contenedores/ContenedorMongo')

class CarritoDaoMongo extends ContenedorMongo{
    constructor(){
        super ('carrito',{
            carrito:{type:String,required:true},
            time:{type:String},
            productos:{type:Array,required:true}
        })
    }
}

module.exports= CarritoDaoMongo