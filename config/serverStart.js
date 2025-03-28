import connectDb from "./db.js";
const PORT = process.env.PORT || 3000;

const startServer = async (app) => {
  try {
    // Initialize the database connection before the server starts
    await connectDb();
    app.listen(PORT, (err) => {
      if (err) {
        return console.log("Something bad happened", err);
      }
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

export default startServer;
