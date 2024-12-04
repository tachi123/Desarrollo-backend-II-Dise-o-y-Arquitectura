import { Router } from 'express';
import * as juguetesController from '../controllers/juguetes.controller.js'; //Importar todas las funciones del controlador juguetes

const router = Router();

router.get('/', juguetesController.obtenerJuguetes);

router.post('/', juguetesController.crearJuguete);

// rutas para juguetes

export default router;