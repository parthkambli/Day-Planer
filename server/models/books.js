import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  Book_Name: {
    type: String,
    required: [true, "Book name canot be empty! "],
    unique: [true, "work title already exist! "],
  },
  Description: {
    type: String,
  },
  Author: {
    type: String,
    required: [true, "Author name canot be empty! "],
  },
  Resources: {
    type: String,
    required: [true, "Resources canot be empty! "],
  },
  Current_page: {
    type: Number,
  },
  Tags: {
    type: String,
  },
  Priority: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("Books", booksSchema);
