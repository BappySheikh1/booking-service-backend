"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqsService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const faqInsertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const result = yield prisma_1.default.faqs.create({
        data,
    });
    return result;
});
const getAllFaqFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faqs.findMany({});
    return result;
});
const getSingleFaqByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faqs.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const deleteFaqByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faqs.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateFaqOneInDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faqs.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
exports.FaqsService = {
    faqInsertIntoDB,
    getAllFaqFromDB,
    getSingleFaqByIdFromDB,
    deleteFaqByIdFromDB,
    updateFaqOneInDB,
};
