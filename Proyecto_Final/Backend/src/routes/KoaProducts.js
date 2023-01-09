const Router=require('koa-router')
const {db}=require('../controllers/databases')

const productRouter=new Router({
    prefix:'/productos'
})


productRouter.get('/',async (ctx)=>{
    const productos=await db.getAll()
    ctx.body=productos
    })

productRouter.get('/:id',async ctx=>{
    const id=ctx.params.id
    const producto=await db.getById(id)
    if(producto){
        ctx.body=producto
    }else{
        ctx.status=404
    }
})

productRouter.post('/',async (ctx)=>{
    const {title,price,image,description,stock,categoria}=ctx.request.body
        const newProduct= await db.save({
            title:title,
            price:price,
            image:image,
            description:description,
            stock:stock,
            categoria:categoria
        })
        ctx.body=`Nuevo producto guardado:${title}`
})

productRouter.put('/:id',async(ctx)=>{
    const {title,price,image,description,stock,categoria}=ctx.request.body
        const id=ctx.params.id
        if(!id){
            ctx.status=404
        } else{
            const newProduct={
                title:title,
                price:price,
                image:image,
                description:description,
                stock:stock,
                categoria:categoria,
            }
            await db.updateById(id,newProduct)
            ctx.body=`Producto id ${id} actualizado: ${title}, ${price},${image},${description},${stock},${categoria}`
}})

productRouter.delete('/:id', async (ctx)=>{
    const id=ctx.params.id
    if(!id){
        ctx.status=404
        }else{
            const productDelete=await db.deleteById(id)
            ctx.body=`Producto eliminado ${id}`
        }

} )



module.exports=productRouter