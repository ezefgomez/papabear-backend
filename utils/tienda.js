const fs = require("fs");
const routerProductos = require("../routes/productos");

const encoding = "utf-8"

class tienda { 
    constructor(productos) {
        this.productos = productos;
    };
}

// Manejador de peticiones

// ---- GET api/articulos -> Devuelve todos los productos ----

app.get('/api/productos', (req, res) => {

    getAll = async () => {
        
        try {
            
            let data = await fs.promises.readFile( `./${this.producto}`, "utf-8" );
            let content = JSON.parse(data);
            res.send(console.log(content));

        } catch (err) {
            res.send(console.log(err));
        };
    };

    tienda.getAll()

})

// ---- GET api/productos/id -> Devuelve producto según id ----

app.get('/api/productos:id', (req, res) => {

        try {

            let data = await fs.promises.readFile( `./${this.producto}`, "utf-8" );
            let content = JSON.parse(data);
            // Filtrar el producto con el ID indicado y mostrarlo en consola.
            let value = content.filter((producto) => producto.id == id);
            console.log(value);
            // Si no existe un producto con dicho ID, retorna "null".
            return value.length ? value : null;

        } catch (err) { 
            console.log(err);
        };
    })

// ---- POST api/articulos -> Agrega un producto y lo devuelve producto según id ----

app.post('/api/productos', (req, res) => {

    try { 
            
        let data = await fs.promises.readFile( `./${this.producto}`, "utf-8" );
        if (data.length == 0) {
            producto.id = 1;
            await fs.promises.writeFile( `./${this.producto}`, JSON.stringify(new Array(producto)) );
            return producto.id;

        } else {

            let tienda = JSON.parse(data);
            // Obtener el ID más alto del arreglo de productos.
            let maxId = tienda.reduce((prev, curr) => prev.id > curr.id ? prev : curr );
            // Asignar un ID al nuevo producto.
            producto.id = Number(maxId.id) + 1;
            // Agregar el objeto al arreglo de productos.
            tienda.push(producto);
            await fs.promises.writeFile( `./${this.producto}`, JSON.stringify(producto) );
            return producto.id;
        };

    } catch (err) { console.log(err); };
})

// ---- PUT api/articulos:id -> Recibe y actualiza un producto según id ----

app.put('/api/productos:id', (req, res) => {

    try {

    } catch (err) { 
        console.log(err);
    };
})

// ---- DELETE api/articulos:id -> Elimina un producto según id ----

app.delete('/api/productos:id', (req, res) => {

    try {

        let data = await fs.promises.readFile( `./${this.producto}`, "utf-8" );
        let content = JSON.parse(data);
        // Filtrar los demás productos.
        let contentEdited = content.filter((producto) => producto.id !== id);
        await fs.promises.writeFile( `./${this.producto}`, JSON.stringify(contentEdited) );
        console.log(`El producto ${id} ha sido eliminado.`);
        
    } catch (err) {
        console.log(err);
    };
})

module.exports = tienda;
