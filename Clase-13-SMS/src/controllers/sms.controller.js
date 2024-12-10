import twilio from 'twilio';
import dotenv from "dotenv";//Importar dotenv para utilizar las varliables de entorno

dotenv.config(); //nos permitia poder trabjar con las variables de entorno

//Leer y almacenar variables de entorno de Twilio
const twilioAccountSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioSMSNumber = process.env.TWILIO_SMS_NUMBER;

const client = twilio(twilioAccountSID, twilioAuthToken);

export const enviarSMS = async (req, res) => {
    try {
      const { nombre, producto } = req.body; // Obtiene los query params
      if (!nombre || !producto) { // Valida que se proporcionen ambos parámetros
        return res.status(400).send({ status: 'error', message: 'Se requieren los parámetros "nombre" y "producto".' });
      }
      const message = await client.messages.create({
        body: `Gracias, ${nombre}, tu solicitud del producto ${producto} ha sido aprobada.`,
        from: twilioSMSNumber,
        to: 'Tu número de prueba'
      });

      res.send({ status: "success", message: 'SMS enviado correctamente.', sid: message.sid });

    } catch (error) {
        console.error("Error al enviar SMS", error)
        res.status(500).send({ status: 'error', message: 'Error al enviar el SMS.', error: error.message });
    }
};
