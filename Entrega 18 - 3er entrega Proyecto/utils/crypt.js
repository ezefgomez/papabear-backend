import bcrypt from "bcrypt";

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

export const isValidPassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
};