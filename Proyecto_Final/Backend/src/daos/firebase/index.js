const firebase=require('firebase-admin')
const serviceAccount=require("./key-firebase.json")
const ContenedorFirebase =require('../contenedores/ContenedorFirebase')

firebase.initializeApp({
    credential:firebase.credential.cert(serviceAccount),
    databaseURL:"https://ecommerce-backend-a6bdd.firebaseio.com"
})



const db=firebase.firestore()