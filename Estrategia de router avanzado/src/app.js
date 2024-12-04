import express from 'express';
import petsRouter from './routes/pets.router.js';
import UsersRouter from './routes/users.js';
import SessionRouter from './routes/session.js';
import mongoose from "mongoose";
import handlebars from 'express-handlebars';

const app = express();
app.use(express.json()); //Middleware para parsear JSON en el body
app.use(express.urlencoded({ extended: true }));
app.use('/api/pets',petsRouter);


const URIConexion = 'mongodb://localhost:27017/CoderHouseClase2';// process.env.URIMONGO;

//Conexión a la base de datos
mongoose.connect(URIConexion)
    .then( () => console.log(''))
    .catch((error) => console.error('Error en conexion:', error))
;


//Al utilizar custom router, tenemos que inicializarlos, es decir, crear una instancia
const usersRouter = new UsersRouter(); //Inicializamos el router user
app.use('/users', usersRouter.getRouter());
const sessionsRouter = new SessionRouter(); //Inicializamos el router session
app.use('/sessions', sessionsRouter.getRouter());

// Cargamos la carpeta 'public' como nuestra carpeta de archivos estáticos
app.use(express.static(__dirname + '/public'));

//Configurar nuestro motor de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

app.listen(8080, () => 
    console.log('Servidor escuchando en el puerto 8080')
);