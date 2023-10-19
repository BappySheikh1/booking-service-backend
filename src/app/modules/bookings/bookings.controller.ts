import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingsService } from './bookings.service';

const insertBookingIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as { userId: string };

    const result = await BookingsService.insertBookingIntoDB(req.body, userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking successfully',
      data: result,
    });
  }
);

const getAllBookingFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as { userId: string };
    const result = await BookingsService.getAllBookingFromDB(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Booking retrieve successfully',
      data: result,
    });
  }
);

const getSingleBookingByIdFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as { userId: string };
    const { id } = req.params;

    const result = await BookingsService.getSingleBookingByIdFromDB(userId, id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Booking retrieve successfully',
      data: result,
    });
  }
);

const updateBookingOneInDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as { userId: string };
    const { id } = req.params;

    const result = await BookingsService.updateBookingOneInDB(userId, id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking Updated successfully',
      data: result,
    });
  }
);

const deleteBookingByIdFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as { userId: string };
    const { id } = req.params;

    const result = await BookingsService.deleteBookingByIdFromDB(userId, id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking deleted successfully',
      data: result,
    });
  }
);

export const BookingsController = {
  insertBookingIntoDB,
  getAllBookingFromDB,
  getSingleBookingByIdFromDB,
  updateBookingOneInDB,
  deleteBookingByIdFromDB,
};
