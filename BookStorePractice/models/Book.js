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
      `Published Year of Book cannot be greater than current year ie ${new Date().getFullYear()}`,
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
