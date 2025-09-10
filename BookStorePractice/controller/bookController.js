import mongoose from "mongoose";
import Book from "../models/Book.js";

export const getAllBooks = async (req, res) => {
  try {
    //Fetch all books from mongo db
    const books = await Book.find();

    //If collection is not empty
    if (books.length !== 0)
      res.status(200).json({
        message: "Fetched List of Books",
        data: books,
      });
    //If collection is empty
    else throw new Error("No books in store are available right now");
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const id = req.params.id;

    //24-character hexadecimal string (only 0-9 and a-f are allowed) as _id in mongo db
    //So this block handles error if id like such is passed 10, :id, etc
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid id type!");
    }

    if (id) {
      const book = await Book.findById(id);

      //If book with id was available in collection
      if (book) {
        res.status(200).json({
          message: "Book was found",
          data: book,
        });
      }
      //If book with passed id is not available
      else throw new Error("Invalid id ! No such book is available");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const addBook = async (req, res) => {
  try {
    const bookObj = req.body;

    const newBook = await Book.create(bookObj);
    if (newBook)
      res.status(200).json({
        message: `${newBook.title} was added to Database`,
        data: newBook,
      });
    else throw new Error("ERROR! Book could not be saved !");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const newObj = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, newObj, { new: true });
    if (updatedBook) {
      res.status(200).json({
        message: "Book was updated successfully",
        data: updatedBook,
      });
    } else {
      throw new Error("Updated was unsucessfull !");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid id type!");
    }

    if (id) {
      const deletedBook = await Book.findByIdAndDelete(id);
      if (deletedBook) {
        res.status(200).json({
          message: "Book was deleted successfully!",
          data: deletedBook,
        });
      } else {
        throw new Error("Book with given id does not exist");
      }
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
