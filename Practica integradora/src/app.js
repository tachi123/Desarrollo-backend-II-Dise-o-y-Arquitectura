import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import {__dirname} from './utils';

import dotenv from "dotenv"; //Para utilizar las variables de entorno

//Importamos los routers
import userRouter from './routes/user.router.js';
import apiRouter from './routes/api.router.js';

const app = express();

dotenv.config(); //nos va a permitir trabajar con las variables de entorno

const uriMongo = process.env.URIMONGO || 'mongodb://localhost:27017/mongodb://localhost:27017/integrative-practice';
const PORT = process.env.PORT || 8080;
const firmaCookie = process.env.FIRMACOOKIE || "CoderSecret";

//Configuración de Express
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser(firmaCookie)); //Agregarmos una firma a las cookies
app.use(express.static(__dirname + '/public'));//Cargar la carpeta 'public'

//Configuración del motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

//Configuramos y conectamos a la base de datos
mongoose.connect(uriMongo)
    .then( () => console.log(''))
    .catch((error) => console.error('Error en conexion:', error))
;

//Rutas base para vistas y API
app.use('/users', userRouter);
app.use('/api/users', apiRouter);


//Iniciar el servidor
app.listen(PORT, ()=> {
    console.log("Listening on PORT: "+PORT);
})


