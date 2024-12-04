import express from 'express';
import usersRouter from './routes/users.router.js';
import businessRouter from './routes/business.router.js';
import ordersRouter from './routes/orders.router.js';
import connectDB from './config/db.js';


const app = express();

// Routers
app.use('/api/users', usersRouter);
app.use('/api/business', businessRouter);
app.use('/api/orders', ordersRouter);



//Listen
const PORT = process.env.PORT || 8080;



const connection = connectDB('URL DE MONGO'); // Reemplazar con la URL real

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.then(() => {
  app.listen(PORT, () => console.log(`server running at port ${PORT}`))
})