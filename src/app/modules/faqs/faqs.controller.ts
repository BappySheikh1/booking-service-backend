import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FaqsService } from './faqs.service';

const faqInsertIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FaqsService.faqInsertIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking successfully',
      data: result,
    });
  }
);

const getAllFaqFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FaqsService.getAllFaqFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faqs retrieve successfully',
      data: result,
    });
  }
);

const getSingleFaqByIdFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await FaqsService.getSingleFaqByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faqs retrieve successfully',
      data: result,
    });
  }
);

const updateFaqOneInDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await FaqsService.updateFaqOneInDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faq Updated successfully',
      data: result,
    });
  }
);

const deleteFaqByIdFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await FaqsService.deleteFaqByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faqs deleted successfully',
      data: result,
    });
  }
);

export const FaqsController = {
  faqInsertIntoDB,
  getAllFaqFromDB,
  getSingleFaqByIdFromDB,
  deleteFaqByIdFromDB,
  updateFaqOneInDB,
};
