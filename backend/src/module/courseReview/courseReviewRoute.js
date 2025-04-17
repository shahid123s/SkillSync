// Update review
import express from 'express';
import {
  createCourseReview,
  deleteCourseReview, 
  getAllCourseReviews,
  getCourseReviewByUser,
  updateCourseReview
} from './courseReviewController.js'

const router = express.Router();

router.post('/create-review', createCourseReview);

// Get all reviews 
router.get('/get-review', getAllCourseReviews);

// Get review by user
router.get('/user/:userId', getCourseReviewByUser);

// Update review
router.put('/update-review/:id', updateCourseReview);

// Delete review
router.delete('/delete-review/:id', deleteCourseReview);

export default router;