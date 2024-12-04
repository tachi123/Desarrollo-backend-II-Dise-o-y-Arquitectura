import express from 'express';
import {fork} from 'child_process';

const app = express();


app.get('/test', (req, res) => {
    res.send(`Anda?`);
});


app.get('/calculo-nobloq', (req, res) => {
    const child = fork('./src/operacionCompleja.js'); //Primero forkeamos la operación
    child.send('¡Inicia el cálculo, por favor!'); // El padre envía un mensaje al hijo
    child.on('message', result => { // Sólo hasta que el hijo nos responda, procedemos a mostrar el resultado.
        res.send(`El resultado de la operación es ${result}`);
    });
});

app.get('/calculo-bloq', (req, res) => {
    let suma = 0;
    for (let i = 0; i <= 5e9; i++) {
        suma += i;
    }
    res.send(`Resultado de la suma (bloqueo): ${suma}`);
});


app.listen(8080, () => 
    console.log('Servidor escuchando en el puerto 8080')
);