const Koa=require('koa')
const app=new Koa()
const {koaBody}=require('koa-body')

const {connect}=require('../daos/mongo/database')
connect()

const productRouter=require('../routes/KoaProducts')
const cartRouter=require('../routes/KoaCart')

app.use(koaBody())

app.use(cartRouter.routes())
app.use(productRouter.routes())


app.use(async ctx=>{
    ctx.body='Usando MongoAtlas con KOA'
})


app.listen(8000)