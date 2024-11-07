import {fileURLToPath} from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from "dotenv"; //Para utilizar las variables de entorno
dotenv.config();

//Private key para hacer cifrado del token
const PRIVATE_KEY = process.env.PRIVATEKEYJWT || "CoderKeyQueFuncionaComoUnSecret";
const EXPIRES_TIME_TOKEN = process.env.EXPIRES_TIME_TOKEN || '24h';

export const generateToken = (user) => {
    return jwt.sign(user, PRIVATE_KEY, {expiresIn: EXPIRES_TIME_TOKEN});
}

//Función que valida el token JWT - MIDDLEWARE
export const verifyToken = (req, res, next) =>{
     const authHeader = req.headers.authorization;
     //Si no hay headers, es porque no hay nadie autenticado
     if(!authHeader) return res.status(401).send({error: "Not authenticated"});

     const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra 'Bearer'
     jwt.verify(token, PRIVATE_KEY, (error, credentials)=> {
        //jwt verifica el token existente y corroboro si es un token válido, alterado, expirado, etc.
        if (error) return res.status(403).send({ error: "Not authorized" });
        //Si todo está en orden, se descifra correctamente el token y se envía el usuario
        req.user = credentials.user;
        next();
     })
}

//Crear una constante llamada createHash
//Es una función que recibe un password como argumento y genera:
//   * Genera un salt (una cadena aleatoria de 10 caracteres) 
//   * Genera el hash del password usando el salt
//   * Devuelve el hash del password 
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Crea una constante llamada isValidPassword
// La constante es una función que recibe un objeto user y un password como argumentos
// Compara el password con el password hasheado almacenado en el objeto user
// Devuelve true si el password coincide con el password hasheado, false en caso contrario
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);