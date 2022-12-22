const Router=require('koa-router')
const {db,dbC}=require('../controllers/databases')

const cartRouter=new Router({
    prefix:'/carrito'
})

cartRouter.get('/', async (ctx)=>{
    const carts=await dbC.getAll()
    ctx.body=carts
})

cartRouter.get('/:id', async(ctx)=>{
    const id=ctx.params.id
    if(!id){
        ctx.status=404
    }else{
        const getById= await dbC.getById(id)
        ctx.body=`Encontrado carrito id ${id}, carrito: ${getById}`
    }
} )

cartRouter.post('/', async(ctx)=>{
    const {carrito,productos}=ctx.request.body
    const newCarrito={
        carrito:carrito,
        time:Date.now(),
        productos:productos
    }
    await dbC.save(newCarrito)
    ctx.body=`Nuevo carrito guardado: ${carrito}`
})

cartRouter.post('/:id/productos/:id_producto',async (ctx)=>{
    const id=ctx.params.id
    const newCart=await dbC.getById(id)
    const id_producto=ctx.params.id_producto
    if(!id){
        ctx.status=404
    }else{
        const producto=await db.getById(id_producto)
        const newCarrito={
                titleProducto:producto.title,
                price:producto.price,
                image:producto.image,
                description:producto.description,
                stock:producto.stock,
                id:id_producto
            }
        newCart.productos.push(newCarrito)
        const update= await dbC.updateByCartId(id,newCart)
        ctx.body=`Actualizado carrito ${id}, con ${producto}`
    }

})

cartRouter.delete('/:id/productos/:id_producto',async (ctx)=>{
        const id=ctx.params.id
        const id_producto=ctx.params.id_producto
        const producto=await db.getById(id_producto)
        if(!id){
            ctx.status=404
        }else{
            const newCart=await dbC.getById(id)
            newCart.productos=newCart.productos.find(prod=>prod.id_productos!==id_producto) 
            console.log(newCart)
                dbC.updateCart(id,newCart) 
            ctx.body=`Eliminado producto id ${id_producto} del carrito ${id}`
        }
})

cartRouter.delete('/:id',async(ctx)=>{
    const id=ctx.params.id
    if(!id){
        ctx.status=404
    }else{
        const carritoDelete=dbC.deleteById(id)
        ctx.body=`Carrito eliminado ${id}`
    }
})


module.exports=cartRouter