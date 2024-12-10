import express from 'express';
import mailRouter from './routes/mail.router.js';

const PORT = 3000;
const app = express();

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/mail", mailRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});