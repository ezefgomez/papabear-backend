const fs = require("fs");
const encoding = "utf-8"
const filename = "productos.json";
const knex = require('knex');
const knexConfig = require('../knexfile');
const database = knex(knexConfig);
const tableName = 'productos';

// Agrego para dejar de operar sobre un archivo e ir a modificar una tabla

class Contenedor {
    constructor(path) {
        this.filePath = path;
        this.createFileIfNotExists();
        const data = fs.readFileSync(this.filePath, encoding);
        this.contenedor = JSON.parse(data);
    }

    createFileIfNotExists() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, "[]");
        }
    }

    _saveAll (data) {
        const stringData = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.filePath, stringData ,encoding)
    }
    
    save(object) {
        const lastId = this.contenedor.reduce(
            (acc, el) => { // Funcion a evaluar para ir comparando el mayor de los ids
            return el.id > acc ? el.id : acc 
            }, 
            0 // Acumulador inicial
        );
        const newId = lastId + 1;
        object.id = newId;
        this.contenedor.push(object);
        this._saveAll(this.contenedor)
        return newId;
    }

    getById (id) {
        return this.contenedor.find(c => c.id === id);
    }

    getAll() {
        return this.contenedor;
    }

    deleteById(id) {
        const filtered = this.contenedor.filter(el => el.id !== id);
        this.contenedor = filtered;
        this._saveAll(filtered);
    }

    deleteAll() {
        this.contenedor = [];
        this._saveAll([]);
    }

    updateById(id, object) {
        const index = this.contenedor.findIndex(el => el.id === id);
        this.contenedor[index] = object;
        this._saveAll(this.contenedor);
    }
}

// Agrego para dejar de operar sobre un archivo e ir a modificar una tabla

/*

const knex = require('knex')({
    client: 'sqlite3',
    connection: () => ({
    filename: process.env.SQLITE_FILENAME
    })
});

knex.schema.createTable('user', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('age')
    table.string('description')
})

_saveAll (data) {
    const stringData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filePath, stringData ,encoding)
}

save(object) {
    const lastId = this.contenedor.reduce(
        (acc, el) => { // Funcion a evaluar para ir comparando el mayor de los ids
        return el.id > acc ? el.id : acc 
        }, 
        0 // Acumulador inicial
    );
    const newId = lastId + 1;
    object.id = newId;
    this.contenedor.push(object);
    this._saveAll(this.contenedor)
    return newId;
}

getById (id) {
    try {
        const id = req.params.id;
        const _producto = await database(tableName)
        .select()
        .where('id', id);
        res.send(_producto);
    } catch (err) {
        res.send(err)
    }
}

getAll() {
    try {
        const id = req.params.id;
        .having('id', '>', 0)
        res.send(_producto);
    } catch (err) {
        res.send(err)
    }
}

deleteById(id) {
    const id = req.params.id;
    try {
        await database(tableName)
        .where({id: id})
        .del()
        res.send('Producto eliminado');
    } catch (err) {
        res.send(err);
    }
}

deleteAll() {
    try {
        .del()
        res.send('Productos eliminados');
    } catch (err) {
        res.send(err);
    }
}

updateById(id, object) {
    const body = req.body;
    const id = req.params.id;
        try {
        const _result = await database(tableName)
            .where({id: id})
            .update(_newProducto)
        res.send({_newProducto, id: _result});
        } catch (err) {
        res.send(err)
        }
    }
}


*/

module.exports = Contenedor // COMMON JS