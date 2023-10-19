import express from 'express';

import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookingsController } from './bookings.controller';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingsController.insertBookingIntoDB
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  BookingsController.getAllBookingFromDB
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  BookingsController.getSingleBookingByIdFromDB
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingsController.updateBookingOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  BookingsController.deleteBookingByIdFromDB
);

export const BookingsRouter = router;
