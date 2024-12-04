import express from 'express';
import contactsRouter from './routes/contacts.router.js';

const app = express();

app.use('/contacts', contactsRouter);
app.use('/products', productsRouter);

const server = app.listen(8080, () => console.log('Listening on 8080'));

