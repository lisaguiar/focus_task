import express from 'express';
import { getNotes, getNote, createNote, deleteNote, updateNote } from '../controllers/note.js';

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.delete('/:id', deleteNote);
router.put('/:id', updateNote)

export default router