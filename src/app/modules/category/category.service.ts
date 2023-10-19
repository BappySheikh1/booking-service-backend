import { Categories } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Categories): Promise<Categories | null> => {
  const result = await prisma.categories.create({ data: data });
  return result;
};

const getAllCategoryFromDB = async (): Promise<Categories[]> => {
  const result = await prisma.categories.findMany();
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await prisma.categories.findUnique({ where: { id } });

  //   const books = await prisma.book.findMany({ where: { CategoriesId: id } });

  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Categories
): Promise<Categories | null> => {
  const result = await prisma.categories.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteCategoryFromDB = async (id: string): Promise<Categories | null> => {
  const result = await prisma.categories.delete({ where: { id } });
  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
