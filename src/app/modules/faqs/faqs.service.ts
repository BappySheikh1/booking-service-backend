import { Faqs } from '@prisma/client';
import prisma from '../../../shared/prisma';

const faqInsertIntoDB = async (data: Faqs): Promise<Faqs> => {
  console.log(data);
  const result = await prisma.faqs.create({
    data,
  });
  return result;
};

const getAllFaqFromDB = async (): Promise<Faqs[]> => {
  const result = await prisma.faqs.findMany({});
  return result;
};

const getSingleFaqByIdFromDB = async (id: string): Promise<Faqs | null> => {
  const result = await prisma.faqs.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteFaqByIdFromDB = async (id: string): Promise<Faqs | null> => {
  const result = await prisma.faqs.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateFaqOneInDB = async (
  id: string,
  data: Faqs
): Promise<Faqs | null> => {
  const result = await prisma.faqs.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const FaqsService = {
  faqInsertIntoDB,
  getAllFaqFromDB,
  getSingleFaqByIdFromDB,
  deleteFaqByIdFromDB,
  updateFaqOneInDB,
};
