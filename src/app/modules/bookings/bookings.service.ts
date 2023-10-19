import { Booking, BookingStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { hasTimeConflict } from '../../../shared/utils';

const insertBookingIntoDB = async (data: Booking, id: string): Promise<Booking> => {
  if (data) {
    data.userId = id;
    data.status = BookingStatus.pending;
  }

  const alreadyBooked = await prisma.booking.findMany({
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

  if (hasTimeConflict(existingBooking, newSlot)) {
    throw new ApiError(httpStatus.CONFLICT, 'Time slot already booked');
  }

  const result = await prisma.booking.create({
    data,
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getAllBookingFromDB = async (id: string): Promise<Booking[]> => {
  const isAdmin = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      role: true,
    },
  });

  if (isAdmin?.role === 'admin') {
    const result = await prisma.booking.findMany({
      include: {
        user: true,
        service: true,
      },
    });
    return result;
  }
  const result = await prisma.booking.findMany({
    where: {
      userId: id,
    },
    include: {
      user: true,
      service: true,
    },
  });
  return result;
};

const getSingleBookingByIdFromDB = async (
  id: string,
  bookingId: string
): Promise<any | Booking[]> => {
  const isAdmin = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      role: true,
    },
  });
  if (isAdmin?.role === 'admin') {
    const result = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        user: true,
        service: true,
      },
    });
    return result;
  } else {
    const result = await prisma.booking.findMany({
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
};

const updateBookingOneInDB = async (
  id: string,
  bookingId: string,
  payload: Partial<Booking>
): Promise<Booking> => {
  const result = await prisma.booking.update({
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
};

const deleteBookingByIdFromDB = async (
  id: string,
  bookingId: string
): Promise<Booking> => {
  const isPending = await prisma.booking.findUnique({
    where: {
      userId: id,
      id: bookingId,
    },
  });

  if (
    isPending?.status === BookingStatus.accepted ||
    isPending?.status === BookingStatus.rejected
  ) {
    throw new ApiError(httpStatus.CONFLICT, 'This Booking Allready Accepted');
  } else {
    const result = await prisma.booking.delete({
      where: {
        userId: id,
        id: bookingId,
      },
    });
    return result;
  }
};

export const BookingsService = {
  insertBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingByIdFromDB,
  updateBookingOneInDB,
  deleteBookingByIdFromDB,
};