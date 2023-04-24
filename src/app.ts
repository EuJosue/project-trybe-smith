import express from 'express';
import router from './routers';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use(router);

app.use(errorHandler);

export default app;