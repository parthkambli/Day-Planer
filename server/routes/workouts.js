import { Router } from "express";
import {
  addWorkout,
  deleteWorkout,
  editWorkout,
  getSingleWorkouts,
  getWorkouts,
} from "../controllers/workouts.js";

const router = Router();

router.route("/").get(getWorkouts).post(addWorkout);
router
  .route("/:id")
  .get(getSingleWorkouts)
  .patch(editWorkout)
  .delete(deleteWorkout);

export default router;
