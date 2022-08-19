const { Router } = require("express")
const Contenedor = require("../utils/contenedor")
const c = new Contenedor('../db.json')
const router = new Router()

//routerArticulos.use(nombre_function)

// ---- Practica para definir enrutador ----

router.get("/", (req, res) => {
    res.json('Hola')
})

router.post("/", (req, res) => {
    const body = req.body
    if (body.name && body.age) {
        const _person = {
            name: body.name,
            age: body.age
        }
        c.save()
        res.send(_person)
    } else {
        res.status(400).send('Bad request')
    }
})

router.put("/:id", (req, res) => {
    const body = req.body
    const id = req.params.id
    if (body.name && body.age) {
        const _newPerson = {
            name: body.name,
            age: body.age
        }
        c.updateById(id, _newPerson)

    } else {
        res.status(400).send('Bad request')
    }

    res.send(_newPerson)
})


module.exports = router
