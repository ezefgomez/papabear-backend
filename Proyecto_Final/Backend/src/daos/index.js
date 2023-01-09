const dotenv =require ('dotenv')
dotenv.config()

let ProductoDao
let CarritoDao

switch (process.env.DATABASE){
    case  'firebase':
        const  ProductosDaoFirebase =  require('./firebase/productoFirebase')
        const CarritoDaoFirebase= require('./firebase/carritoFirebase')
        ProductoDao=ProductosDaoFirebase
        CarritoDao=CarritoDaoFirebase
    break;
    case 'mongo':{
        const  ProductosDaoMongo =  require('./mongo/productosMongo')
        const CarritoDaoMongo= require('./mongo/carritoMongo')
        ProductoDao=ProductosDaoMongo
        CarritoDao=CarritoDaoMongo
        break;
    }
}

module.exports= {
    CarritoDao,
    ProductoDao,
}