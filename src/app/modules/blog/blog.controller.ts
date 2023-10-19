import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BlogService } from './blog.service';

const blogInsertIntoDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BlogService.blogInsertIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking successfully',
      data: result,
    });
  }
);
const getAllBlogFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BlogService.getAllBlogFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs retrieve successfully',
      data: result,
    });
  }
);
const getSingleBlogFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BlogService.getSingleBlogFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog retrieve successfully',
      data: result,
    });
  }
);

const updateBlogOneInDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogService.updateBlogOneInDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog Updated successfully',
      data: result,
    });
  }
);

const deleteBlogByIdFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BlogService.deleteBlogByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog deleted successfully',
      data: result,
    });
  }
);

export const BlogController = {
  blogInsertIntoDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  updateBlogOneInDB,
  deleteBlogByIdFromDB,
};
