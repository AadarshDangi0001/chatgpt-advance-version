import express from 'express';
import { getRegisterController } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/register', getRegisterController);

export default router;