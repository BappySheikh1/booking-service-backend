import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './services.contants';
import { ServicesService } from './services.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const result = await ServicesService.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllServiceFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ServicesService.getAllServiceFromDB(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});
const getServiceByCategoryId = catchAsync(
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const options = pick(req.query, paginationFields);
    const result = await ServicesService.getServiceByCategoryId(
      categoryId,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book fetched successfully',
      data: result,
    });
  }
);

const getSingleServiceByIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ServicesService.getSingleServiceByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book fetched successfully',
      data: result,
    });
  }
);

const updateServiceFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await ServicesService.updateServiceFromDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteServiceFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServicesService.deleteServiceFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  insertIntoDB,
  getAllServiceFromDB,
  getSingleServiceByIdFromDB,
  updateServiceFromDB,
  deleteServiceFromDB,
  getServiceByCategoryId,
};
