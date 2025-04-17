import CourseReview from "./courseReviweModel.js";
import CustomError from "../../utils/customError.js";


export const courseReviewRepository = {
    createCourseReview: async (reviewData) => {
        try {
            const review = new CourseReview(reviewData);
            return await review.save();
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    getCourseReview: async (courseId) => {
        try {
            return await CourseReview.find({ courseId });
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    getCourseReviewByUser: async (userId) => {
        try {
            return await CourseReview.find({ userId });
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    updateCourseReview: async (reviewId, reviewData) => {
        try {
            return await CourseReview.findByIdAndUpdate(reviewId, reviewData, { new: true });
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },

    deleteCourseReview: async (reviewId) => {
        try {
            return await CourseReview.findByIdAndDelete(reviewId);
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            );
        }
    },
};  