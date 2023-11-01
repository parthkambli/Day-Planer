import mongoose from "mongoose";
import Notes from "../models/notes.js";

// -----------------------------------------------------------------------------------------------
// @desc - Get all Notes
// @route - GET /api/notes
// -----------------------------------------------------------------------------------------------
export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({}).sort({ Priority: 1 });
    return res
      .status(200)
      .json({ success: true, count: notes.length, notes: notes });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Get single notes
// @route - GET /api/notes/:id
// -----------------------------------------------------------------------------------------------
export const getSingleNote = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Note Not Found" });
    }

    const note = await Notes.findById(id);

    // Check for existence of note
    if (!note) {
      return res.status(404).json({ success: false, error: "Note Not Found" });
    }

    res.status(200).json({ success: true, note: note });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Add note
// @route - GET /api/notes
// -----------------------------------------------------------------------------------------------
export const addNote = async (req, res) => {
  try {
    const note = await Notes.create(req.body);
    return res.status(200).json({
      success: true,
      note: note,
      message: "Note Added Successfully",
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
        .json({ success: false, error: "Note name must be unique!" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Edit note
// @route - PATCH /api/notes/:id
// -----------------------------------------------------------------------------------------------
export const editNote = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Note Not Found" });
    }

    const note = await Notes.findByIdAndUpdate({ _id: id }, { ...req.body });

    // Check for existence of Note
    if (!note) {
      return res.status(404).json({ success: false, error: "Note Not Found" });
    }

    const updatedNote = await Notes.findById(id);

    res.status(200).json({
      success: true,
      updateNote: updatedNote,
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
        .json({ success: false, error: "Note name must be unique!" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Delete Note
// @route - PATCH /api/notes/:id
// -----------------------------------------------------------------------------------------------
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Note Not Found" });
    }

    const note = await Notes.findByIdAndDelete({ _id: id });

    // Check for existence of Note
    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    res.status(200).json({ success: true, note: note });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: "Note Deleted Successfully",
    });
  }
};
