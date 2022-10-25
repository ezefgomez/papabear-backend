import bcrypt from 'bcrypt'

export const checkPassword =  (password, input) => {
    return bcrypt.compareSync(input, password)
}

export const encrypt = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}