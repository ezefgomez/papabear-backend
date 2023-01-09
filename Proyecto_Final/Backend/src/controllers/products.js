const {db}=require('./databases')

require('../utils/log4js/log4js')
const log4js=require('log4js')
const logger=log4js.getLogger()

async function getAllProducts (req,res){
    try{
        const response= await db.getAll()
        res.status(200).json(response)
    }catch(err){
        logger.error(err)
    }
}

async function addProduct(req,res){
    try{
        const {title,price,image,description,stock,categoria}=req.body
        const newProduct= await db.save({
            title:title,
            price:price,
            image:image,
            description:description,
            stock:stock,
            categoria:categoria
        })
        res.status(201).json('Producto agregado')
    }catch(err){
        logger.error(err)
    }
    
}

async function getProductById(req,res){
    try{
        const id=req.params.id
        const getById= await db.getById(id)
        res.status(200).json(`Encontrado producto id ${id}`)
    }catch(err){
        logger.error(err)
    }
}

async function getProductByCategoria(req,res){
    try{
        const categoria=req.query.categoria
        const cat=await db.getByCategoria(categoria)
        res.json(`Los productos encontrados en la categoria mencionada son: ${cat}`)
    }catch(err){
        logger.error(err)
    }

}

async function updateProductById(req,res){
    try{
        const {title,price,image,description,stock,categoria}=req.body
        const id=req.params.id
        if(!id){
            res.json('Producto No encontrado')
        } else{
            const newProduct={
                title:title,
                price:price,
                image:image,
                description:description,
                stock:stock,
                categoria:categoria,
            }
            db.updateById(id,newProduct)
            res.json(newProduct)
        }
    }catch(err){
        logger.error(err)
    }
}

async function deleteById(req,res){
    try{
        const id=req.params.id
        const productDelete=db.deleteById(id)
        res.json(`Producto eliminado ${id}`)
    }catch(err){
        logger.error(err)
    }
}

module.exports={
    getAllProducts,
    addProduct,
    getProductById,
    getProductByCategoria,
    updateProductById,
    deleteById,
}