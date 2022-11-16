let productosDao;
let carritosDao = "";
let mensajesDao;
let usuariosDao;

switch ("mongoDb") {
    case "mongoDb":
        const { default: ProductosDaoMongoDb } = await import(
            "./productos/productosDaoMongoDB.js"
        );
        productosDao = new ProductosDaoMongoDb();

        const { default: CarritosDaoMongoDb } = await import(
            "./carritos/CarritosDaoMongoDb.js"
        );
        carritosDao = new CarritosDaoMongoDb();

        const { default: UsuariosDaoMongoDb } = await import(
            "./usuarios/UsuariosDaoMongoDb.js"
        );
        usuariosDao = new UsuariosDaoMongoDb();
}

export { productosDao, carritosDao, mensajesDao, usuariosDao };