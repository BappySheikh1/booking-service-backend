import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ReviewAndRatingController } from './reviewAndRating.controller';

const router = express.Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ReviewAndRatingController.insertIntoFromDB
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  ReviewAndRatingController.getAllReviewAndRatingFromDB
);
router.get(
  '/:id',
  ReviewAndRatingController.getSingleReviewAndRatingByIdFromDB
);

export const ReviewAndRatingRoutes = router;
