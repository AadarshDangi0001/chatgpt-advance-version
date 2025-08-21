import express from 'express';
import { getRegisterController, getLoginController, postRegisterController, postLoginController } from '../controllers/auth.controller.js';
import { userLogout } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/register')
  .get(getRegisterController)
  .post(postRegisterController)
  
router.route('/login')
  .get(getLoginController)
  .post(postLoginController)

router.route('/logout')
  .get(userLogout);


export default router;