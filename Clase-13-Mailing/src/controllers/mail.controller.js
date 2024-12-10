import nodemailer from 'nodemailer';
import __dirname from '../utils.js';
import dotenv from "dotenv";//Importar dotenv para utilizar las varliables de entorno

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

export const enviarCorreo = async (req, res) => {
    try {
      const { destinatario, asunto, mensaje } = req.body;
      let info = await transport.sendMail({
        from: mailFrom, //Correo principal configurado para nuestro emisor de mails
        to: destinatario || mailFrom, // Uso el destinatario de req.body o un valor por defecto
        subject: asunto || '¡Hola desde Nodemailer!', //Uso el asunto de req.body o un valor por defecto
        html: `
          <div>
            <h1>${mensaje || 'Este es mi correo electrónico personalizado!'}</h1>
            <p>Te envío esta imagen de un hermoso paisaje:</p>
            <img src="cid:perrito1" alt="Perrito">
            <p>Y aquí te adjunto un documento importante:</p>
          </div>
        `,
        attachments: [
            {
                filename: 'perrito1.jpg',
                path: __dirname + '/images/perrito1.png',
                cid: 'perrito1'
            },
            {
              filename: 'documento.pdf',
              path: __dirname + '/documents/documento.pdf',
            }
        ],
        });
        console.log('Correo electrónico enviado:', info.messageId);
        res.send({ status: "success", result: info })
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).send({ status: "error", message: "Error sending email", error: error.message }); // Manejo de errores
    }
};
