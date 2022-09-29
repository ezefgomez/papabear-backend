const mongoose = require("mongoose")
const config = require("../config")
const uriString = config.uriString


class ContenedorMongoDb {

    constructor(model) {
        
        this.uriString = uriString
        this.Model = model
        
        if (this.Model) {
            this.collection = this.Model.modelName
        }
    }

    async connect () {
        try {
            return await mongoose.connect(this.uriString)
        } catch (err) {
            throw new Error(`ERROR DE CONEXION + ${err}`)
        }
    }

    // CREAR UN NUEVO DOCUMENTO EN LA COLECCIÓN
    async save(object) {
        try {
            const document = new this.Model(object)
            const result = await document.save()
            return result
        } catch(err) {
            throw new Error(`MongoContainer: ERROR AL GUARDAR: ${err}`)
        }
    }


    async updateById(object) {

    }

    async deleteById(object) {

    }

    async getAll(object) {

    }

    async getById(object) {

    }
}

module.exports = ContenedorMongoDb