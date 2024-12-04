import { Router } from 'express';

import { contactsService } from '../repositories/index.js';

const router = Router();
const contactsService = new Contacts();

//OBTENER CONTACTOS   -READ
router.get('/', async (req, res) => {
  let result = await contactsService.get();
  res.send({ status: "success", payload: result });
});

//CREAR NUEVO CONTACTO    -CREATE
router.post('/', async (req, res) => {
    let { name, last_name, phone } = req.body;
    let contact = await contactsService.createContact({ name, last_name, phone });
    res.send({ status: "success", payload: result });
  });
  
//ACTUALIZAR CONTACTO - UPDATE  
  router.put('/:id', async (req, res) => {
    const result = await contactsService.update(req.params.id, req.body);
    res.send({ status: "success", payload: result });
  });
  
//ELIMINAR CONTACTO - DELETE 
  router.delete('/:id', async (req, res) => {
    const result = await contactsService.delete(req.params.id);
    res.send({ status: "success", payload: result });
  });
export default router;