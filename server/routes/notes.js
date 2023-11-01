import { Router } from "express";
import {
  addNote,
  deleteNote,
  editNote,
  getNotes,
  getSingleNote,
} from "../controllers/notes.js";

const router = Router();

router.route("/").get(getNotes).post(addNote);
router.route("/:id").get(getSingleNote).patch(editNote).delete(deleteNote);

export default router;
