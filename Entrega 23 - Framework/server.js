// Firebase
const adminFirebase = require("firebase-admin");

const serviceAccount = require("./db/plataforma-319d4-firebase-adminsdk-tlhun-ed3a6307cf.json");

adminFirebase.initializeApp({
    credential: adminFirebase.credential.cert(serviceAccount)
});

const { Carrito, Productos } = require("./daos/index.js")

const express = require("express")
const { Router } = express

const app = express()
const PORT = 8080
const routerProductos = Router()
const routerCarrito = Router()

// Seteo de administrador, se chequea dentro de contenedor
const admin = true

// Funciones middleware
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))

app.use("/api/productos", routerProductos)

app.use("/api/carrito", routerCarrito)

app.get("/", (req,res) =>{
    res.send("hola mundo")
})

app.listen(PORT, () =>{
    console.log("servidor en puerto 8080")
})

// Devolver todos los productos
routerProductos.get("/", async (req,res)=>{
    const contenedor = new Productos("./data/productos.json")
    const respuesta = await contenedor.getAll()
    res.json({respuesta})
})

// Devolver un producto por id
routerProductos.get("/:id", async (req,res)=>{
    let {id} = req.params
    id = parseInt(id.slice(1))
    const contenedor = new Productos("./data/productos.json")
    const respuesta = await contenedor.getById(id)
    res.json({respuesta})
})

// Actualizar un producto por id
routerProductos.put("/:id", async(req, res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const objProducto = req.body
    const contenedor = new Productos("./data/productos.json")
    const respuesta = await contenedor.updateById(objProducto, id, admin)
    res.json({respuesta})
} )

// Agregar un producto
routerProductos.post("/", async (req, res)=>{
    const contenedor = new Productos("./data/productos.json")
    const objProducto = req.body
    const respuesta = await contenedor.save(objProducto, admin)
    res.json({respuesta})
})

// Borrar un producto por id
routerProductos.delete("/:id", async (req,res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const contenedor = new Productos("./data/productos.json")
    const respuesta = await contenedor.deleteById(id, admin)
    res.json({respuesta})
})

// 404 en productos
routerProductos.get("*", async (req,res)=>{
    res.json({
		error: -2,
		description: "Ruta no implementada"
	});
})

// ---- Carrito: ---- //
// Crear carrito y devolver su id
routerCarrito.post("/", async (req, res)=>{
    const carrito = new Carrito("./data/carritos.json")
    const respuesta = await carrito.createCart()
    res.json({respuesta})
})

// Borrar carrito por id
routerCarrito.delete("/:id", async (req, res)=>{
    let {id} = req.params
    id = id.slice(1)
    id = parseInt(id)
    const carrito = new Carrito("./data/carritos.json")
    const respuesta = await carrito.deleteCart(id)
    res.json({respuesta})
})

// Agregar producto al carrito segun id de producto
routerCarrito.post("/:id/productos/:id_prod", async (req, res)=>{
    const url = req.params
    const idCart = parseInt(url.id.slice(1))
    const idProd = parseInt(url.id_prod.slice(1))
    const carrito = new Carrito("./data/carritos.json")
    const respuesta = await carrito.addToCart(idCart, idProd)
    res.json({respuesta})
})

// Borrar un producto del carrito usando ambos id's
routerCarrito.delete("/:id/productos/:id_prod", async (req, res)=>{
    const url = req.params
    const idCart = parseInt(url.id.slice(1))
    const idProd = parseInt(url.id_prod.slice(1))
    const carrito = new Carrito("./data/carritos.json")
    const respuesta = await carrito.deleteFromCart(idCart, idProd)
    res.json({respuesta})
})

// Listar productos en un carrito segun su id
routerCarrito.get("/:id/productos", async (req, res)=>{
    const url = req.params
    const idCart = parseInt(url.id.slice(1))
    const carrito = new Carrito("./data/carritos.json")
    const respuesta = await carrito.listCartProducts(idCart)
    res.json({respuesta})
})

// 404 en carrito
routerCarrito.get("*", async (req,res)=>{
    res.json({
		error: -2,
		description: "Ruta no implementada"
	});
})

// --- DAO / DTO / Repositorios --- 

import ProductosRepository from './repositories/ProductosRepository';
import MensajesRepository from './repositories/MensajesRepository';

/*-----------------------------------------------*/
/*                  instances                    */
/*-----------------------------------------------*/

const productsRepo = new ProductosRepository();
const messageRepo = new MensajesRepository();

// Logger //

import logger from './utils/logger';

app.all('*', logger.logReqWarn, (req, res) => {
    res.send('Ruta y metodo no implementados.')
})

/*-----------------------------------------------*/
/*                  GraphQL                      */
/*-----------------------------------------------*/

/*

const { graphqlHTTP } =require ("express-graphql");
const { buildSchema }=require("graphql");
const contenedor = require('./contenedores/ContenedorArchivo')
const Archivos = new contenedor('productos.json')
const carrito = new contenedor('carrito.json')

const schema = buildSchema(`
    type Product {
        id: ID!
        title: String
        price: String
        stock: String
        description: String
    }
    input ProductInput {
        title: String
        price: String
        stock: String
        description: String
    }
    type Query {
        getProduct(id: ID!): Product
        getProducts(campo: String, valor: String): [Product]
    }
    type Mutation {
        saveProducts(datos: ProductInput): Product
        updateProducts(id: ID!, datos: ProductInput): Product
        deleteProducts(id: ID!): Product
    }
`);

class product {
    constructor (id, {title, price,stock,description}) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.description = description;
        }
    }

const productsContainer = {};

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

// TRAER TODOS LOS PRODUCTOS CON METODO GET

function getProduct({id}){
    if (!productsContainer[id]) {
        throw new Error('Products not found');
        }
        return productsContainer[id];
    }

// TRAER UN PRODUCTO POR ID

function getProducts({ campo, valor }){
    const products = Object.values(productsContainer);
    if (campo && valor) {
        return products.filter( p => p[campo] === valor);
    } else return products;
}

// GUARDAR NUEVO PRODUCTO

function saveProducts({datos}){
    const id = crypto.randomBytes(10).toString('hex');
    const newProducts = new product(id, datos);
    productsContainer[id] = newProducts;
    return newProducts;
}

// ACTUALIZAR PRODUCTO MEDIANTE ID

function updateProducts({id,datos}){
    if (!productsContainer[id]) {
        throw new Error('Products not found')
        }
        const updatedProducts = new product(id, datos);
        productsContainer[id] = updatedProducts;
        return updatedProducts;
}

// ELIMINAR PRODUCTO POR ID

function deleteProducts(){
    if (!productsContainer[id]) {
        throw new Error('Products not found')
        }
        const deletedProducts = productsContainer[id];
        delete productsContainer[id];
        return deletedProducts;
}


app.use("/graphql", graphqlHTTP({
    schema,
    rootValue: {
        getProduct,
        getProducts,
        saveProducts,
        updateProducts,
        deleteProducts
    },
    graphiql: true,
}));

*/