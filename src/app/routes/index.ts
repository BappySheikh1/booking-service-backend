import express from 'express';

import { AuthRouter } from '../modules/auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { BookingsRouter } from '../modules/bookings/bookings.route';
import { CategoryRoute} from '../modules/category/category.route';
import { FaqsRoutes } from '../modules/faqs/faqs.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { ReviewAndRatingRoutes } from '../modules/reviewAndRating/reviewAndRating.route';
import { ServicesRouter } from '../modules/services/services.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRouter,
  },
  {
    path: '/',
    routes: UserRouter,
  },
  {
    path: '/services',
    routes: ServicesRouter,
  },
  {
    path: '/bookings',
    routes: BookingsRouter,
  },
  {
    path: '/categories',
    routes: CategoryRoute,
  },
  {
    path: '/reviews',
    routes: ReviewAndRatingRoutes,
  },
  {
    path: '/blogs',
    routes: BlogRoutes,
  },
  {
    path: '/faqs',
    routes: FaqsRoutes,
  },
  {
    path: '/feedbacks',
    routes: FeedbackRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
