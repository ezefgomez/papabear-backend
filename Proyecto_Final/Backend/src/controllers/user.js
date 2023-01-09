const passport=require('passport')
const fs=require('fs')
require('../utils/log4js/log4js')
const log4js=require('log4js')
const logger=log4js.getLogger()

let path=require('path')

function redirectProfile(req, res) {
    res.redirect('/login')
};

const json_avatar=fs.readFileSync('./src/utils/local/images.json','utf-8')
let avatares=JSON.parse(json_avatar)

function signUp(req, res) {  
    req.session.user = req.user;
    const avatar=req.user.avatar
    const newAvatar={avatar}
    avatares.push(newAvatar)
    res.redirect("/profile");
/*     const json_avatar=JSON.stringify(avatares)
    fs.writeFileSync('.src/utils/local/images.json',json_avatar,'utf-8') */
};

function login(req, res){  
    req.session.user = req.user;
    res.render(path.resolve("views/pages/profile"),{status:'ok', user: req.session.user});
};

function loginPage (req, res)  {
    res.sendFile(path.resolve('public/login.html'));
}

function signUpPage(req, res){
    res.sendFile(path.resolve('public/signup.html'))
};

function profile(req, res){
    res.render(path.resolve('views/pages/profile'), { user: req.session.user});
};

function infoUser(req,res) { 
    res.render(path.resolve('views/pages/info'),{user: req.session.user})
}

function logout(req, res)  {
    req.session.destroy();
    res.json({ status: "ok" });
}

function logoutPage(req,res){ 
    res.render(path.resolve('views/pages/logout'), {status:'ok', user: req.session.user});
}


function notFound(req,res) { 
    logger.log('warn',`Ruta no encontrada ${req.url}`)
    res.status(400).send(`Ruta no encontrada ${req.url}`)
}

module.exports={
    redirectProfile,
    profile,
    signUp,
    login,
    loginPage,
    signUpPage,
    profile,
    infoUser,
    logout,
    logoutPage,
    notFound
}