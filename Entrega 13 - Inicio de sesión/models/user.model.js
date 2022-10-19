import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.methods.encryptPassword = async password => {
    const salt =  await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model('userModel', UserSchema, 'users');
export default userModel;