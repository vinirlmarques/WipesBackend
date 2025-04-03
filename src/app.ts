import express, { Application } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';
import connectDB from './database/index';
import { setupSwagger } from './swagger';


const app: Application = express();

// Conecta ao banco de dados
connectDB();
setupSwagger(app);

// Middleware para converter o corpo da requisição para JSON
app.use(bodyParser.json());

// Rotas
app.use('/api/products', productRoutes);

export default app;
