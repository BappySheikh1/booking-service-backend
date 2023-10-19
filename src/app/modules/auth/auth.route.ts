import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidation.create),
  AuthController.createRegister
);
router.post(
  '/super_admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AuthController.createSuperAdmin
);
router.post(
  '/admin',
  auth(ENUM_USER_ROLE.ADMIN),
  AuthController.createNewAdmin
);
router.post('/login', AuthController.loginUser);

export const AuthRouter = router;
