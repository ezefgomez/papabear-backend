const express=require('express')
const ProductosRouter=express.Router()
const {
    getAllProducts,
    addProduct,
    getProductById,
    getProductByCategoria,
    updateProductById,
    deleteById
}=require('../controllers/products')

ProductosRouter.get('/',getAllProducts)
ProductosRouter.post('/',addProduct)
ProductosRouter.get('/:id',getProductById)
ProductosRouter.get('/:categoria',getProductByCategoria)
ProductosRouter.put('/:id',updateProductById)
ProductosRouter.delete('/:id',deleteById)

module.exports=ProductosRouter