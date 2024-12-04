import express from 'express';
import juguetesRouter from './routes/juguetes.router.js';
import usuariosRouter from './routes/usuarios.router.js';

const app = express();
const PORT = 3000;

app.use(express.json()); //Middleware para parsear JSON

app.use('/juguetes', juguetesRouter);
app.use('/usuarios', usuariosRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});