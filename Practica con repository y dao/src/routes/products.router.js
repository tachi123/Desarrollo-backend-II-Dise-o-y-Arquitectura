import { Router } from 'express';
import { productsService } from '../repositories/index.js';

const router = Router();

router.get('/', async (req, res) => {
  const result = await productsService.getProducts();
  res.send({ status: "success", payload: result });
});


export default router;