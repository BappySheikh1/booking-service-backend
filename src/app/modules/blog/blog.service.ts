import { Blog } from '@prisma/client';
import prisma from '../../../shared/prisma';

const blogInsertIntoDB = async (data: Blog): Promise<Blog> => {
  console.log(data);
  const result = await prisma.blog.create({
    data,
  });
  return result;
};

const getAllBlogFromDB = async (): Promise<Blog[]> => {
  const result = await prisma.blog.findMany({});
  return result;
};

const getSingleBlogFromDB = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateBlogOneInDB = async (id: string, data: Blog): Promise<Blog | null> => {
  const result = await prisma.blog.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteBlogByIdFromDB = async (id: string): Promise<Blog | null> => {
  const result = await prisma.blog.delete({
    where: {
      id,
    },
  });
  return result;
};



export const BlogService = {
  blogInsertIntoDB,
  getAllBlogFromDB,
  getSingleBlogFromDB,
  deleteBlogByIdFromDB,
  updateBlogOneInDB,
};
