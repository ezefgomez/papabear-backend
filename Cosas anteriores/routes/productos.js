const { Router } = require("express")

const routerProductos = new Router()

//routerArticulos.use(nombre_function)

// ---- Practica para definir enrutador

routerProductos.get("/", (req, res) => {
    res.json({message: "Productos Router"})
})

module.exports = routerProductos
