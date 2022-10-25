// Server setup
import express from 'express'
import os from 'os'
import { Server as HttpServer} from 'http'
import { Server as IOServer } from 'socket.io'
import { engine } from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import mongoose from 'mongoose'
import MongoStore  from 'connect-mongo'
import apiRoutes from './rutas/products.js'
import userRoutes from './rutas/users.js'
import randomRoutes from './rutas/randoms.js'
import normalizar from './utils/normalizacion.js'
import 'dotenv/config'
import _yargs from 'yargs'

const yargs = _yargs(process.argv.slice(2))
const args = yargs
    .alias('p', 'puerto')
    .default('puerto', 8080)
    .default('modo', 'fork')
    .coerce('puerto', function(arg) {
        if(arg[1]){
            return arg[0]
        } else {
            return arg
        }
    }).argv
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*10
    }
}))
app.use(passport.initialize())
app.use(passport.session())

// Workaround porque no funcionaba __dirname al trabajar en módulos (creo)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// HBS setup
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/layouts"
}))
app.set('views', './views')
app.set('view engine', 'hbs')

// Request handlers
const checkAuth = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}
app.get('/', checkAuth, (req, res) => {
    res.render('main.hbs', {username: req.user.email})
})
app.get('/login', (req, res) => {
    if(req.isAuthenticated()) {
        return res.render('main.hbs', {username: req.user.email})
    }
    res.render('login.hbs')
})
app.get('/register', (req, res) => {
    if(req.isAuthenticated()) {
        return res.render('main.hbs', {username: req.user.email})
    }
    res.render('register.hbs')
})
app.get('/logout', checkAuth, (req, res) => {
    res.render('logout.hbs', {username: req.user.email})
    req.logout()
})
app.get('/info', (req, res) => {
    const argList = {
        ...args,
        _: [...args._].toString()
    }
    if(!argList._) delete argList._
    delete argList.$0
    const info = {
        args: argList,
        platform: process.platform,
        version: process.version,
        rss: process.memoryUsage().rss,
        path: process.execPath,
        pid: process.pid,
        directory: process.cwd(),
        procesadores: os.cpus().length
    }
    res.render('info.hbs', info)
})

app.use('/products_api', apiRoutes)
app.use('/users', userRoutes)
app.use('/api', randomRoutes)

// DAOs import
import { mensajes } from './daos/firebase.js'

const PORT = args.puerto
const startServer = () => {
    const httpServer = new HttpServer(app)
    const io = new IOServer(httpServer)
 
    io.on('connection', async socket => {
        console.log(`User connected with socket id: ${socket.id}`)
        const msjs = await mensajes.getAll()
        socket.emit('messageBoard', normalizar(msjs))
        socket.on('userMessage', async (msg) => {
        await mensajes.save(msg)
        const msjs = await mensajes.getAll()
        socket.emit('messageBoard', normalizar(msjs))
        })
    })
    mongoose.connect(process.env.MONGO_URL)
    const server = httpServer.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT} - PID worker: ${process.pid}`)
    })
    server.on('error', (err) => {
        console.error(`Server error: ${err}`)
    })
}

if(args.modo === 'cluster' || args.modo === 'CLUSTER') {
    const { default: cluster } = await import('cluster')
    if(cluster.isMaster) {
        console.log(`Master ${process.pid} is running`)
        const cpuCount = os.cpus().length
        for(let i = 0; i < cpuCount; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        startServer()
    }
} else {
    startServer()
}