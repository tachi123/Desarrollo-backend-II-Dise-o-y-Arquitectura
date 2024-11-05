import express from 'express';
import { generateToken, authToken } from './utils';

const app = express();
const PRIVATE_KEY = "CoderKeyQueFuncionaComoUnSecret";

// Establece el motor de plantillas (si estás utilizando uno)
app.set('view engine', 'ejs'); // Ejemplo usando EJS
app.set('views', './views'); // Define la carpeta de las vistas


const users = []; //De momento se optará por una persistencia en memoria.

app.get('/', authToken, (req, res) => {// Utiliza el middleware 'authToken' 
    if (req.user) { // Si hay un usuario en la sesión 
        res.send(`<h1>Bienvenido, ${req.user.name}!</h1>`); // Envía una vista simple (no un motor de plantillas)
    } else {
        res.redirect('/login'); 
    }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const exists = users.find(user => user.email === email);
    if (exists) return res.status(406).send({ status: 'error', error: 'User already exists' });
    const user = {
      name,
      email,
      password
    };
    users.push(user);
  
    //Generamos un token con el usuario.
    const access_token = generateToken(user);
    res.send({ status: 'success', access_token });
  });
  
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) return res.status(408).send({ status: 'error', error: 'Invalid credentials' });

  });
  
app.get('/current', authToken, (req, res) => {
    //Ya que usamos authToken, sabemos que tenemos que tener un objeto user en nuestro request. de otra manera el middleware devolvería el error.
    res.send({ status: 'success', payload: req.user });
});    
    
app.listen(8080, () => console.log('listening on 8080'));

