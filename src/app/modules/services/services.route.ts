import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ServiceController } from './services.controller';

const router = express.Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.insertIntoDB
);
router.get('/', ServiceController.getAllServiceFromDB);
router.get('/:categoryId/category', ServiceController.getServiceByCategoryId);
router.get('/:id', ServiceController.getSingleServiceByIdFromDB);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.updateServiceFromDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteServiceFromDB
);

export const ServicesRouter = router;
