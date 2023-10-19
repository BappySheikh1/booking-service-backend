import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FeedbackService } from './feedback.service';

const insertIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeedbackService.insertIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Your Feedback Is Recorded Successfully',
      data: result,
    });
  }
);

const getAllFeedBackFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FeedbackService.getAllFeedBackFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedbacks retrieve successfully',
      data: result,
    });
  }
);

const getSingleFeedBackFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await FeedbackService.getSingleFeedBackFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback retrieve successfully',
      data: result,
    });
  }
);

const updateFeedBackOneInDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await FeedbackService.updateFeedBackOneInDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback Updated successfully',
      data: result,
    });
  }
);

const deleteFeedBackByIdFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await FeedbackService.deleteFeedBackByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Feedback deleted successfully',
      data: result,
    });
  }
);

export const FeedbackController = {
  insertIntoDB,
  getAllFeedBackFromDB,
  getSingleFeedBackFromDB,
  deleteFeedBackByIdFromDB,
  updateFeedBackOneInDB,
};
