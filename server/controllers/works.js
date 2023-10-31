import mongoose from "mongoose";
import Works from "../models/works.js";

// -----------------------------------------------------------------------------------------------
// @desc - Get all works
// @route - GET /api/works
// -----------------------------------------------------------------------------------------------
export const getWorks = async (req, res) => {
  const works = await Works.find({}).sort({ Priority: 1 });
  try {
    return res
      .status(200)
      .json({ success: true, count: works.length, works: works });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Get single work
// @route - GET /api/works/:id
// -----------------------------------------------------------------------------------------------
export const getSingleWork = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Work Not Found" });
    }

    const work = await Works.findById(id);

    // Check for existence of work
    if (!work) {
      return res.status(404).json({ success: false, error: "Work Not Found" });
    }

    res.status(200).json({ success: true, work: work });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Add work
// @route - POST /api/works
// -----------------------------------------------------------------------------------------------
export const addWork = async (req, res) => {
  try {
    const work = await Works.create(req.body);
    return res.status(200).json({
      success: true,
      work: work,
      message: "Work Added Successfully",
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
        .json({ success: false, error: "Work title must be unique!" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Edit work
// @route - PATCH /api/works/:id
// -----------------------------------------------------------------------------------------------
export const editWork = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Work Not Found" });
    }

    const work = await Works.findByIdAndUpdate({ _id: id }, { ...req.body });

    // Check for existence of work
    if (!work) {
      return res.status(404).json({ success: false, error: "Work Not Found" });
    }

    const updatedWork = await Works.findById(id);

    res.status(200).json({ success: true, updatedWork: updatedWork });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((val) => val.message),
      });
    } else if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: "Work title must be unique!" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Delete work
// @route - PATCH /api/works/:id
// -----------------------------------------------------------------------------------------------
export const deleteWork = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, error: "Work Not Found" });
    }

    const work = await Works.findByIdAndDelete({ _id: id });

    // Check for existence of work
    if (!work) {
      return res.status(404).json({ success: false, error: "Work not found" });
    }

    res.status(200).json({ success: true, work: work });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: "Work Deleted Successfully",
    });
  }
};
