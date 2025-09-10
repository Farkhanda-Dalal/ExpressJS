import { Router } from "express";
import { getAllBooks, getSingleBook, addBook, updateBook, deleteBook } from "../controller/bookController.js";

export const router=Router();

router.get("/", getAllBooks ); //Get all books
router.get("/:id", getSingleBook); //Get book by given id
router.post("/", addBook); //Add book to collection
router.put("/:id", updateBook); //Update book of given id
router.delete("/:id", deleteBook) //Delete book of given id
