import { prisma } from "../../app/lib/prisma";

export type IUser = {
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  status: "ACTIVE" | "BLOCKED";
  phoneNumber?: string;
  address?: string;
  isDeleted: boolean;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    where: {
      isDeleted: false,
      role: "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phoneNumber: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateUser = async (id: string, data: Partial<IUser>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const softDeleteUser = async (id: string) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  updateUser,
  softDeleteUser,
};
