const dotenv = require("dotenv")
dotenv.config({
    path: ".env"
})

const dbType = process.env.DB_TYPE || "mongo"
const uriString = process.env.MONGO_URI_STRING || "mongo"

module.exports = {
    dbType,
    uriString
}