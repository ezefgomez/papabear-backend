const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('../../daos/mongo/user.schema')
const {comparePassword, hashPassword}=require('../../daos/mongo/utils')
const {Types}=require('mongoose')
const fs=require('fs')

require('dotenv').config()
const MY_EMAIL_ADDRESS=process.env.MY_EMAIL_ADDRESS

require('../log4js/log4js')
const log4js=require('log4js')
const logger=log4js.getLogger()
const transporter=require('../../services/notificaciones/gmail')

passport.use("login", new LocalStrategy(async (username, password, done) => {

    const user = await User.findOne({ username }).lean()
    if(!user){
        return done(null, null, { message: "Invalid username or password" });
    }
    const passHash = user.password;
    if ( !comparePassword(password, passHash)) {
        return done(null, null, { message: "Invalid username or password" })
    } else{
        return done(null, user);
    }
    }))
    
    passport.use("signup", new LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        const user = await User.findOne({ username });
        if (user) {   
    return done(null, null);   

    }
    const hashedPassword = hashPassword(password);
    const name=req.body.name
    const address=req.body.address
    const tel=req.body.tel
    const avatar=req.body.avatar
    const age=req.body.age
    const newUser = new User({ username, password: hashedPassword,name,address,tel,avatar,age });
    await newUser.save();


    
const gmailNewUser={
    to:'saloli3823@keshitv.com',
    from:MY_EMAIL_ADDRESS,
    subject:'Nuevo Registro',
    html:`<h1>Nuevo Usuario registrado!</h1>
        <h2>Nombre:${name}</h2>
        <h3>Address:${address}</h3>
        <h3>Username:${username}</h3>`,
}

async function newUserMail(){
    try{
        const newUser=await transporter.sendMail(gmailNewUser)
        logger.info('Email Sent')
    }catch(err){
        logger.error(err)
    }
}

    newUserMail()
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await User.findById(id);
    done(null, user);
});