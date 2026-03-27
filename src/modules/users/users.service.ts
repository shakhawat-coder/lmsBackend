import { prisma } from "../../app/lib/prisma";
import { auth } from "../../app/lib/auth";

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

const createAdmin = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  // Check duplicate before calling auth
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new Error(`User with email '${data.email}' already exists`);
  }

  const result = await auth.api.signUpEmail({ body: data });
  if (!result?.user) {
    throw new Error("Failed to create admin account");
  }

  // Promote to ADMIN
  const admin = await prisma.user.update({
    where: { id: result.user.id },
    data: { role: "ADMIN" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  return admin;
};

export const UserService = {
  getAllUsers,
  updateUser,
  softDeleteUser,
  createAdmin,
};
