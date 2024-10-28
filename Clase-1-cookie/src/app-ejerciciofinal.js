import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret: 'secretCoder', //Setear una clave secretar fuerte
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    if(req.session.visits){ 
        req.session.visits++;
        const nombre = req.query.nombre;
        if(nombre){
            req.session.nombre = nombre;
            res.send(`${nombre} visitaste la página ${req.session.visits} veces`);
        }else{
            res.send(`Visitaste la página ${req.session.visits} veces`);
        }
    }else{
        //El usuario no tiene almancenado visits, entonces quiere decir que no había ingresado
        //Inicializó la variable
        req.session.visits=0;
        const nombre = req.query.nombre;
        if(nombre){
            req.session.nombre = nombre;
            res.send(`Bienvenido ${nombre}`);
        }else{
            res.send('Te damos la bienvenida');
        }  
    }
})

const server = app.listen(8080, ()=> {
    console.log("Listening on PORT 8080")
});