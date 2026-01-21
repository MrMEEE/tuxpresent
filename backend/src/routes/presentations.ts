import express from 'express';
import {
  createPresentation,
  getPresentations,
  getPresentation,
  updatePresentation,
  deletePresentation,
  addCollaborator
} from '../controllers/presentationController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getPresentations)
  .post(createPresentation);

router.route('/:id')
  .get(getPresentation)
  .put(updatePresentation)
  .delete(deletePresentation);

router.post('/:id/collaborators', addCollaborator);

export default router;
