import { configDotenv } from "dotenv";
import e from "express";

import { connectDB } from "./database/DBConnection.js";
import { router as bookRoutes } from "./routes/bookRoutes.js";

//Loads .env file contents into process.env
configDotenv(); 

//Instantiates an Express application
const app=e();

//Middleware to pass only json data in req and res
app.use(e.json());

//Connect to Database
connectDB();

app.use("/api/books", bookRoutes);

const PORT=process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Listening for request on port ${PORT}`) })