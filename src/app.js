import 'dotenv/config'; 
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRoutes from './routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

export default app;