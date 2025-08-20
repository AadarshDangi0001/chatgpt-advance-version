import express from 'express';
import { getRegisterController, getLoginController, postRegisterController, postLoginController } from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/register')
  .get(getRegisterController)
  .post(postRegisterController)
  
router.route('/login')
  .get(getLoginController)
  .post(postLoginController)



export default router;