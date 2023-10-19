"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(auth_validation_1.authValidation.create), auth_controller_1.AuthController.createRegister);
router.post('/super_admin', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.AuthController.createSuperAdmin);
router.post('/admin', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), auth_controller_1.AuthController.createNewAdmin);
router.post('/login', auth_controller_1.AuthController.loginUser);
exports.AuthRouter = router;
