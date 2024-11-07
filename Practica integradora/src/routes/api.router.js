import express from 'express';
import UserService from '../models/user.models.js';
import {isValidPassword, generateToken, verifyToken } from '../utils.js';

const router = express.Router();

//Registro de usuario
router.post('/register', async (req, res) => {
    try{
        const newUser = new UserService(req.body);//Creamos un nuevo usuario a partir de los datos del formulario
        await newUser.save()> //Guardamos el usuario en la base de datos
        res.json({message: 'Usuario registrado exitosamente'})
    }catch (error){
        res.status(400).json({error: error.message}); //Manejar errores durante el registro
    }
})

//Ruta para login
router.post('/login', async (req, res) => {
    try{
        const user = await UserService.findOne({email: req.body.email});//Buscamos el usuario por email
        if(!user){
            return res.status(400).json({error: 'Usuario no encontrado'}); //Error cuando el usuario no existe
        }

        if(!isValidPassword(user, password)){
            return res.status(400).json({error: 'Credenciales inválidas'}); //Error cuando la contraseña no coincide
        }

        const token = generateToken({userId: user._id, role: user.role}); //Generamos un token JWT con la información del usuario
        res.cookie('currentUser', token, { httpOnly: true}); //Almacenamos el token en una cookie HTTP-Only
        res.json({message: 'Inicio de sesión exitoso'});

    }catch (error){
        res.status(500).json({error: error.message}); //Manejar errores durante el registro
    }
})


export default router;