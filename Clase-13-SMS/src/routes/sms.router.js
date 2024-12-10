import { Router } from 'express';
import * as smsController from '../controllers/sms.controller.js'; 

const router = Router();

router.get("/send", smsController.enviarSMS); //http://localhost:3000/api/sms/send?nombre=Juan&producto=Zapatos

export default router;