const { Router } = require("express")

const routerArticulos = new Router()

//routerArticulos.use(nombre_function)

// ---- Practica para definir enrutador

routerArticulos.get("/", (req, res) => {
    res.json({message: "Articulos Router"})
})

module.exports = routerArticulos
