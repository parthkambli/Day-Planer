import { Router } from "express";
import {
  addWork,
  deleteWork,
  editWork,
  getSingleWork,
  getWorks,
} from "../controllers/works.js";

const router = Router();

router.route("/").get(getWorks).post(addWork);
router.route("/:id").get(getSingleWork).patch(editWork).delete(deleteWork);

export default router;
