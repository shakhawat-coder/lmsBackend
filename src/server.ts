import "dotenv/config";
import app from "./app";
import { prisma } from "./app/lib/prisma";
// import { seedSuperAdmin } from "./app/utils/seed";

const PORT = process.env.PORT || 5000;

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
