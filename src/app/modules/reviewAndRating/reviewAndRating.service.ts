import { Reviews } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoFromDB = async (
  data: Reviews,
  userId: string
): Promise<Reviews> => {
  data.userId = userId;
// console.log('user id',data.userId)
// console.log('user id',userId)
  const existForBooking = await prisma.booking.findMany({
    where: {
      serviceId: data.serviceId,
      userId: userId, 
    },
  });

  if (existForBooking.length === 0) {
    throw new Error('User has not booked this service.');
  }

  // Ensure the service being reviewed exists
  const existingService = await prisma.services.findUnique({
    where: { id: data.serviceId },
  });

  if (!existingService) {
    throw new Error('Service does not exist.');
  }

  // Create the review
  const result = await prisma.reviews.create({ data });

  return result;
};

const getAllReviewAndRatingFromDB = async (): Promise<Reviews[]> => {
  const result = await prisma.reviews.findMany({
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getSingleReviewAndRatingByIdFromDB = async (id: string): Promise<Reviews[]> => {
  const result = await prisma.reviews.findMany({ where: { serviceId: id } });
  return result;
};

export const ReviewAndRatingService = {
  insertIntoFromDB,
  getAllReviewAndRatingFromDB,
  getSingleReviewAndRatingByIdFromDB,
};
