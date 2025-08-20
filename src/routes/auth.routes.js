import express from 'express';
import { getRegisterController, getLoginController, postRegisterController } from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/register')
  .get(getRegisterController)
  .post(postRegisterController)
  .get(getLoginController);



export default router;