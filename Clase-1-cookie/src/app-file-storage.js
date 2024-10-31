import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import session from 'express-session';
import __dirname from './utils.js';

import filestore from 'session-file-store';

const app = express();

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//Nota cómo conectamos session con lo que será nuestro FileStore
const fileStorage = filestore(session);

app.use(session({
    //ttl = Time To Live. Vida de la sesión
    // retries = Tiempo de veces que el servidor tratará de leer el archivo 
    // path = ruta donde vivirá la carpeta para almacenar las sesiones. 
    store: new fileStorage({ path: './sessions', ttl: 100, retries: 0 }),
    secret: 'asd3nc3okasod',
    resave: false,
    saveUninitialized: false
}));


//Configurar nuestro motor de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');



const server = app.listen(8080, ()=> {
    console.log("Listening on PORT 8080")
});