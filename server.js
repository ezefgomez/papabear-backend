const express = require('express');

const Tienda = require("./utils/tienda")
const productosName = "productos.json"
const tienda = new Tienda(productosName);
const { auth } = require("./middlewares/auth") // Va antes del upload.single() y después de la ruta
const routerArticulos = require("./routes/articulos")
const upload = require("./storage") // en el código debajo hay que agregar upload.single("Acá se coloca el atributo name del formulario de HTML") antes que (req, res) y se coloca dentro de la llave un objeto file gestionado por multer "const file = req.file"

const app = express();
const PORT = 8080;
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


// ---- UTILIZANDO HANDLEBARS ----

/*
const express = require ('express')
const handlebars = require ('express-handlebars')
const app = express()

const hbs = handlebars.create({
    extname: "hbs"
    defaultLayout: "index.hbs"
    layoutsDir: __dirname + "/views/layout"
    partialsDir: __dirname + "/views/partials/"
})

app.engine("hbs", hbs.engine)
app.set('views', './views')
app.set('view engine', 'hbs')

app.get("/", (req, res) => {
    const articulo =
        {"title": "REMERA",
        "price": 4500,
        "id": 1
        },
    res.sender("main", articulo)
})

// ---- UTILIZANDO PUG JS ----

/*
const express = require ('express')
const pug = require ('pug')
const app = express()

app.set('views', './views') // ---- Especifica el directorio de visitas ----
app.set('view engine', 'pug') // ---- Especifica el motor de plantillas ----

app.get('/productos', (req, res) => {
    res.sender('index', {
        title: 'Coderhouse app',
        message: 'Este es un mensaje'
    })
})

app.get('/hello', (req, res) => {
    res.sender('hello', {
        mensaje: 'Hola mundo',
        nombre: 'Juan',
        apellido: 'Martinez',
    })
})
*/

// ---- USO DE EJS ----

app.set('view engine', 'ejs') // ---- Especifica el motor de plantillas ----

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", (req, res) => {
    res.render("index", {productos})
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


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando el puerto ${server.address().port}`)
})

// req = peticion, res = respuesta

server.on("error", error => console.log(`Error en servidor ${error}`))