import mongoose from "mongoose";

import Books from "../models/books.js";

// -----------------------------------------------------------------------------------------------
// @desc - Get all books
// @route - GET /api/books
// -----------------------------------------------------------------------------------------------
export const getBooks = async (req, res) => {
  try {
    const books = await Books.find({}).sort({ Priority: 1 });
    return res
      .status(200)
      .json({ success: true, count: books.length, books: books });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Get single books
// @route - GET /api/books/:id
// -----------------------------------------------------------------------------------------------
export const getSingleBook = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Book Not Found" });
    }

    const book = await Books.findById(id);

    // Check for existence of book
    if (!book) {
      return res.status(404).json({ success: false, error: "Book Not Found" });
    }

    res.status(200).json({ success: true, book: book });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Add book
// @route - GET /api/books
// -----------------------------------------------------------------------------------------------
export const addBook = async (req, res) => {
  try {
    const book = await Books.create(req.body);
    return res.status(200).json({
      success: true,
      book: book,
      message: "Book Added Successfully",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((val) => val.message),
      });
    } else if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: "Book name must be unique!" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Edit book
// @route - PATCH /api/books/:id
// -----------------------------------------------------------------------------------------------
export const editBook = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Book Not Found" });
    }

    const book = await Books.findByIdAndUpdate({ _id: id }, { ...req.body });

    // Check for existence of Book
    if (!book) {
      return res.status(404).json({ success: false, error: "Book Not Found" });
    }

    const updatedBook = await Books.findById(id);

    res.status(200).json({
      success: true,
      updateBook: updatedBook,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((val) => val.message),
      });
    } else if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: "Book name must be unique!" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Delete Book
// @route - PATCH /api/Books/:id
// -----------------------------------------------------------------------------------------------
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Book Not Found" });
    }

    const book = await Books.findByIdAndDelete({ _id: id });

    // Check for existence of Book
    if (!book) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }

    res.status(200).json({ success: true, book: book });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: "Book Deleted Successfully",
    });
  }
};
