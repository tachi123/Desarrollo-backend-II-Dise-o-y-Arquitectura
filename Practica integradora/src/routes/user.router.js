import express from 'express';
import { verifyToken } from '../utils.js';

const router = express.Router();

//Ruta para el login
router.get('/login', (req,res)=> {
    res.render('login', { currentUser: req.cookies.currentUser});
})

//Ruta para el usuario actual
router.get('/current', verifyToken, (req,res) => {
    const user = req.user;
    res.render('current', {current: user});
})

export default router;