import mongoose from "mongoose";

const workoutsSchema = new mongoose.Schema({
  Workout_Title: {
    type: String,
    required: [true, "Book name canot be empty! "],
    unique: [true, "work title already exist! "],
  },
  Description: {
    type: String,
  },
  Exercises: [
    {
      name: {
        type: String,
        required: true,
      },
      sets: {
        type: Number,
        required: true,
      },
      reps: {
        type: Number,
        required: function () {
          // Reps are required if duration is not provided
          return this.duration === undefined;
        },
      },
      duration: {
        type: Number,
        required: function () {
          // Duration is required if reps are not provided
          return this.reps === undefined;
        },
      },
    },
  ],
});

export default mongoose.model("Workouts", workoutsSchema);
