import express from 'express';
import userClass from '../controllers/user.controller.js';
import passport from 'passport';
import { validate } from '../middlewares/auth';

const userRoute = express.Router();
const user = new userClass();

userRoute.get('/register', user.registerGet)
userRoute.get('/main', validate, user.mainGet)
userRoute.get('/logout', user.logout)
userRoute.get('/login', user.loginGet)

userRoute.post('/register', passport.authenticate("register", {
    successRedirect: "/user/main",
    failureRedirect: "/user/register",
    failureFlash: true,
    successFlash: true
}));

userRoute.post('/login', passport.authenticate("login", {
    successRedirect: "/user/main",
    failureRedirect: "/user/login",
    failureFlash: true,
    successFlash: true
}));

export default userRoute;