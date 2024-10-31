import express from 'express';
import { createHash , isValidPassword } from '../utils.js'
import passport from 'passport';
import UserModel from '../models/user.models.js'
const router = express.Router();


//Registración
router.post('/register', passport.authenticate('register', {failureRedirect:'failregister'}), async (req,res) => {
    res.send({status: "success",message: "User registered"})
})

//Fallo de registración
router.post('/failregister', async (req,res) => {
    console.log("Failed Strategy");
    res.send({error: "Failed"})
})

//Iniciar sesión 
router.post('/login', passport.authenticate('login', {failureRedirect: 'failloging'}), async (req,res) => {
    console.log('toy accaaaa');
    if(!req.user) 
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    };

    res.redirect('/perfil');
})

router.get('/failloging', (req, res) => {
    res.send({ error: 'Failed Login' });
});

//Restaurar contraseña
router.post('/restore-password', async (req, res) => {
    const {email, newPassword} = req.body;
    try{
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send({ status: 'error', message: 'User not found' });
        }

        user.password = createHash(newPassword);
        await user.save();

        return res.redirect('/login'); // Redirige a la vista de login

    }catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: 'Internal server error' });
    }


})


//Cerrar sesión del usuario
router.post('/logout', (req, res) => {
    req.session.destroy( (error) => {
        if(error){
            console.error('Error al cerrar sesión');
            res.status(500).send('Error al cerrar sesión');
        } else{
            res.redirect('/login');
        }
    })
})


export default router;