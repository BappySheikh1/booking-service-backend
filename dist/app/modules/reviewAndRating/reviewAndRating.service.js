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
exports.ReviewAndRatingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const insertIntoFromDB = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    data.userId = userId;
    // console.log('user id',data.userId)
    // console.log('user id',userId)
    const existForBooking = yield prisma_1.default.booking.findMany({
        where: {
            serviceId: data.serviceId,
            userId: userId,
        },
    });
    if (existForBooking.length === 0) {
        throw new Error('User has not booked this service.');
    }
    // Ensure the service being reviewed exists
    const existingService = yield prisma_1.default.services.findUnique({
        where: { id: data.serviceId },
    });
    if (!existingService) {
        throw new Error('Service does not exist.');
    }
    // Create the review
    const result = yield prisma_1.default.reviews.create({ data });
    return result;
});
const getAllReviewAndRatingFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviews.findMany({
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
const getSingleReviewAndRatingByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviews.findMany({ where: { serviceId: id } });
    return result;
});
exports.ReviewAndRatingService = {
    insertIntoFromDB,
    getAllReviewAndRatingFromDB,
    getSingleReviewAndRatingByIdFromDB,
};
