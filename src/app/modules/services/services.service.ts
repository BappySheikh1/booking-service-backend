import { Prisma, Services } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { serviceSearchableFields } from './services.contants';
import { IServiceFilters } from './services.interface';

const insertIntoDB = async (data: Services): Promise<Services> => {
  const result = await prisma.services.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllServiceFromDB = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Services[]>> => {
  const { search, ...filterData } = filters;
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
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
          equals: (filterData as any)[key],
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

  const whereConditions: Prisma.ServicesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.services.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            price: 'asc',
          },
  });

  const total = await prisma.services.count({
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
};

const getServiceByCategoryId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Services[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.services.findMany({
    where: {
      category: {
        id: categoryId,
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: 'desc',
          },
    include: {
      category: true,
    },
  });

  const total = await prisma.services.count({
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
};

const getSingleServiceByIdFromDB = async (id: string): Promise<Services | null> => {
  const result = await prisma.services.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
  return result;
};
const updateServiceFromDB = async (
  id: string,
  payload: Services
): Promise<Services | null> => {
  const result = await prisma.services.update({ where: { id }, data: payload });
  return result;
};
const deleteServiceFromDB = async (id: string): Promise<Services | null> => {
  const result = await prisma.services.delete({ where: { id } });
  return result;
};

export const ServicesService = {
  insertIntoDB,
  getAllServiceFromDB,
  getSingleServiceByIdFromDB,
  updateServiceFromDB,
  deleteServiceFromDB,
  getServiceByCategoryId,
};