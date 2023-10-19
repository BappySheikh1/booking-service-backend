"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const bookings_route_1 = require("../modules/bookings/bookings.route");
const category_route_1 = require("../modules/category/category.route");
const faqs_route_1 = require("../modules/faqs/faqs.route");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const reviewAndRating_route_1 = require("../modules/reviewAndRating/reviewAndRating.route");
const services_route_1 = require("../modules/services/services.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRouter,
    },
    {
        path: '/',
        routes: user_route_1.UserRouter,
    },
    {
        path: '/services',
        routes: services_route_1.ServicesRouter,
    },
    {
        path: '/bookings',
        routes: bookings_route_1.BookingsRouter,
    },
    {
        path: '/categories',
        routes: category_route_1.CategoryRoute,
    },
    {
        path: '/reviews',
        routes: reviewAndRating_route_1.ReviewAndRatingRoutes,
    },
    {
        path: '/blogs',
        routes: blog_route_1.BlogRoutes,
    },
    {
        path: '/faqs',
        routes: faqs_route_1.FaqsRoutes,
    },
    {
        path: '/feedbacks',
        routes: feedback_route_1.FeedbackRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
