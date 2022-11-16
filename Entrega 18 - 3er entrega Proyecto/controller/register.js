import { usuariosDao } from "../daos/index.js";
import { createHash } from "../utils/crypt.js";
import { sendMailNewUser } from "../utils/nodemailer.js";
import { sendWhatsAppNewUser } from "../utils/twilio.js";

export const postRegisterController = async (req, res) => {
    const usuarios = await usuariosDao.listarAll();
    const email = req.body.email;
    const password = createHash(req.body.password);
    if (usuarios.find((usuario) => usuario.email == email)) {
        req.session.message =
            "Este email ya se encuentra registrado";
        req.session.route = "register";
        req.session.fileName = req.body.fileName;
        res.redirect("/error");
    } else {
        const newUser = {
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            email: email,
            password: password,
            photo: req.body.fileName,
            cellphone: "+54 9 " + req.body.cellphone
        };

        await usuariosDao.guardar(newUser).then((res) => {
            sendMailNewUser(newUser);
            sendWhatsAppNewUser(newUser);
        });

        const msg = `NUEVO USUARIO REGISTARDO
        NOMBRE DE USUARIO: ${newUser.name}
        DIRECCION DE CASA: ${newUser.address}
        EDAD: ${newUser.age}
        TELEFONO CELULAR: ${newUser.cellphone}
        EMAIL: ${newUser.email}
        FOTO PERFIL:  /uploads/${newUser.photo}`;

        res.redirect("/login");
    }
};

export const getRegisterController = (req, res) => {
    res.render("pages/register");
};