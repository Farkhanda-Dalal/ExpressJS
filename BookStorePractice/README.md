1. Create BookStorePractice folder
2. Do npmi init -y to create package.json
3. Set type to module in package.json
4. Use nodemon to avoid restarting server everytime changes are made in code
   Write this in scripts in package if nodemon is installed globally in you system.

```
    "start": "nodemon index.js"
```

**OR** <br>
Install as dev dependency. This will add nodemon as dev dependency in pacakage.json

```
npm i nodemon --save-dev
```
5. Install express, mongoose and dotenv
```
npm i express mongoose dotenv
```
6. Create Database, Controller, Routes, Models Folder
7. Create .env file at root of folder
8. Write PORT and MONGODB Connection String in .env file to protect secrets
9. Create index.js file
10. Import dotenv config to get .env secrets in index.js for use
For type:module
```
import { configDotenv } from "dotenv";
```
**OR**
For type:commonjs
```
require ('dotenv').config()
```
11. Instantiate dotenv. 
```
configDotenv(); //Loads .env file contents into process.env.
```
Once this is instantiated in the entry point file it does not need to be imported and instantiated in evry file that want to use .env vars
12. Start server to listen to reqs
```
const PORT=process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Listening for request on port ${PORT}`) })
```
13. Add mongo db connection string to .env file
14. Create connection in Database folder
```
import mongoose from "mongoose";

export const connectDB=async () => {
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connection Successfull ! \nConnection Host ${conn.connection.host}`)
    } catch (error) {
        console.error(`Connection Failed : ${error.message}`);
    }
    
}
```
15. import the connectDB in index.js
```
import { connectDB } from "./database/DBConnection.js";
connectDB();
```
16. Add express.json() middleware
```
app.use(e.json());
```
17. Create model by importing schema and model
```
import { Schema } from "mongoose";
import { model } from "mongoose";

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Book Title is mandatory"],
    trim: true, //Removes whitespaces from end,
    maxLength: [100, "Book title cannot be more than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author Name is mandatory"],
    trim: true, //Removes whitespaces from end,
    maxLength: [100, "Author Name cannot be more than 100 characters"],
  },
  publishedYear: {
    type: Number,
    min: [
      1500,
      "Published Year of Book should be greater than or equal to 1500",
    ],
    max: [
      new Date().getFullYear(),
      "Published Year of Book cannot be greater than current year",
    ],
  },
  pages: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    enum: [
      "Fiction",
      "Non-Fiction",
      "Fantasy",
      "Biography",
      "Science",
      "Other",
    ], // only allowed values
    default: "Other",
  },
  price: {
    type: Number,
    required: true,
    min: 200
  },
  inStock:{
    type: Boolean,
    default: true
  }
});

const Book = model("Book", BookSchema);
export default Book;
```
18. Create controller and export controller funcs
19. Create Router and import controller funcs and use them for desired routes
```
import { Router } from "express";
import { getAllBooks, getSingleBook, addBook, updateBook, deleteBook } from "../controller/bookController.js";

export const router=Router();

router.get("/", getAllBooks ); //Get all books
```
20. Import router in index.js and use it in middleware
```
import { router as bookRoutes } from "./routes/bookRoutes.js";
app.use("/api/books", bookRoutes);
```