const express=require('express')
const CarritoRouter=express.Router()
const {
    getAllCart,
    addCart,
    getCartById,
    updateCartById,
    deleteCartById,
    deleteCartProductById,
    comprar
}=require('../controllers/cart')

CarritoRouter.get('/',getAllCart)
CarritoRouter.post('/',addCart)
CarritoRouter.get('/:id',getCartById)
CarritoRouter.post('/:id/productos/:id_producto',updateCartById)
CarritoRouter.delete('/:id',deleteCartById)
CarritoRouter.delete('/:id/productos/:id_producto',deleteCartProductById)
CarritoRouter.post('/:id/comprar/:username',comprar)

module.exports=CarritoRouter