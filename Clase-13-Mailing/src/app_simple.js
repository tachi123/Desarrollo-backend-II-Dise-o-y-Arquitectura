import express from 'express';
import nodemailer from 'nodemailer';
import __dirname from './utils.js';
import dotenv from "dotenv";//Importar dotenv para utilizar las varliables de entorno

const PORT = 3000;
const app = express();

dotenv.config(); //nos permitia poder trabjar con las variables de entorno

//Leer y almacenar variables de entorno
const mailService = process.env.MAIL_SERVICE;
const mailPort = process.env.MAIL_PORT;
const mailFrom = process.env.MAIL_FROM;
const mailPass = process.env.MAIL_PASS;

const transport = nodemailer.createTransport({
    service: mailService,
    port: mailPort,
    auth: {
      user: mailFrom,
      pass: mailPass,
    },
});

app.get('/mail', async (req, res) => {
    try{
        let result = await transport.sendMail({
        from: mailFrom,
        to: mailFrom,
        subject: 'Correo de prueba',
        html: `
          <div>
            <h1>¡Esto es un test!</h1>
            <img src="cid:perrito1"/>
          </div>
        `,
        attachments: [
            {
                filename: 'perrito1.jpg',
                path: __dirname + '/images/perrito1.png',
                cid: 'perrito1'
              }
        ],
        });
        res.send({ status: "success", result: "Email Sent" })
    }catch(error){

    }  
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});