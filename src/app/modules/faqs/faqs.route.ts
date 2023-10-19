import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { FaqsController } from './faqs.controller';

const router = express.Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  FaqsController.faqInsertIntoDB
);
router.get('/', FaqsController.getAllFaqFromDB);
router.get('/:id', FaqsController.getSingleFaqByIdFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FaqsController.updateFaqOneInDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FaqsController.deleteFaqByIdFromDB
);

export const FaqsRoutes = router;
