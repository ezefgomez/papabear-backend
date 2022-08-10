const express = require('express');
const app = express();
const Tienda = require("./utils/tienda")
const productosName = "productos.json"
const tienda = new Tienda(productosName);
const { auth } = require("./middlewares/auth") // Va antes del upload.single() y después de la ruta
const routerArticulos = require("./routes/articulos")
const upload = require("./storage") // en el código debajo hay que agregar upload.single("Acá se coloca el atributo name del formulario de HTML") antes que (req, res) y se coloca dentro de la llave un objeto file gestionado por multer "const file = req.file"
const {Server: SocketServer} = require("socket.io")
const {Server: HTTPServer} = require("http")
const personRoutes = require('./routes/person')

const httpServer = new HTTPServer(app)
const socketServer = new SocketServer(httpServer)
const Contenedor = require("./utils/contenedor")
const c = new Contenedor('./db.json')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "./public/") // Después del public se coloca el archivo HTML
})

// ---- Traer todos los articulos de la tienda ----
app.get("/api/articulos", (req, res) => {
    const listadeArticulos = tienda.getAll()
    res.json(listadeArticulos)
    console.log(req.query)
    // res.send()
})

// ---- Traer algún articulo en específico ----
app.get("/api/articulos/:id", (req, res) => {
    const id = req.params.id
    const articulos = tienda.getById(id)
    res.json(articulos)
    // res.send()
})

app.post("/api/articulos", auth, upload.single("foto"), (req, res) => {
    // const token = req.token
    // console.log(token)
    const file = req.file
    console.log(file)
    res.json({succes: true})
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use("/person", personRoutes)

socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado")
    socketServer.emit('personas_registradas', c.getAll())

    socket.on('persona_nueva', (persona) => {
        c.save(persona)
        socketServer.sockets.emit('personas_registradas', c.getAll())
    })

})

app.get("/", (req, res) => {
    res.render("./public/index", {productos})
})

app.post("/productos", (req, res) => {
    const {title, price, id} = req.body
    if (title && price && id) {
        productos.push({title, price, id})
        res.redirect("/")
    } else {
        res.send("Faltan datos")
    }
})

app.get("/productos.json", (req, res) => {
    const {
        title,
        price,
        id
    } = req.query;

    res.render('productos', {
        title,
        price,
        id
    }
    )
})

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

// req = peticion, res = respuesta

server.on("error", error => console.log(`Error en servidor ${error}`))