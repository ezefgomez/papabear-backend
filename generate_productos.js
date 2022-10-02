const {Router} = require("express")
const {faker} = require("@faker-js/faker");

const testRouter = Router()

function generarProductosConFaker(n) {
    const productos = []
    for (let i=0; i<n; i++) {
        const _producto = {
            id: i+1,
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            imagen: faker.image.fashion()
        }
        productos.push(_producto)
    }
    return productos
}

testRouter.get("/", (req, res) => {
    const cant = req.query.cant || 5
    const productos = generarProductosConFaker(cant)
    res.json(productos)
})

module.exports = testRouter()