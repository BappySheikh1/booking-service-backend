import { Feedback } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Feedback): Promise<Feedback> => {
  console.log(data);
  const result = await prisma.feedback.create({
    data,
  });
  return result;
};

const getAllFeedBackFromDB = async (): Promise<Feedback[]> => {
  const result = await prisma.feedback.findMany({});
  return result;
};

const getSingleFeedBackFromDB = async (
  id: string
): Promise<Feedback | null> => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const deleteFeedBackByIdFromDB = async (
  id: string
): Promise<Feedback | null> => {
  const result = await prisma.feedback.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateFeedBackOneInDB = async (
  id: string,
  data: Feedback
): Promise<Feedback | null> => {
  const result = await prisma.feedback.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const FeedbackService = {
  insertIntoDB,
  getAllFeedBackFromDB,
  getSingleFeedBackFromDB,
  deleteFeedBackByIdFromDB,
  updateFeedBackOneInDB,
};
