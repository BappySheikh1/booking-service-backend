import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  BlogController.blogInsertIntoDB
);
router.get('/', BlogController.getAllBlogFromDB);
router.get('/:id', BlogController.getSingleBlogFromDB);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BlogController.updateBlogOneInDB
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BlogController.deleteBlogByIdFromDB
);

export const BlogRoutes = router;

