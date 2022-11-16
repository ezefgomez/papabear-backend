import MongoStore from "connect-mongo";
import { urlMongo, secretSessionMongo } from "../config/config.js";

export const mongoSession = {
    store: MongoStore.create({
        mongoUrl: urlMongo,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: secretSessionMongo,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000,
    },
};