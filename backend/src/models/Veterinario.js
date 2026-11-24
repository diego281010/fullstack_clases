import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';

const { Schema } = mongoose;

const veterinarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        trim: true,
        default: null
    },
    celular: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    },
    rol: {
        type: String,
        default: "veterinario"
    },
    confirmEmail: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// Métodos

// Método para cifrar el password
veterinarioSchema.methods.encryptPassword = async function (passwordUser) {
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypt = await bcrypt.hash(passwordUser, salt);
    return passwordEncrypt;
}

// Método para verificar si el password es el mismo de la DB
veterinarioSchema.methods.matchPassword = async function (passwordUser) {
    const response = await bcrypt.compare(passwordUser, this.password);
    return response;

}

// Método para crear un token (OTP) para el correo no JWT
veterinarioSchema.methods.createToken = function () {
    const tokenGenerado = randomBytes(2).toString('hex').toUpperCase();
    this.token = tokenGenerado;
    return tokenGenerado;
}

export default mongoose.model('Veterinario', veterinarioSchema)

