"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const reviewAndRating_controller_1 = require("./reviewAndRating.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), reviewAndRating_controller_1.ReviewAndRatingController.insertIntoFromDB);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), reviewAndRating_controller_1.ReviewAndRatingController.getAllReviewAndRatingFromDB);
router.get('/:id', reviewAndRating_controller_1.ReviewAndRatingController.getSingleReviewAndRatingByIdFromDB);
exports.ReviewAndRatingRoutes = router;
