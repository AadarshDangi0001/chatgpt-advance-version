import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/', authUser ,(req, res) => {
    res.render('home');
});

export default router;