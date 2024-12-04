import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import session from 'express-session';
import __dirname from './utils.js';

const app = express();

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
 * Al conectar cookieParser con express, podremos gestionar dentro de nuestras
 * peticiones, elementos correspondientes a cookies.
 */
//app.use(cookieParser());
//Agregar una firma a las cookies
app.use(cookieParser("CoderS3cR3tC0D3"));


app.use(session({
    // secret: 'secretCoder',
    /**
     * Resave permite mantener la sesión activa en caso de que la sesión se mantenga inactiva. Si se deja en false, la sesión morirá en caso de que exista cierto tiempo de inactividad
     */
    resave: true,
    /**
     * saveUninitialized permite guardar cualquier sesión aun cuando el objeto de sesión no tenga nada por contener. Si se deja en false, la sesión no se guardará si el objeto de sesión está vacío al final de la consulta.
     */
    saveUninitialized: true
}));


//Configurar nuestro motor de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');


app.get('/setCookie', (req, res)=>{
    res.cookie('nombre','Nahuel', {maxAge: 900000}); //Setamos la cookie 'nombre'
    res.send('Cookie establecida correctamente');
});

app.get('/getCookie', (req, res)=>{
    const nombre = req.cookies.nombre; //Obtenemos el valor de la cookie 'nombre'
    res.send('El valor de la cookie "nombre" es: ' + nombre);
});

app.get('/deleteCookie', (req, res)=>{
    res.clearCookie('nombre'); //Eliminar la cookie 'nombre'
    res.send('Cookie "nombre" eliminada correctamente');
});

//COOKIES FIRMADAS
app.get('/setSignedCookie', (req, res)=>{
    res.cookie('SignedCookie','Prueba de cookie firmada', {maxAge: 10000, signed: true}).send('Cookie signed almacenada');
});

app.get('/getSignedCookie', (req, res)=>{
    const signedCookieValue = req.signedCookies.SignedCookie; //Obtenemos el valor de la cookie firmada
    if (signedCookieValue) { // Si la cookie es válida...
        res.send(`¡La cookie firmada dice: ${signedCookieValue}!`);
      } else { // Si la cookie ha sido modificada...
        res.send('¡La cookie no es válida!');
    }
});

// Ruta para la vista del frontend
app.get('/', (req, res)=> {
    res.render('index');
})

//Ruta para crear una cookie
app.post('/submitCookie', (req, res) => {
    const {nombre, correo } = req.body;
    res.cookie('user', {user: correo}, {maxAge: 10000}); 
    res.send('Cookie CREADA');
})

//Ruta para obtener la cookie
app.post('/getCookieUser', (req, res) => {
    console.log('Cookie:',req.cookies);
    res.send('Cookie recibida!');
})

app.get('/session' , (req,res) => {
    // Si al conectarse la sesión ya existe, entonces aumenta el contador
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${req.session.counter} veces.`);
    } else{
        //Si no hay aún una sesión para el usuario, entonces inicializar en 1
        req.session.counter=1;
        res.send('Bienvenido!');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err) res.send('Logout ok!');
        else res.send({status: 'Logout ERROR', body: err});
    })
})

app.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username === 'pepe' || password === 'pepepass') {
      req.session.user = username
      req.session.admin = true
      res.send('login success!')
    } else {
      res.send('login failed!')
    }
  })

function auth(req, res, next){
    if(req.session?.user === 'pepe' && req.session?.admin){
        return next()
    }
    return res.status(401).send('error de autorización');
}

app.get('/privado', auth, (req, res) => {
    res.send('¡Si estas viendo esto es porque ya te logueaste!')
})


const server = app.listen(8080, ()=> {
    console.log("Listening on PORT 8080")
});