const express=require('express')
const UserRouter=express.Router()
const passport=require('passport')
const session=require('express-session')

require('../utils/passport/passport')
const authMiddleware=require('../utils/middleware/middleware')
const{
    redirectProfile,
    signUp,
    login,
    loginPage,
    signUpPage,
    profile,
    infoUser,
    logout,
    notFound,
    logoutPage
}=require('../controllers/user')

UserRouter.use(passport.initialize())
UserRouter.use(passport.session())

UserRouter.get('/',redirectProfile)
UserRouter.post('/signup',passport.authenticate("signup", {
    failureRedirect: "/failSignUp.html",
}),signUp)
UserRouter.post('/login',passport.authenticate("login", {
    failureRedirect: "/failSignUp.html",
}) , login)
UserRouter.get('/login',loginPage)
UserRouter.get('/signup',signUpPage)
UserRouter.get('/profile',authMiddleware,profile)
UserRouter.get('/info',infoUser)
UserRouter.post('/api/logout',logout) 
UserRouter.get('/logout',logoutPage)
UserRouter.get('*',notFound)

module.exports=UserRouter