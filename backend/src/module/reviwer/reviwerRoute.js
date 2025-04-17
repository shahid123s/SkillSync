import express from 'express';
import {reviewerController} from './reviwerController.js';
const router  = express.Router();


router.get('/profile', reviewerController.getReviewer)
router.get('/status', reviewerController.getReviewerStatus)

export default router