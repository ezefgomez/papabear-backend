const express = require('express');
const app = express();

const Tienda = require("./utils/tienda")
const productosName = "productos.json"
const tienda = new Tienda(productosName);

const { auth } = require("./middlewares/auth") // Va antes del upload.single() y después de la ruta
const routerProductos = require("./routes/productos")
const upload = require("./storage") // en el código debajo hay que agregar upload.single("Acá se coloca el atributo name del formulario de HTML") antes que (req, res) y se coloca dentro de la llave un objeto file gestionado por multer "const file = req.file"

const handlebars = require('express-handlebars')

// Handlebars config

const hbs = handlebars.create({    
    extname: 'hbs',    
    defaultLayout: 'main',    
    layoutsDir: __dirname + '/views/layouts/',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

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
    res.sendFile(__dirname + "./public/index", {productos})
})

// ---------------------------------- LISTA DE ARTICULOS (Endpoints) ----------------------------------

// ---- Traer todos los articulos de la tienda ----

app.get('/api/productos', (req, res) => {    
    c.getAll()        
    .then(productos => {            
        res.send(JSON.stringify(productos))      
    })        
    .catch(error => { 
        res.status(500).json(error) 
    })
})

app.get('/', (req, res) => {    
    res.render('form')
})

// ---- Traer algún articulo en específico ----

app.get("/api/productos/:id", (req, res) => {
    const id = req.params.id
    const articulos = tienda.getById(id)
    res.json(articulos)
    // res.send()
})

// ---- Agrega un producto y lo devuelve producto según id ----

app.post("/api/productos", auth, upload.single("foto"), (req, res) => {
    // const token = req.token
    // console.log(token)
    const file = req.file
    console.log(file)
    res.json({succes: true})
})

// ---- Eliminar algún articulo en específico ----

app.delete("/api/productos/:id", (req, res) => {
    const id = req.params.id
    const articulos = tienda.deleteById(id)
    res.json(articulos)
    // res.send()
})

// ---------------------------------- CARRITO (Endpoints) ----------------------------------

// ---- Crea el carrito ----

app.post('api/carrito', (req, res) => {
    const id = req.params.id    
    c.createFileIfNotExists(id)
})

// ---- Elimina el carrito ----

app.delete('api/carrito/:id', (req, res) => {
    const id = req.params.id
    c.deleteById(id)
})

// ---- Traer todos los articulos del carrito ----

app.get('/api/carrito/:id/productos', (req, res) => {    
    c.getAll()        
    .then(productos => {            
        res.send(JSON.stringify(productos))      
    })        
    .catch(error => { 
        res.status(500).json(error) 
    })
})

// ---- Agrega un producto y lo devuelve producto según id ----

app.post("/api/carrito/:id/productos/:id.prod", auth, upload.single("foto"), (req, res) => {
    // const token = req.token
    // console.log(token)
    const file = req.file
    console.log(file)
    res.json({succes: true})
})

// ---- Eliminar por id de producto y de carrito ----

app.delete("/api/carrito/:id/productos/:id.prod", (req, res) => {
    const id = req.params.id
    const articulos = c.deleteById(id)
    res.json(articulos)
    // res.send()
})


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use("/person", personRoutes)

socketServer.on('connection', async socket => {    
    console.log('New client connected')    
    let productos = await c.getAll()    
    socket.emit('productos', productos)    
    socket.on('NEW_PRODUCT', producto => {        
        c.save(producto)            
        .then(() => {                
            c.getAll()                    
            .then(data => {                        
                productos = data                        
                socketServer.sockets.emit('productos', productos)                    
            })                    
            .catch(error => { 
                console.log(error) 
            })            
        })            
        .catch(error => { 
            console.log(error) 
        })    
    })
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

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

// req = peticion, res = respuesta

server.on("error", error => console.log(`Error en servidor ${error}`))