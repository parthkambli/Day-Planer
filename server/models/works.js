import mongoose from "mongoose";

const worksSchema = new mongoose.Schema({
  Work_Title: {
    type: String,
    required: [true, "work title canot be empty! "],
    unique: [true, "work title already exist! "],
  },
  Description: {
    type: String,
  },
  Task: {
    type: Array,
    of: String,
  },
  Tags: {
    type: String,
  },
  Priority: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("Work", worksSchema);
