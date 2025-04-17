
// Course review model schema
import mongoose from 'mongoose';

const courseReviewSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure one review per user per course
courseReviewSchema.index({ course: 1, user: 1 }, { unique: true });

const CourseReview = mongoose.model('CourseReview', courseReviewSchema);

export default CourseReview;