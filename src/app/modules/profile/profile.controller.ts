import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';
import httpStatus from 'http-status';

const getProfile: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // Retrieve the user's _id & role from the access token
    const { userId } = req.user as { userId: string };

    const result = await ProfileService.getProfile(userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile fetched successfully',
      data: result,
    });
  }
);

export const ProfileController = {
  getProfile,
};
