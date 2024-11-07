import mongoose from "mongoose";
import {createHash} from "../utils.js";

const {Schema} = mongoose;

//Definimos el esquema usuario
const userSchema = new Schema({
    first_name: { type: String, required: true }, // Nombre del usuario
    last_name: { type: String, required: true }, // Apellido del usuario
    email: { type: String, required: true, unique: true }, // Correo electrónico del usuario (único)
    role: { type: String, default: 'user' }, // Rol del usuario (por defecto, 'user')
    password: { type: String, required: true } // Contraseña del usuario
});

//Middleware para hashear la contraseña antes de guardar el usuario
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next(); //Si la contraseña no se ha modificado, no se hashea, continua sin hacer nada
    this.password = createHash(this.password); //Hashear la contraseña
    next();
})

const UserModel = mongoose.model('User',userSchema);

export default UserModel;