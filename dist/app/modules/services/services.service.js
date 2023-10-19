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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const services_contants_1 = require("./services.contants");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllServiceFromDB = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: services_contants_1.serviceSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // console.log(Object.values(filterData));
    console.log(Object.values(filterData)[0]);
    if (Object.values(filterData)[0] != '') {
        console.log(Object.values(filterData)[0]);
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    // if (minPrice !== undefined) {
    //   andConditions.push({
    //     price: {
    //       gte: parseFloat(minPrice),
    //     },
    //   });
    // }
    // if (maxPrice !== undefined) {
    //   andConditions.push({
    //     price: {
    //       lte: parseFloat(maxPrice),
    //     },
    //   });
    // }
    // if (category !== undefined) {
    //   andConditions.push({
    //     categoryId: {
    //       equals: category,
    //     },
    //   });
    // }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.services.findMany({
        include: {
            category: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: paginationOptions.sortBy && paginationOptions.sortOrder
            ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
            : {
                price: 'asc',
            },
    });
    const total = yield prisma_1.default.services.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            total,
            page,
            limit,
            totalPage,
        },
        data: result,
    };
});
const getServiceByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.services.findMany({
        where: {
            category: {
                id: categoryId,
            },
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                price: 'desc',
            },
        include: {
            category: true,
        },
    });
    const total = yield prisma_1.default.services.count({
        where: {
            category: {
                id: categoryId,
            },
        },
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            total,
            page,
            limit,
            totalPage,
        },
        data: result,
    };
});
const getSingleServiceByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });
    return result;
});
const updateServiceFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.update({ where: { id }, data: payload });
    return result;
});
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.services.delete({ where: { id } });
    return result;
});
exports.ServicesService = {
    insertIntoDB,
    getAllServiceFromDB,
    getSingleServiceByIdFromDB,
    updateServiceFromDB,
    deleteServiceFromDB,
    getServiceByCategoryId,
};
