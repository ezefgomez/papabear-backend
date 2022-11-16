const express = require("express")

const Users = require("./models/usuarios.model")
const connectDB = require("./mongoDB/connection")

const app = express()

connectDB()

app.use("/", async (req, res)=>{
    // let usuario = new Users({
    //     name: "Ezequiel",
    //     email: "ezefgomez94@gmail.com",
    //     password: "123456"
    // })
    // await usuario.save()
    const usuarios = await Users.find()
    console.log(usuarios)

    res.send("Hola Mundo")
})

app.listen(4000, ()=> {
    console.log("servidor en puerto 4000")
})