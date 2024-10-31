import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import session from 'express-session';
import __dirname from './utils.js';

//Importar dotenv para utilizar las variables de entorno
import dotenv from "dotenv";

import mongostore from 'connect-mongo';

const app = express();

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config(); //nos permitirá poder trabajar con las variables de entorno

app.use(cookieParser());

//Leer y almacenar variables de entorno
const URIConexion = 'mongodb://localhost:27017/CoderHouseClase2';// process.env.URIMONGO;

app.use(session({
    store: mongostore.create({
        mongoUrl: URIConexion,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      //  ttl: 15,
    }),
    secret: 'asd3nc3okasod',
    resave: false,
    saveUninitialized: false
}));


//Configurar nuestro motor de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');


// Define una ruta de ejemplo para el endpoint de login
app.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.send('Ya estás logeado.');
    } else {
        req.session.loggedIn = true;
        res.send('¡Inicio de sesión exitoso!');
    }
});


const server = app.listen(8080, ()=> {
    console.log("Listening on PORT 8080")
});