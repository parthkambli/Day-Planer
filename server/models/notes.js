import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  Notes_Title: {
    type: String,
    required: [true, "Note title canot be empty! "],
    unique: [true, "Note already exist! "],
  },
  Description: {
    type: String,
  },
  Points: {
    type: Array,
    of: String,
  },
  Priority: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("Notes", notesSchema);
