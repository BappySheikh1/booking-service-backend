import { Role, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

import { Secret } from 'jsonwebtoken';

import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const createRegister = async (user: User): Promise<User> => {
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  if (!user.role) {
    user.role = Role.user;
  }

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await prisma.user.create({ data: user });
  return result;
};

const createSuperAdmin = async (user: User): Promise<User> => {
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  if (!user.role) {
    user.role = Role.admin;
  }

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await prisma.user.create({ data: user });
  return result;
};

const createNewAdmin = async (user: User): Promise<User> => {
  if (!user.password) {
    user.password = config.default_pass as string;
  }
  if (!user.role) {
    user.role = Role.user;
  }

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await prisma.user.create({ data: user });
  return result;
};

const loginUser = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  // console.log(payload)
  const isPasswordMatched = async (
    givenPassword: string,
    savedPassword: string
  ) => {
    return await bcrypt.compare(givenPassword, savedPassword);
  };

  const isUserExist = await prisma.user.findUnique({ where: { email } });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return accessToken;
};

export const AuthService = {
  createRegister,
  createSuperAdmin,
  loginUser,
  createNewAdmin,
};
