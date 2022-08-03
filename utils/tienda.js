const fs = require("fs");
const routerArticulos = require("../routes/articulos");

const encoding = "utf-8"

class tienda { 
    constructor(articulos) {
        this.articulos = articulos;
    };
}

// Manejador de peticiones

// ---- GET api/articulos -> Devuelve todos los productos ----

app.get('/api/articulos', (req, res) => {

    getAll = async () => {
        
        try {
            
            let data = await fs.promises.readFile( `./${this.articulo}`, "utf-8" );
            let content = JSON.parse(data);
            res.send(console.log(content));

        } catch (err) {
            res.send(console.log(err));
        };
    };

    tienda.getAll()

})

// ---- GET api/articulos/id -> Devuelve producto según id ----

app.get('/api/articulos:id', (req, res) => {

        try {

            let data = await fs.promises.readFile( `./${this.articulo}`, "utf-8" );
            let content = JSON.parse(data);
            // Filtrar el producto con el ID indicado y mostrarlo en consola.
            let value = content.filter((articulo) => articulo.id == id);
            console.log(value);
            // Si no existe un producto con dicho ID, retorna "null".
            return value.length ? value : null;

        } catch (err) { 
            console.log(err);
        };
    })

// ---- POST api/articulos -> Agrega un producto y lo devuelve producto según id ----

app.post('/api/articulos', (req, res) => {

    try { 
            
        let data = await fs.promises.readFile( `./${this.articulo}`, "utf-8" );
        if (data.length == 0) {
            articulo.id = 1;
            await fs.promises.writeFile( `./${this.articulo}`, JSON.stringify(new Array(articulo)) );
            return articulo.id;

        } else {

            let tienda = JSON.parse(data);
            // Obtener el ID más alto del arreglo de productos.
            let maxId = tienda.reduce((prev, curr) => prev.id > curr.id ? prev : curr );
            // Asignar un ID al nuevo producto.
            articulo.id = Number(maxId.id) + 1;
            // Agregar el objeto al arreglo de productos.
            tienda.push(articulo);
            await fs.promises.writeFile( `./${this.articulo}`, JSON.stringify(articulo) );
            return articulo.id;
        };

    } catch (err) { console.log(err); };
})

// ---- PUT api/articulos:id -> Recibe y actualiza un producto según id ----

app.put('/api/articulos:id', (req, res) => {

    try {

    } catch (err) { 
        console.log(err);
    };
})

// ---- DELETE api/articulos:id -> Elimina un producto según id ----

app.delete('/api/articulos:id', (req, res) => {

    try {

        let data = await fs.promises.readFile( `./${this.articulo}`, "utf-8" );
        let content = JSON.parse(data);
        // Filtrar los demás productos.
        let contentEdited = content.filter((articulo) => articulo.id !== id);
        await fs.promises.writeFile( `./${this.articulo}`, JSON.stringify(contentEdited) );
        console.log(`El producto ${id} ha sido eliminado.`);
        
    } catch (err) {
        console.log(err);
    };
})

// ---- Practica para definir enrutador

app.use("/api/articulos2", routerArticulos)

module.exports = tienda;