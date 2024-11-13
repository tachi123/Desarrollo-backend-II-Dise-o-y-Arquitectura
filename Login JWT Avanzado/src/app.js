import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js';
import { authorization, passportCall } from './utils.js';

initializePassport();

const app = express();
app.use(cookieParser());
app.use(express.json()); //Middleware para parsear el body en formato json
app.use(express.static('src/public')); //Seteamos la carpeta donde estan los archivos estáticos
app.use(passport.initialize());


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === "coder@coder.com" && password === "coderpass") {
      let token = jwt.sign({ email, password,role:"user" }, "coderSecret", { expiresIn: "24h" });

      res.cookie('tokenCookie', token, {maxAge: 60 * 60 * 1000, httpOnly: true})
      .send({ message: "Logged in successfully"});
    }else{
        res.status(401).send({ message: 'Credenciales inválidas'});
    }
});

//Nueva ruta protegida
app.get('/current', passportCall('jwt'), authorization('user'), (req, res) => { 
    res.send(req.user);
})

//Nueva ruta protegida
app.get('/admin', passportCall('jwt'), authorization('admin'), (req, res) => { 
    res.send(req.user);
})

app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
})