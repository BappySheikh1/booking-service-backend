import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewAndRatingService } from './reviewAndRating.service';

const insertIntoFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.user as { userId: string };

    const result = await ReviewAndRatingService.insertIntoFromDB(
      req.body,
      userId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review And Rating created successfully',
      data: result,
    });
  }
);

const getAllReviewAndRatingFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewAndRatingService.getAllReviewAndRatingFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews And Ratings retrieve successfully',
      data: result,
    });
  }
);

const getSingleReviewAndRatingByIdFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ReviewAndRatingService.getSingleReviewAndRatingByIdFromDB(
        req.params.id
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review And Rating retrieve successfully',
      data: result,
    });
  }
);

export const ReviewAndRatingController = {
  insertIntoFromDB,
  getAllReviewAndRatingFromDB,
  getSingleReviewAndRatingByIdFromDB,
};
