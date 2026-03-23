import app from "./app";
// import { seedSuperAdmin } from "./app/utils/seed";

const port = process.env.PORT || 5000;

const main = async () => {
  try {
    // await seedSuperAdmin();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
