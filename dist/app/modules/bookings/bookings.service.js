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
exports.BookingsService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const insertBookingIntoDB = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    if (data) {
        data.userId = id;
        data.status = client_1.BookingStatus.pending;
    }
    const alreadyBooked = yield prisma_1.default.booking.findMany({
        where: {
            date: data.date,
        },
    });
    const existingBooking = alreadyBooked.map(schedule => {
        return {
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
        };
    });
    const newSlot = {
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
    };
    if ((0, utils_1.hasTimeConflict)(existingBooking, newSlot)) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Time slot already booked');
    }
    const result = yield prisma_1.default.booking.create({
        data,
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
const getAllBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdmin = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
        select: {
            role: true,
        },
    });
    if ((isAdmin === null || isAdmin === void 0 ? void 0 : isAdmin.role) === 'admin') {
        const result = yield prisma_1.default.booking.findMany({
            include: {
                user: true,
                service: true,
            },
        });
        return result;
    }
    const result = yield prisma_1.default.booking.findMany({
        where: {
            userId: id,
        },
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
const getSingleBookingByIdFromDB = (id, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdmin = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
        select: {
            role: true,
        },
    });
    if ((isAdmin === null || isAdmin === void 0 ? void 0 : isAdmin.role) === 'admin') {
        const result = yield prisma_1.default.booking.findUnique({
            where: {
                id: bookingId,
            },
            include: {
                user: true,
                service: true,
            },
        });
        return result;
    }
    else {
        const result = yield prisma_1.default.booking.findMany({
            where: {
                userId: id,
                id: bookingId,
            },
            include: {
                user: true,
                service: true,
            },
        });
        return result;
    }
});
const updateBookingOneInDB = (id, bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
        where: {
            userId: id,
            id: bookingId,
        },
        data: payload,
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
const deleteBookingByIdFromDB = (id, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const isPending = yield prisma_1.default.booking.findUnique({
        where: {
            userId: id,
            id: bookingId,
        },
    });
    if ((isPending === null || isPending === void 0 ? void 0 : isPending.status) === client_1.BookingStatus.accepted ||
        (isPending === null || isPending === void 0 ? void 0 : isPending.status) === client_1.BookingStatus.rejected) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'This Booking Allready Accepted');
    }
    else {
        const result = yield prisma_1.default.booking.delete({
            where: {
                userId: id,
                id: bookingId,
            },
        });
        return result;
    }
});
exports.BookingsService = {
    insertBookingIntoDB,
    getAllBookingFromDB,
    getSingleBookingByIdFromDB,
    updateBookingOneInDB,
    deleteBookingByIdFromDB,
};
