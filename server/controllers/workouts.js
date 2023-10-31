import mongoose from "mongoose";

import Workouts from "../models/workouts.js";

// -----------------------------------------------------------------------------------------------
// @desc - Get all workouts
// @route - GET /api/workouts
// -----------------------------------------------------------------------------------------------
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workouts.find({}).sort({ Priority: 1 });
    return res
      .status(200)
      .json({ success: true, count: workouts.length, workouts: workouts });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Get single workout
// @route - GET /api/workoutss/:id
// -----------------------------------------------------------------------------------------------
export const getSingleWorkouts = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, error: "Workout Not Found" });
    }

    const workouts = await Workouts.findById(id);

    // Check for existence of workout
    if (!workouts) {
      return res
        .status(404)
        .json({ success: false, error: "Workouts Not Found" });
    }

    res.status(200).json({ success: true, workouts: workouts });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Add workout
// @route - GET /api/workouts
// -----------------------------------------------------------------------------------------------
export const addWorkout = async (req, res) => {
  try {
    const workout = await Workouts.create(req.body);
    return res.status(200).json({
      success: true,
      workout: workout,
      message: "Workouts Added Successfully",
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
        .json({ success: false, error: "Workouts name must be unique!" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Edit workout
// @route - PATCH /api/workouts/:id
// -----------------------------------------------------------------------------------------------
export const editWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, error: "Workout Not Found" });
    }

    const workot = await Workouts.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );

    // Check for existence of Workout
    if (!workot) {
      return res
        .status(404)
        .json({ success: false, error: "Workout Not Found" });
    }

    const updatedWorkout = await Workouts.findById(id);

    res.status(200).json({
      success: true,
      updateWorkout: updatedWorkout,
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
        .json({ success: false, error: "Workout title must be unique!" });
    } else {
      return res
        .status(500)
        .json({ success: false, error: "Server Error", Error: error });
    }
  }
};

// -----------------------------------------------------------------------------------------------
// @desc - Delete Workout
// @route - PATCH /api/Workouts/:id
// -----------------------------------------------------------------------------------------------
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    // Check for mongoose valide id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, error: "Workout Not Found" });
    }

    const workout = await Workouts.findByIdAndDelete({ _id: id });

    // Check for existence of Workout
    if (!workout) {
      return res
        .status(404)
        .json({ success: false, error: "Workout not found" });
    }

    res.status(200).json({ success: true, workout: workout });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
      message: "Workout Deleted Successfully",
    });
  }
};
