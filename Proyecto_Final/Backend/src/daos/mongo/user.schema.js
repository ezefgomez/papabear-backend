const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{type:String},
    address:{type:String},
    age:{type:Date},
    tel:{type:Number},
    username:{type:String},
    password:{type:String},
    avatar:{type:String},
})

const User=mongoose.model('User',userSchema)
module.exports=User