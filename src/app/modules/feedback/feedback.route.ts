import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FeedbackController } from './feedback.controller';

const router = express.Router();

router.post('/create', FeedbackController.insertIntoDB);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  FeedbackController.getAllFeedBackFromDB
);
router.get('/:id', FeedbackController.getSingleFeedBackFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FeedbackController.updateFeedBackOneInDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FeedbackController.deleteFeedBackByIdFromDB
);

export const FeedbackRoutes = router;
