import { prisma } from "../../app/lib/prisma";

export type IBorrowing = {
  userId: string;
  bookId: string;
  dueDate: Date | string;
  returnDate?: Date | string | null;
  status?: "BORROWED" | "RETURNED" | "OVERDUE";
};

const createBorrowing = async (data: IBorrowing) => {
  await prisma.book.update({
    where: { id: data.bookId },
    data: { availability: false },
  });

  const result = await prisma.borrowing.create({
    data: {
      userId: data.userId,
      bookId: data.bookId,
      dueDate: new Date(data.dueDate),
      status: data.status || "BORROWED",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      book: {
        include: {
          category: true,
        },
      },
    },
  });
  return result;
};

const getAllBorrowings = async () => {
  const result = await prisma.borrowing.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      book: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getSingleBorrowing = async (id: string) => {
  const result = await prisma.borrowing.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      book: {
        include: {
          category: true,
        },
      },
    },
  });
  return result;
};

const FINE_PER_DAY = 5; // fine amount per overdue day (e.g. $5/day)

const returnBook = async (id: string) => {
  const borrowing = await prisma.borrowing.findUnique({
    where: { id },
  });

  if (!borrowing) return null;

  const returnDate = new Date();
  const dueDate = new Date(borrowing.dueDate);

  // Calculate fine: count overdue days after dueDate
  let fine = 0;
  let status: "RETURNED" | "OVERDUE" = "RETURNED";

  if (returnDate > dueDate) {
    const diffMs = returnDate.getTime() - dueDate.getTime();
    const overdueDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    fine = overdueDays * FINE_PER_DAY;
    status = "OVERDUE";
  }

  await prisma.book.update({
    where: { id: borrowing.bookId },
    data: { availability: true },
  });

  const result = await prisma.borrowing.update({
    where: { id },
    data: {
      status,
      returnDate,
      fine,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      book: {
        include: {
          category: true,
        },
      },
    },
  });
  return result;
};


const updateBorrowing = async (id: string, data: Partial<IBorrowing>) => {
  const updateData: any = { ...data };
  if (data.dueDate) updateData.dueDate = new Date(data.dueDate);
  if (data.returnDate) updateData.returnDate = new Date(data.returnDate);

  const result = await prisma.borrowing.update({
    where: { id },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      book: {
        include: {
          category: true,
        },
      },
    },
  });
  return result;
};

const deleteBorrowing = async (id: string) => {
  const result = await prisma.borrowing.delete({
    where: { id },
  });
  return result;
};

export const BorrowingService = {
  createBorrowing,
  getAllBorrowings,
  getSingleBorrowing,
  returnBook,
  updateBorrowing,
  deleteBorrowing,
};
