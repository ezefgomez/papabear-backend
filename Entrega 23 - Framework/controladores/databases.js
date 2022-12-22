const {ProductoDao,CarritoDao}=require('../daos/index')
const db=new ProductoDao
const dbC=new CarritoDao

module.exports={db,dbC}