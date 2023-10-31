import { Router } from "express";
import {
  getBooks,
  addBook,
  deleteBook,
  editBook,
  getSingleBook,
} from "../controllers/books.js";

const router = Router();

router.route("/").get(getBooks).post(addBook);
router.route("/:id").get(getSingleBook).patch(editBook).delete(deleteBook);

export default router;
