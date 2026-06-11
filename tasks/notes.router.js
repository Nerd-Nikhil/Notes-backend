import { Router } from "express";
import { addNotes,deleteNotes,editNotes, getNotes,searchNotes } from "./notes.controller.js";
import { authenticateToken } from "../utilities.js";

export const notesRouter = Router();

notesRouter.post("/add-note",authenticateToken,addNotes);
notesRouter.put("/edit-note/:noteId",authenticateToken,editNotes);
notesRouter.get("/get-notes",authenticateToken,getNotes);
notesRouter.delete("/delete-note/:noteId",authenticateToken,deleteNotes);
notesRouter.get("/search-notes",authenticateToken,searchNotes)