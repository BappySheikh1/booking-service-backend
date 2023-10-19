"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const faqs_controller_1 = require("./faqs.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), faqs_controller_1.FaqsController.faqInsertIntoDB);
router.get('/', faqs_controller_1.FaqsController.getAllFaqFromDB);
router.get('/:id', faqs_controller_1.FaqsController.getSingleFaqByIdFromDB);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), faqs_controller_1.FaqsController.updateFaqOneInDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), faqs_controller_1.FaqsController.deleteFaqByIdFromDB);
exports.FaqsRoutes = router;
