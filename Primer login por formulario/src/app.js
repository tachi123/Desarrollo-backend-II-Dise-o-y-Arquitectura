import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import session from 'express-session';
import mongostore from 'connect-mongo';
import __dirname from './utils.js';

//Importar dotenv para utilizar las variables de entorno
import dotenv from "dotenv";

//Importer los routers
import userRouter from './routes/user.router.js';
import sessionRouter from './routes/session.router.js';

const app = express();

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config(); //nos permitirá poder trabajar con las variables de entorno
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

app.use(cookieParser());



//Configurar nuestro motor de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

app.use('/api/user', userRouter);

app.use('/api/sessions', sessionRouter);

const server = app.listen(8080, ()=> {
    console.log("Listening on PORT 8080")
});