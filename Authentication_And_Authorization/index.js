import { configDotenv } from "dotenv";
import e from "express";
import { connect } from "./database/Connection.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as publicRoutes } from "./routes/publicRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as adminRoutes } from "./routes/adminRoutes.js";

//Instantiated to load .env secrets in process.env 
configDotenv();

//Instantiated Express App
const app=e();

//Middleware to parse json datatype in req and res
app.use(e.json());

//Connect to database
connect();

//Public routes, can be accessed by all roles and without authorization
app.use("", publicRoutes);

//Protected Routes that can only be viewed after login
app.use("/user", userRoutes);

//Protected Routes that can only be viewed after login by admin
app.use("/admin", adminRoutes);

//Authentication Routing
app.use("/api/auth", authRoutes);

//Start server
const PORT=process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Listening for requests on port ${PORT}`) });