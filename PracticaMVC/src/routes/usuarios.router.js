import { Router } from 'express';
import * as usuariosController from '../controllers/usuarios.controller.js'; //Importar todas las funciones del controlador usuarios

const router = Router();

router.get('/', usuariosController.obtenerUsuarios);

router.post('/', usuariosController.crearUsuario);

// rutas para usuarios

export default router;