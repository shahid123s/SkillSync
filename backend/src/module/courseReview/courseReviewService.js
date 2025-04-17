import CustomError  from "../../utils/customError.js";
import { courseReviewRepository } from "./courseReviewRepository.js"


export const courseReviewServices = {
    createCourseReview: async (reviewData) => {
        try {
            const courseReview = await courseReviewRepository.createCourseReview(reviewData, courseId);
            return courseReview;
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },

    getAllCourseReview: async (courseId) => {
        try {
            const courses = await courseReviewRepository.getCourseReview(courseId);
            return courses;
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },

    getCourseReviewBYUser: async (userId) => {
        try {
            const course = await courseReviewRepository.getCourseReviewByUser(userId);
            return course;
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },

    updateCourseReview: async (reviewId, reviewData) => {
        try {
            const course = await courseReviewRepository.updateCourseReview(reviewId, reviewData);
            return course;
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    },

    deleteCourseReview: async (reviewId) => {
        try {
            const courseReview = await courseReviewRepository.deleteCourseReview(reviewId);
            return courseReview;
        } catch (error) {
            throw new CustomError(
                error.message,
                500,
            )
        }
    }
}
