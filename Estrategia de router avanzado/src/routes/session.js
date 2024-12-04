import Router from './router.js';
import jwt from 'jsonwebtoken';

export default class SessionRouter extends Router{
    init() {
        this.post('/register',  ["PUBLIC"],  passport.authenticate('register', {failureRedirect:'failregister'}), async (req, res) => {
          res.sendSuccess({"message":"Usuario registrado"})
        } )
        this.post('/login', ["PUBLIC"],  passport.authenticate('login', {failureRedirect: 'failloging'}), async(req,res) => {
          if(!req.user) 
            return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
          //usuario hardcodeado, lo que nos importa
          //aquí es la asignación del role.
          let user = {
            email: req.user.email,
            first_name: req.user.first_name,
            role: 'user' // Hardcodeado según las instrucciones
          };
        let token = jwt.sign(user, 'CoderSecretClaseRouter');
        res.sendSuccess({ token }); // Usamos la custom response
      });
    }
}

