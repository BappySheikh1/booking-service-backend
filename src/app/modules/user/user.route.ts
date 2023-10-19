import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get(
  '/users',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUsersFromDB
);

router.get(
  '/user/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSingleUserByIdFromDB
);

router.patch(
  '/super_admin/users/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateAdminRoles
);

router.patch(
  '/user/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.updateSingleUserFromDB
);

router.delete(
  '/user/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUserFromDB
);

export const UserRouter = router;
