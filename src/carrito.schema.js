const mongoose = require("mongoose")

const CarritoSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now()},
    productos: {type: Array, default: []},
    label: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model("carrito", CarritoSchema)