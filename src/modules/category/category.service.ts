import { prisma } from "../../app/lib/prisma";


const createCategory = async (data: { name: string; image?: string }) => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    include: {
      books: true,
    },
  });
  return result;
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateCategory = async (id: string, data: Partial<{ name: string; image: string }>) => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
