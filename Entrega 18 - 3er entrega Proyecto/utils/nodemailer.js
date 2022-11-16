import { createTransport } from "nodemailer";
import { userMailAdmin, passMailAdmin } from "../config/config.js";
import { logger } from "./logger.js";

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: userMailAdmin,
        pass: passMailAdmin,
    },
});

export const sendMailNewUser = async (newUser) => {
    const mailOptions = {
        from: "Node.js Tienda Papabear",
        to: userMailAdmin,
        subject: "Nuevo Usuario",
        html: `<h1 style="color: green;">Nuevo usuario registrado</h1>'
        <div>
            <ul>
                <li>NOMBRE: <span style="color: black;"> ${newUser.nombre}</span></li>
                <li>DIRECCION <span style="color: black;">${newUser.direccion}</span></li>
                <li>EDAD <span style="color: black;">${newUser.edad}</span></li>
                <li>TELEFONO <span style="color: black;">${newUser.phone}</span></li>
                <li>EMAIL <span style="color: black;">${newUser.email}</span></li>
                <li>imagen <img src="uploads/${newUser.photo}" width="12" height="15"/></li>
            </ul>
        </div>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info("mail enviado", info);
    } catch (err) {
        logger.error(err);
    }
};

export const sendMailNewCart = async (nombre, email, cart) => {
    let listaProductosCarrito = "<h3>Mi nuevo carrito</h3>";
    cart.productos.forEach((element) => {
        listaProductosCarrito += `<li>${element.title}   $${element.price} x ${element.cantidad}</li>`;
    });

    const mailOptions = {
        from: "Node.js Tienda Papabear",
        to: userMailAdmin,
        subject: "nuevo pedido de " + nombre,
        html:
            `<h1 style="color: blue;">Nueva compra del usuario: <span style="color: black;"> ${email} </span></h1><div><ul>` +
            listaProductosCarrito +
            `<h2>Total $ ${cart.total} </h2></ul><div>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info("mail enviado", info);
    } catch (err) {
        logger.error(err);
    }
};