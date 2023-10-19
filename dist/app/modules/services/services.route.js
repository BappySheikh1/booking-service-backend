"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const services_controller_1 = require("./services.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.ServiceController.insertIntoDB);
router.get('/', services_controller_1.ServiceController.getAllServiceFromDB);
router.get('/:categoryId/category', services_controller_1.ServiceController.getServiceByCategoryId);
router.get('/:id', services_controller_1.ServiceController.getSingleServiceByIdFromDB);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.ServiceController.updateServiceFromDB);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), services_controller_1.ServiceController.deleteServiceFromDB);
exports.ServicesRouter = router;
